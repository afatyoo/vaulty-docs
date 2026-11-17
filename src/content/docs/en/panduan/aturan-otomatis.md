---
title: "Automatic rules and automatic categories"
description: "Create rules that change new transactions automatically, and understand categories that fill themselves in."
sidebar:
  order: 9.7
---

**Personal** plan and above. The rules live in **Planning**, on the **Category Rules** tab, under **Advanced rules**.

## Advanced rules

A rule has **conditions** and **actions**. It runs for every new transaction, from the app or from an AI agent (MCP).

**Conditions** (1 to 5, all must match):

| Field | Options |
|---|---|
| Name | contains, equals, starts with |
| Amount | at least, at most, equals |
| Account | equals |
| Category | equals |

**Actions** (choose at least one):

- **Set category**
- **Rename to**
- **Add tags**
- **Exclude from reports**
- **Record as transfer to** an account (expense rules only)
- **Email owners and admins**

When two rules change the same thing, the one with the **higher priority** wins. Tags from all matching rules are combined.

### Record as transfer

For example a rule "name contains GoPay top up" with the action **Record as transfer to the GoPay account**. Every new "GoPay top up" expense from BCA is replaced by a transfer from BCA to GoPay, so it does not count as an expense. The action is skipped when the expense belongs to a bill, to savings, or to a split, or when the source and target accounts are the same.

### Email

Owners and admins get an in-app notification, plus an email if the plan includes email reminders and a notification address is set. At most **30 a day** per organization, so a rule that is too broad cannot flood the inbox.

### Run on past transactions

**Run on past transactions** applies the rule to the last **365 days**. You can preview how many would change first. The **Record as transfer** and **Email** actions do not run here, so your history is not changed in bulk and no mass emails are sent.

An organization can have up to 50 rules.

## Categories that fill themselves in

When you type a transaction name and the category is still empty, Vaulty can guess the category from your own habits (words in the name, payment method, and size of the amount). The field is marked **auto filled**, and your choice is never overwritten.

- Category rules you create **always win** over the guess.
- The guess only appears once you have at least **30 categorized transactions**, and only when it is confident enough.
- It is calculated on Vaulty's server from your own data and is not sent to an outside service.
- It can be turned off with the switch on the **Category Rules** tab.
