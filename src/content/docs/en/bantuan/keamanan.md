---
title: "Account and data security"
description: "How Vaulty protects your account, and what you can do yourself."
sidebar:
  order: 3
---

## What Vaulty does

- **Passwords are not stored as typed.** What is kept is a one-way scramble (hash), and Vaulty requires a password of at least 12 characters with an uppercase letter, a lowercase letter, and a number.
- **Secure sessions.** Sessions use a cookie that page scripts cannot read, sent only over HTTPS, and protected by a CSRF token. Sessions end automatically after a period of inactivity, and you can sign out other devices yourself.
- **Attempt limits.** Sign-in, sign-up, and password reset attempts are rate limited so passwords cannot be guessed repeatedly.
- **Two-step verification (TOTP)** with recovery codes, on the Personal plan and above. The TOTP secret is stored encrypted.
- **Organizations are separated.** Every request to the server is checked against your active organization. There is no way to see another organization's data.
- **Per-member roles.** Owner, admin, member, and viewer have different permissions, and they are enforced on the server, not just hidden in the interface.
- **Single-use, time-limited links:** email verification 24 hours, password reset 1 hour, member invitations 7 days.
- **Payments through Midtrans.** Card data is processed by Midtrans and never stored by Vaulty.
- **AI agent (MCP) tokens** are stored only as a hash, tied to one organization, can be limited to read only, and can be revoked at any time.
- **Activity log.** Changes are recorded (who, what, when), including those made through MCP.
- **Trash.** Deleted data can be restored.

## What you can do

1. Use a **unique password** for Vaulty and do not reuse it elsewhere.
2. Turn on **two-step verification** and keep the recovery codes somewhere safe.
3. Check **Devices and sessions** in Settings and sign out devices you do not recognize.
4. Treat an **MCP token like a password**. Revoke tokens you no longer use or that may have leaked.
5. Give family members the **Viewer** role if they only need to look.
6. Be wary of emails asking for your password or a code. Vaulty never asks for them by email.

## Reporting a security problem

If you find a weakness or think your account is being misused, contact us right away by email (see [Contact us](/en/bantuan/kontak/)) and change your password. Include a short description, without sending your password.
