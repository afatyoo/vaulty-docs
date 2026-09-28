// Membuat akun demo berisi data dummy yang realistis di aplikasi Vaulty LOKAL,
// lalu memotret halaman-halamannya untuk dokumentasi (satu set per bahasa).
//
// Syarat: aplikasi lokal jalan di http://localhost:3030 (docker compose project
// "vaulty"), Google Chrome terpasang, dan `docker compose` bisa dijalankan dari
// folder repo `vaulty`. Data dummy hanya masuk ke database lokal.
//
// Pakai:
//   VAULTY_REPO=~/claude-project/vaulty node scripts/capture-screens.mjs [id|en|all]
//
// Hasil: src/assets/screens/<bahasa>/<nama>.webp
import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
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

// Pseudo-acak tetap supaya hasilnya sama tiap dijalankan.
function rng(seed) { let a = seed; return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

const P = {
  id: {
    name: 'Rina Wulandari', owner: 'rina_wulandari', email: 'rina.wulandari@example.test', partner: 'dewi_wulandari', workspace: 'Keluarga Wulandari',
    inc: ['Gaji', 'Bonus', 'Investasi', 'Freelance'], exp: ['Makanan', 'Transportasi', 'Belanja', 'Tagihan', 'Hiburan', 'Kesehatan', 'Pendidikan'],
    methods: { cash: 'Cash', debit: 'Debit', credit: 'Credit', ewallet: 'E-wallet', transfer: 'Transfer' },
    salary: 'Gaji PT Maju Bersama', freelance: 'Proyek desain logo', bonus: 'Bonus kinerja', dividend: 'Dividen reksa dana',
    exps: [
      [0, 'Makan siang ayam geprek', 28000, 45000, 7, 'cash'], [0, 'Kopi Kenangan', 22000, 38000, 6, 'ewallet'], [0, 'Belanja bulanan Superindo', 650000, 900000, 1, 'debit'],
      [0, 'Makan malam keluarga', 180000, 320000, 2, 'credit'], [0, 'GoFood sarapan', 30000, 55000, 4, 'ewallet'],
      [1, 'Bensin Pertamax', 120000, 160000, 3, 'debit'], [1, 'Grab ke kantor', 35000, 70000, 4, 'ewallet'], [1, 'Tol dan parkir', 20000, 60000, 3, 'ewallet'],
      [2, 'Belanja Shopee', 120000, 450000, 2, 'credit'], [2, 'Perlengkapan rumah', 150000, 350000, 1, 'debit'],
      [3, 'Token listrik PLN', 350000, 450000, 1, 'transfer'], [3, 'Internet IndiHome', 385000, 385000, 1, 'transfer'], [3, 'Air PDAM', 95000, 140000, 1, 'transfer'], [3, 'Pulsa dan paket data', 80000, 100000, 1, 'ewallet'],
      [4, 'Netflix', 186000, 186000, 1, 'credit'], [4, 'Spotify Family', 86000, 86000, 1, 'credit'], [4, 'Nonton bioskop', 90000, 180000, 1, 'ewallet'],
      [5, 'Apotek', 60000, 150000, 1, 'cash', 0.6], [6, 'Kursus online', 199000, 199000, 1, 'credit', 0.4],
    ],
    budgets: [['Makanan', 3200000], ['Transportasi', 1200000], ['Belanja', 1500000], ['Tagihan', 1200000], ['Hiburan', 400000], ['Kesehatan', 500000], ['Pendidikan', 400000]],
    bills: [['Listrik PLN', 'Tagihan', 400000, 20], ['Internet IndiHome', 'Tagihan', 385000, 5], ['Netflix', 'Hiburan', 186000, 12], ['Air PDAM', 'Tagihan', 120000, 25], ['BPJS Kesehatan', 'Kesehatan', 150000, 10], ['Asuransi jiwa', 'Lainnya', 350000, 28]],
    savings: [['Tabungan', 'Tabungan Darurat', 1500000], ['Investasi', 'Reksa Dana', 1000000]], withdraw: ['Tabungan Darurat', 'Bayar servis motor'],
    targets: [['Dana Darurat', 30000000, 'Tabungan Darurat'], ['Liburan ke Bali', 12000000, 'Reksa Dana'], ['DP Motor', 8000000, 'Tabungan Darurat']],
    debts: [['owed', 'Cicilan motor', 18000000, 11400000, 0, 'Tinggal 19 bulan'], ['owed', 'KTA Bank', 10000000, 6500000, 12, 'Cicilan tiap tanggal 15'], ['receivable', 'Pinjaman ke Andi', 1500000, 1000000, 0, 'Dibayar bertahap']],
    debtPay: 850000, saved: 'Tabungan Darurat',
  },
  en: {
    name: 'Michael Tan', owner: 'michael_tan', email: 'michael.tan@example.test', partner: 'sarah_tan', workspace: 'Tan Family',
    inc: ['Salary', 'Bonus', 'Investments', 'Freelance'], exp: ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Education'],
    methods: { cash: 'Cash', debit: 'Debit', credit: 'Credit', ewallet: 'E-wallet', transfer: 'Transfer' },
    salary: 'Salary from Maju Bersama Ltd', freelance: 'Logo design project', bonus: 'Performance bonus', dividend: 'Mutual fund dividend',
    exps: [
      [0, 'Chicken rice lunch', 28000, 45000, 7, 'cash'], [0, 'Coffee at the corner cafe', 22000, 38000, 6, 'ewallet'], [0, 'Monthly groceries at Superindo', 650000, 900000, 1, 'debit'],
      [0, 'Family dinner', 180000, 320000, 2, 'credit'], [0, 'Breakfast delivery', 30000, 55000, 4, 'ewallet'],
      [1, 'Fuel', 120000, 160000, 3, 'debit'], [1, 'Ride to the office', 35000, 70000, 4, 'ewallet'], [1, 'Toll and parking', 20000, 60000, 3, 'ewallet'],
      [2, 'Online shopping', 120000, 450000, 2, 'credit'], [2, 'Household supplies', 150000, 350000, 1, 'debit'],
      [3, 'Electricity token', 350000, 450000, 1, 'transfer'], [3, 'Home internet', 385000, 385000, 1, 'transfer'], [3, 'Water bill', 95000, 140000, 1, 'transfer'], [3, 'Mobile data', 80000, 100000, 1, 'ewallet'],
      [4, 'Netflix', 186000, 186000, 1, 'credit'], [4, 'Music subscription', 86000, 86000, 1, 'credit'], [4, 'Movie night', 90000, 180000, 1, 'ewallet'],
      [5, 'Pharmacy', 60000, 150000, 1, 'cash', 0.6], [6, 'Online course', 199000, 199000, 1, 'credit', 0.4],
    ],
    budgets: [['Food', 3200000], ['Transport', 1200000], ['Shopping', 1500000], ['Bills', 1200000], ['Entertainment', 400000], ['Health', 500000], ['Education', 400000]],
    bills: [['Electricity', 'Bills', 400000, 20], ['Home internet', 'Bills', 385000, 5], ['Netflix', 'Entertainment', 186000, 12], ['Water', 'Bills', 120000, 25], ['Health insurance', 'Health', 150000, 10], ['Life insurance', 'Other', 350000, 28]],
    savings: [['Tabungan', 'Emergency Fund', 1500000], ['Investasi', 'Mutual Fund', 1000000]], withdraw: ['Emergency Fund', 'Scooter service'],
    targets: [['Emergency fund', 30000000, 'Emergency Fund'], ['Trip to Bali', 12000000, 'Mutual Fund'], ['Scooter down payment', 8000000, 'Emergency Fund']],
    debts: [['owed', 'Scooter installment', 18000000, 11400000, 0, '19 months left'], ['owed', 'Personal loan', 10000000, 6500000, 12, 'Paid on the 15th'], ['receivable', 'Loan to Andi', 1500000, 1000000, 0, 'Paid in parts']],
    debtPay: 850000, saved: 'Emergency Fund',
  },
};

const ym = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
const pad = (n) => String(n).padStart(2, '0');

async function api(page, method, path, body) {
  return page.evaluate(async (method, path, body) => {
    const csrf = document.cookie.split('; ').find((c) => c.startsWith('wallet_csrf='))?.split('=')[1];
    const r = await fetch('/api' + path, { method, headers: { 'content-type': 'application/json', 'x-csrf-token': decodeURIComponent(csrf || '') }, body: body ? JSON.stringify(body) : undefined });
    return { status: r.status, data: await r.json().catch(() => null) };
  }, method, path, body);
}

async function newPage(browser, lang) {
  // Konteks terpisah per halaman supaya sesi tiap akun tidak bercampur.
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.evaluateOnNewDocument((lang) => {
    try { localStorage.setItem('finance-language', JSON.stringify({ state: { language: lang }, version: 0 })); } catch { /* abaikan */ }
  }, lang);
  return page;
}

async function login(page, email, uid) {
  await page.goto(`${APP}/login`, { waitUntil: 'networkidle0' });
  await page.evaluate((e, pw) => {
    const set = (el, v) => { Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(el, v); el.dispatchEvent(new Event('input', { bubbles: true })); };
    const i = [...document.querySelectorAll('input')]; set(i[0], e); set(i[1], pw);
  }, email, PASSWORD);
  await page.click('button[type=submit]');
  await sleep(3500);
  await page.evaluate(() => { sessionStorage.setItem('vaulty:onboarding-skipped', '1'); Object.keys(localStorage).filter((k) => k.startsWith('vaulty:tour')).forEach((k) => localStorage.setItem(k, 'done')); }); if (uid) await page.evaluate((u) => localStorage.setItem(`vaulty:tour:${u}`, 'done'), uid);
}

async function seed(browser, lang, tag) {
  const d = P[lang];
  const email = d.email.replace('@', `${tag}@`);
  // Sisa data demo dari jalan sebelumnya (nama pengguna pasangan harus unik).
  sql(`UPDATE users SET username=CONCAT('old_', SUBSTRING(id,-12)) WHERE username IN ('${d.partner}','${d.owner}'); DELETE FROM auth_rate_limits;`);
  const reg = await fetch(`${APP}/api/portal/register`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email, name: d.name, password: PASSWORD, plan: 'personal', language: lang }) });
  if (reg.status !== 201) throw new Error(`register ${reg.status}`);
  const [uid, org] = sql(`SELECT u.id, o.id FROM users u JOIN portal_users p ON p.id=u.portal_user_id JOIN organizations o ON o.owner_user_id=u.id WHERE p.email='${email}'`).split(/\s+/);
  const partnerId = `d0c50000-0000-4000-8000-${String(Date.now()).slice(-12).padStart(12, '0')}`;
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 4, 1);
  sql(`UPDATE users SET username='${d.owner}' WHERE id='${uid}'; UPDATE organizations SET plan='family', name='${d.workspace}' WHERE id='${org}';
    UPDATE subscriptions SET plan='family', status='active', billing_interval='monthly', current_period_start=DATE_SUB(NOW(), INTERVAL 10 DAY), current_period_end=DATE_ADD(NOW(), INTERVAL 20 DAY) WHERE organization_id='${org}';
    INSERT INTO users (id,username,password_hash,role,language) VALUES ('${partnerId}','${d.partner}','x','user','${lang}');
    INSERT INTO organization_members (id,organization_id,user_id,role,joined_at) VALUES (UUID(),'${org}','${partnerId}','member',NOW());`);
  const page = await newPage(browser, lang);
  await login(page, email, uid);

  const r = rng(lang === 'id' ? 7 : 11);
  const money = (lo, hi) => Math.round((lo + r() * (hi - lo)) / 1000) * 1000;
  for (let m = 0; m < 5; m++) {
    const first = new Date(start.getFullYear(), start.getMonth() + m, 1);
    const key = ym(first);
    const isCurrent = key === ym(now);
    const lastDay = isCurrent ? now.getDate() : new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
    const date = (day) => `${key}-${pad(Math.min(day, lastDay))}`;
    const inc = (day, sumber, kategori, jumlah) => day <= lastDay && api(page, 'POST', '/incomes', { tanggal: date(day), bulan: key, sumber, kategori, metode: d.methods.transfer, jumlah, catatan: '' });
    await inc(25, d.salary, d.inc[0], 12500000);
    await inc(28, d.dividend, d.inc[2], 250000);
    if (m === 1 || m === 3) await inc(14, d.freelance, d.inc[3], 2000000);
    if (m === 2) await inc(20, d.bonus, d.inc[1], 3000000);
    for (const [cat, name, lo, hi, times, method, prob = 1] of d.exps) {
      if (r() > prob) continue;
      for (let t = 0; t < times; t++) {
        const day = 1 + Math.floor(r() * lastDay);
        await api(page, 'POST', '/expenses', { tanggal: date(day), bulan: key, nama: name, kategori: d.exp[cat], metode: d.methods[method], jumlah: money(lo, hi), catatan: '' });
      }
    }
    if (m >= 3) for (const [kategori, anggaran] of d.budgets) await api(page, 'POST', '/budgets', { bulan: key, kategori, anggaran, rollover: false });
    for (const [jenis, akun, jumlah] of d.savings) if (lastDay >= 5) await api(page, 'POST', '/savings', { tanggal: date(5), jenis, nama_akun: akun, setoran: jumlah, penarikan: 0, catatan: '' });
    if (m === 2) await api(page, 'POST', '/savings', { tanggal: date(18), jenis: 'Tabungan', nama_akun: d.withdraw[0], setoran: 0, penarikan: 600000, catatan: d.withdraw[1] });
  }
  const startKey = ym(start);
  const endKey = `${now.getFullYear() + 1}-${pad(now.getMonth() + 1)}`;
  for (const [nama, kategori, jumlah, hari] of d.bills) {
    const res = await api(page, 'POST', '/bills', { nama, kategori, jumlah, tanggal_jatuh_tempo: hari, mulai_dari: startKey, sampai_dengan: 'ongoing', catatan: '', is_active: true });
    const id = res.data?.id;
    // Bulan-bulan lalu lunas semua; bulan ini hanya yang jatuh temponya sudah lewat.
    if (id) for (let m = 0; m < 5; m++) {
      const cur = m === 4;
      if (cur && hari >= now.getDate()) continue;
      const k = ym(new Date(now.getFullYear(), now.getMonth() - 4 + m, 1));
      await api(page, 'POST', '/bill_payments', { bill_id: id, bulan: k, dibayar_pada: `${k}-${pad(Math.min(hari, 27))} 09:00:00`, jumlah_dibayar: jumlah });
    }
  }
  for (const [nama_target, target_amount, linked_account] of d.targets) await api(page, 'POST', '/savings_targets', { nama_target, target_amount, start_date: `${startKey}-01`, target_date: `${endKey}-01`, linked_account });
  for (const [direction, name, principal, remaining, interest_rate, notes] of d.debts) {
    const res = await api(page, 'POST', '/planning/debts', { direction, name, principal, remaining, interest_rate, due_date: `${ym(now)}-${pad(Math.min(28, now.getDate() + 5))}`, status: 'active', notes });
    if (res.data?.id && direction === 'owed') await api(page, 'POST', `/planning/debts/${res.data.id}/payments`, { amount: d.debtPay, paid_at: `${ym(now)}-05` });
  }
  const worth = lang === 'id'
    ? [['asset', 'Tabungan BCA', 'Kas', 24000000], ['asset', 'Reksa Dana', 'Investasi', 12000000], ['asset', 'Emas batangan', 'Investasi', 8000000], ['asset', 'Motor', 'Kendaraan', 20000000], ['liability', 'Cicilan motor', 'Utang', 11400000], ['liability', 'KTA Bank', 'Utang', 6500000]]
    : [['asset', 'Checking account', 'Cash', 24000000], ['asset', 'Mutual fund', 'Investments', 12000000], ['asset', 'Gold bars', 'Investments', 8000000], ['asset', 'Scooter', 'Vehicle', 20000000], ['liability', 'Scooter installment', 'Debt', 11400000], ['liability', 'Personal loan', 'Debt', 6500000]];
  for (const [type, name, category, value] of worth) await api(page, 'POST', '/planning/net-worth', { type, name, category, value, as_of_date: `${ym(now)}-${pad(now.getDate())}` });
  const rules = lang === 'id' ? [['Grab', d.exp[1]], ['Netflix', d.exp[4]], ['Indomaret', d.exp[0]]] : [['Ride', d.exp[1]], ['Netflix', d.exp[4]], ['Coffee', d.exp[0]]];
  for (const [pattern, category] of rules) await api(page, 'POST', '/planning/rules', { transaction_type: 'expense', pattern, category, priority: 1, active: true });
  // Pasangan mencatat sebagian pengeluaran, supaya laporan per anggota terlihat nyata.
  sql(`UPDATE expenses SET user_id='${partnerId}' WHERE organization_id='${org}' AND kategori IN ('${d.exp[2]}','${d.exp[4]}','${d.exp[5]}');`);
  // Riwayat pembayaran langganan.
  const invBase = (Number(String(tag).replace(/\D/g, '')) % 8000) + 1000;
  const inv = (n, monthsAgo) => `INSERT INTO billing_orders (id, order_id, organization_id, organization_name, user_id, customer_name, customer_email, plan, billing_interval, kind, base_amount, tax_percent, tax_amount, total_amount, status, payment_type, period_start, period_end, invoice_number, paid_at)
    VALUES (UUID(), 'VLT-demo-${tag}-${n}', '${org}', '${d.workspace}', '${uid}', '${d.name}', '${email}', 'family', 'monthly', '${n === 1 ? 'new' : 'renewal'}', 65000, 0, 0, 65000, 'paid', 'qris', DATE_SUB(NOW(), INTERVAL ${monthsAgo * 30 + 10} DAY), DATE_SUB(NOW(), INTERVAL ${monthsAgo * 30 - 20} DAY), 'INV-2026-${invBase + n}', DATE_SUB(NOW(), INTERVAL ${monthsAgo * 30 + 10} DAY));`;
  sql(inv(1, 2) + inv(2, 1));
  await page.close();
  return { email, uid, org };
}

