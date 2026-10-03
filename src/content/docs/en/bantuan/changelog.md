---
title: "Changelog"
description: "Changes and new features in Vaulty."
sidebar:
  order: 4
---

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
