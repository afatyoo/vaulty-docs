// Tangkapan layar khusus: halaman pembayaran yang dibuka dari langkah "Pilih
// paket" di onboarding (/checkout?from=onboarding), termasuk kartu sukses
// yang mengantar balik ke onboarding. Terpisah dari capture-screens.mjs
// karena butuh akun baru yang belum menyelesaikan onboarding sama sekali.
//
// Pakai: node scripts/capture-onboarding-checkout.mjs [id|en|all]
import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const APP = process.env.APP_URL || 'http://localhost:3030';
const REPO = (process.env.VAULTY_REPO || join(homedir(), 'claude-project/vaulty')).replace(/^~/, homedir());
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PASSWORD = 'Rahasia-Demo-12345';
const which = process.argv[2] || 'all';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const sql = (q) => execFileSync('docker', ['compose', '-f', join(REPO, 'docker-compose.yml'), 'exec', '-T', 'mysql', 'sh', '-c',
  'MYSQL_PWD="$MYSQL_ROOT_PASSWORD" mysql -uroot -N "$MYSQL_DATABASE" 2>/dev/null'], { input: q }).toString().trim();

const NAME = { id: 'Sari Amelia', en: 'Sarah Wilson' };
const START = { id: /^mulai$/i, en: /^start$/i };
const PAY = { id: /bayar sekarang/i, en: /pay now/i };
const CONTINUE = { id: /lanjutkan pengaturan akun/i, en: /continue account setup/i };

async function shot(page, lang, name) {
  const dir = join(process.cwd(), 'src/assets/screens', lang);
  mkdirSync(dir, { recursive: true });
  const buf = await page.screenshot({ type: 'png' });
  await sharp(buf).webp({ quality: 82 }).toFile(join(dir, `${name}.webp`));
  console.log(`  ✓ ${lang}/${name}`);
}

async function run(browser, lang) {
  sql('DELETE FROM auth_rate_limits;');
  const email = `onbpay${Date.now()}@example.test`;
  const reg = await fetch(`${APP}/api/portal/register`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email, name: NAME[lang], password: PASSWORD, plan: 'personal', language: lang }) });
  if (reg.status !== 201) throw new Error(`register ${reg.status}`);

  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.evaluateOnNewDocument((l) => { try { localStorage.setItem('finance-language', JSON.stringify({ state: { language: l }, version: 0 })); } catch { /* abaikan */ } }, lang);

  await page.goto(`${APP}/login`, { waitUntil: 'networkidle0' });
  await page.evaluate((e, pw) => {
    const set = (el, v) => { Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(el, v); el.dispatchEvent(new Event('input', { bubbles: true })); };
    const i = [...document.querySelectorAll('input')]; set(i[0], e); set(i[1], pw);
  }, email, PASSWORD);
  await page.click('button[type=submit]');
  await sleep(3000);

  // Langkah 1 (selamat datang) -> langkah 2 (pilih paket).
  await page.evaluate((src, flags) => { const re = new RegExp(src, flags); const b = [...document.querySelectorAll('main button')].find((x) => re.test(x.textContent.trim())); b?.click(); }, START[lang].source, START[lang].flags);
  await sleep(1200);

  // Klik "Bayar sekarang" pada kartu Personal.
  await page.evaluate((src, flags) => { const re = new RegExp(src, flags); const b = [...document.querySelectorAll('button')].find((x) => re.test(x.textContent || '')); b?.click(); }, PAY[lang].source, PAY[lang].flags);
  await sleep(2200);
  await shot(page, lang, 'onboarding-checkout');

  // Tandai lunas lewat jalur yang sama dengan webhook Midtrans, lalu muat ulang.
  const orderId = new URL(page.url()).searchParams.get('order');
  await page.evaluate(async (orderId) => {
    const csrf = decodeURIComponent(document.cookie.split('; ').find((c) => c.startsWith('wallet_csrf=')).split('=')[1]);
    await fetch('/api/billing/mock/settle', { method: 'POST', headers: { 'content-type': 'application/json', 'x-csrf-token': csrf }, body: JSON.stringify({ orderId }) });
  }, orderId);
  await sleep(400);
  await page.reload({ waitUntil: 'networkidle0' });
  await sleep(1200);
  await shot(page, lang, 'onboarding-checkout-paid');

  // Lanjut ke onboarding, harus mendarat di langkah "Ruang keuanganmu" / "Your space".
  await page.evaluate((src, flags) => { const re = new RegExp(src, flags); const b = [...document.querySelectorAll('button')].find((x) => re.test(x.textContent || '')); b?.click(); }, CONTINUE[lang].source, CONTINUE[lang].flags);
  await sleep(1500);
  await shot(page, lang, 'onboarding-resumed');

  await page.close();
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
try {
  for (const lang of which === 'all' ? ['id', 'en'] : [which]) {
    console.log(`== ${lang}: onboarding checkout`);
    await run(browser, lang);
  }
} finally {
  await browser.close();
}