async function shot(page, lang, name, opts = {}) {
  const dir = join(process.cwd(), 'src/assets/screens', lang);
  mkdirSync(dir, { recursive: true });
  let buf;
  if (opts.selector) {
    const el = await page.$(opts.selector);
    if (!el) { console.log(`  ! ${name}: elemen ${opts.selector} tidak ditemukan`); return; }
    await el.evaluate((n) => n.scrollIntoView({ block: 'center' }));
    await sleep(500);
    buf = await el.screenshot({ type: 'png' });
  } else {
    buf = await page.screenshot({ type: 'png', fullPage: Boolean(opts.full) });
  }
  await sharp(buf).webp({ quality: 82 }).toFile(join(dir, `${name}.webp`));
  console.log(`  ✓ ${lang}/${name}`);
}

async function visit(page, path, wait = 1600) {
  await page.goto(`${APP}${path}`, { waitUntil: 'networkidle0' });
  await sleep(wait);
}

async function capture(browser, lang, acct) {
  const page = await newPage(browser, lang);
  await login(page, acct.email, acct.uid);
  const go = async (path, name, opts) => { await visit(page, path, opts?.wait); await shot(page, lang, name, opts); };
  await go('/dashboard', 'dashboard');
  await go('/income', 'income');
  await visit(page, '/income'); await page.evaluate(() => document.querySelector('[data-tour="page-add"]')?.click()); await sleep(900); await shot(page, lang, 'income-form'); await page.keyboard.press('Escape'); await sleep(300);
  await go('/expense', 'expense');
  await visit(page, '/expense'); await page.evaluate(() => document.querySelector('[data-tour="page-add"]')?.click()); await sleep(900); await shot(page, lang, 'expense-form'); await page.keyboard.press('Escape'); await sleep(300);
  await go('/budget', 'budget');
  await go('/bills', 'bills');
  await go('/savings', 'savings');
  await go('/targets', 'targets');
  await go('/insights', 'insights', { full: true });
  await go('/heatmap', 'heatmap');
  await go('/health-score', 'health-score', { wait: 2400 });
  await go('/reports', 'reports');
  await visit(page, '/planning'); await shot(page, lang, 'planning-worth');
  let tabs = await page.$$('[role=tab]'); await tabs[1].click(); await sleep(1200); await shot(page, lang, 'planning-debts');
  tabs = await page.$$('[role=tab]'); await tabs[2].click(); await sleep(900); await shot(page, lang, 'planning-rules');
  tabs = await page.$$('[role=tab]'); await tabs[3].click(); await sleep(900); await shot(page, lang, 'planning-notifications');
  await go('/master-data', 'master-data');
  await go('/members', 'members');
  await visit(page, '/subscription');
  // Banner simulasi pembayaran hanya ada di lokal, jangan ikut terpotret.
  await page.evaluate(() => [...document.querySelectorAll('div')].filter((n) => /simulasi pembayaran|simulation mode/i.test(n.innerText) && n.innerText.length < 120).forEach((n) => { n.style.display = 'none'; }));
  await shot(page, lang, 'subscription', { full: true });
  await visit(page, '/settings');
  await shot(page, lang, 'settings');
  await shot(page, lang, 'settings-mcp', { selector: '[data-tour="agent-access"]' });
  await page.close();
}

