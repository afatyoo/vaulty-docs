---
title: "Changelog"
description: "Changes and new features in Vaulty."
sidebar:
  order: 4
---

## October 17, 2026

**New**
- **Email notification per transaction (Personal and up):** turn it on in Planning → Notifications to get an email every time an income or expense is recorded. Off by default, and you can set a minimum amount so small day-to-day transactions don't flood your inbox.

**Fixed**
- **Long transaction names on the dashboard no longer wrap and misalign:** on mobile, a long transaction name (for example an investment or transfer description) wrapped onto two lines and pushed the category label out of place. It's now truncated with an ellipsis like the rest of the app.

## October 12, 2026

**New (internal)**
- **Custom plans:** the operator console can now create a custom plan (for example a higher member limit for one family) and assign it to a customer directly, without a code deployment. This does not change anything for existing Free, Personal, or Family plans.

## October 10, 2026

**New**

- **Waitlist confirmation email:** new signups receive an email using the Vaulty template in the landing page language. Signing up again with the same email and product does not send another email.


**Fixed**
- **Date fields now use Vaulty's own calendar:** adding an expense, income, saving, bill, target, or net worth entry used the browser's default date picker, which looked out of place. Every date field now opens a calendar styled to match the rest of the app.
- **Financial health score looks clearer:** the status badge no longer uses a colored circle emoji, it now shows a proper icon with a solid colored background so it reads clearly at a glance. The thin colored bar above the score card was also removed.
- **Cash flow chart always shows a full 6 months:** months with no transactions at all were skipped instead of shown as empty, so the chart could end with fewer bars than expected and leave an inconsistent blank gap on the right. The chart now always shows 6 consecutive months, zero bars included. The tooltip position was also fixed so it no longer lands on top of the growth percentage badge.
- **Recent transactions no longer break their row layout on mobile:** a long transaction name (like "Down payment for a motorcycle shock mount replacement") could push the amount onto its own wrapped line, misaligned with the other rows. On narrow screens, each transaction now lays out as a labeled card like the rest of the app's tables, instead of a cramped row.

## October 3, 2026

**Fixed**
- **No more double payments:** clicking the pay button twice, or a connection that fails and retries, no longer creates two separate transactions for the same checkout.

## September 29, 2026

**Changed**
- **New addresses:** the app now lives at **apps.vaulty.id**, these docs at **docs.vaulty.id**, and the main site at **vaulty.id**. Old addresses redirect automatically, so existing links and bookmarks keep working.
- **Waitlist is open:** until sign up opens, the buttons on vaulty.id lead to an email form. We will email you as soon as Vaulty is ready to use.

- **Ended subscriptions move to the Free plan:** the grace period is now 1 day (it was 7), after which the account moves to the Free plan instead of becoming read only. An ended trial also moves straight to Free. Your data stays safe.

**Fixed**
- The third card on the English **Insights** page showed the text `{count}`. It now reads "Spending categories".
- **Onboarding could be skipped** for the next account signed in on the same browser tab (for example a re-login, or a new Google sign-up): it is now checked per account, not per tab.
- **Paying from the "Choose plan" step in onboarding** now uses the same branded payment page as the dashboard's Subscription menu, instead of a plain Midtrans page. After paying, the "Continue account setup" button returns to onboarding right at the next step.

## September 28, 2026

**New**
- **Product tour:** the first time you sign in, Vaulty offers a tour explaining each menu for your plan, and you can replay it from the account menu.
- **Dedicated payment page** with Midtrans Snap embedded, full screen and with no popup.
- **AI agent access (MCP)** on the Personal plan and above: create a token and connect an AI assistant to read summaries and record transactions.
- **Advanced insights** on the Family plan: comparison with last month, end-of-month projection, and spending per member.
- **Email:** a welcome email, notices for failed or expired payments, and a **PDF invoice** attached to the receipt email.
- **Receipt attachments by camera** or file upload.
- These **docs**, with a user guide and screenshots.

**Fixed**
- Trial reminders now have their own wording instead of grace-period text.
- Language: one screen, one language, including emails, PDFs, and Excel files.