async function captureOnboarding(browser, lang) {
  const d = P[lang];
  const email = d.email.replace('@', `onb${Date.now() % 100000}@`);
  sql('DELETE FROM auth_rate_limits;');
  const page = await newPage(browser, lang);
  await visit(page, '/login');
  await shot(page, lang, 'login');
  await visit(page, '/register');
  await shot(page, lang, 'register');
  const reg = await fetch(`${APP}/api/portal/register`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email, name: d.name, password: PASSWORD, plan: 'personal', language: lang }) });
  if (reg.status !== 201) { console.log('  ! onboarding: register gagal'); return; }
  await login(page, email);
  await page.evaluate(() => sessionStorage.removeItem('vaulty:onboarding-skipped'));
  await page.goto(`${APP}/onboarding`, { waitUntil: 'networkidle0' }); await sleep(1200);
  const next = async () => { await page.evaluate(() => { const b = [...document.querySelectorAll('main button')].filter((x) => !x.disabled && /bg-primary|primary/.test(x.className)); (b[b.length - 1] || null)?.click(); }); await sleep(1200); };
  await shot(page, lang, 'onboarding-1-welcome');
  await next(); await shot(page, lang, 'onboarding-2-plan');
  await next(); await shot(page, lang, 'onboarding-3-workspace');
  await page.close();
}

async function captureForms(browser, lang, acct) {
  const page = await newPage(browser, lang);
  await login(page, acct.email, acct.uid);
  for (const [path, name] of [['/budget', 'budget-form'], ['/bills', 'bills-form'], ['/savings', 'savings-form'], ['/targets', 'targets-form'], ['/master-data', 'master-data-form']]) {
    await visit(page, path);
    await page.evaluate(() => document.querySelector('[data-tour="page-add"]')?.click()); await sleep(900);
    await shot(page, lang, name);
    await page.keyboard.press('Escape'); await sleep(300);
  }
  await visit(page, '/expense');
  const clip = await page.$('table tbody tr td:last-child button'); if (clip) { await clip.click(); await sleep(900); }
  await shot(page, lang, 'expense-receipt');
  await page.close();
}

async function captureTour(browser, lang, acct) {
  const page = await newPage(browser, lang);
  await login(page, acct.email, acct.uid);
  await page.evaluate((u) => { localStorage.removeItem(`vaulty:tour:${u}`); }, acct.uid);
  await page.goto(`${APP}/dashboard`, { waitUntil: 'networkidle0' }); await sleep(2800);
  await shot(page, lang, 'tour-prompt');
  const yes = lang === 'id' ? 'Ya, tunjukkan' : 'Yes, show me';
  await page.evaluate((label) => [...document.querySelectorAll('[role=dialog] button')].find((b) => b.innerText.trim() === label)?.click(), yes); await sleep(1800);
  await shot(page, lang, 'tour-step');
  await page.close();
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
try {
  for (const lang of which === 'all' ? ['id', 'en'] : [which]) {
    const store = join(process.cwd(), 'scripts/.demo-accounts.json');
    const saved = existsSync(store) ? JSON.parse(readFileSync(store, 'utf8')) : {};
    if (!process.argv[3]) {
      console.log(`== ${lang}: membuat data dummy`);
      saved[lang] = await seed(browser, lang, `d${Date.now() % 100000}`);
      writeFileSync(store, JSON.stringify(saved, null, 2));
      console.log(`== ${lang}: memotret`);
      await capture(browser, lang, saved[lang]);
    }
    if (process.argv[3] === 'forms') { await captureForms(browser, lang, saved[lang]); continue; }
    await captureForms(browser, lang, saved[lang]);
    await captureTour(browser, lang, saved[lang]);
    await captureOnboarding(browser, lang);
  }
} finally {
  await browser.close();
}
