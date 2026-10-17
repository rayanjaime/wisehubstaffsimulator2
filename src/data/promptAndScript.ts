export const MASTER_PROMPT_TEMPLATE = `Create an interactive, production-grade training simulator for trainees and newly hired contractors at Homeaglow to practice connecting their Wise (formerly TransferWise) payment account to their Hubstaff account.

### Context & Goal
- Platform: Hubstaff web application (specifically the contractor payment accounts view at https://app.hubstaff.com/users/2884697/payment_accounts)
- Organization: Homeaglow (home cleaning and contractor operations)
- Purpose: Used in onboarding training demos so trainees can safely practice linking their Wise payout account without risking real financial credentials or failing live payroll verification.
- Problem Solved: In production, contractors often fail their first payroll deposit due to name mismatches between their Hubstaff profile and their Wise bank/balance account, incorrect payout currency, or incomplete Wise OAuth authorizations. This simulator trains them on both the happy path and edge-case error resolutions.

### Key Functional Requirements
1. Authentic Hubstaff UI & Navigation:
   - Hubstaff top navigation bar with user avatar, organization selector locked to "Homeaglow", notifications, and breadcrumb: "Home / Users / 2884697 / Payment Accounts".
   - Hubstaff left-side navigation with Dashboard, Activity, Timesheets, Financials (with "Payment Accounts" active), Projects, and Settings.
   - Homeaglow payroll banner explaining: "Automated contractor payouts process weekly every Monday at 12:00 AM UTC. Active Wise connection required."

2. Payment Accounts Management View:
   - List available Hubstaff payment integrations: Wise (Recommended by Homeaglow), PayPal, Payoneer, and Bitwage.
   - Show status badges (Not Connected, Active / Verified, Action Required, Pending 2FA).
   - "Connect Wise" button triggering a high-fidelity connection modal/wizard.

3. Wise Connection Wizard (Multi-step Flow):
   - Step 1: Account Type & Currency Selection (Personal vs Business; Payout currency: USD, PHP, GBP, CAD, EUR, AUD, etc.).
   - Step 2: Wise Account Identifier (Wise registered email address, Wise Tag, or local bank routing).
   - Step 3: Wise OAuth & Two-Factor Authentication (Simulated 2FA SMS/App verification code with one-click autofill).
   - Step 4: Name Matching & Compliance Verification:
     * Check if Wise Account Holder Name strictly matches the Hubstaff contractor profile name.
     * If names match, allow instant verified connection.
     * If scenario is "Name Mismatch", surface realistic Hubstaff/Homeaglow warning: "Name Mismatch: Wise recipient ('[Wise Name]') does not match Hubstaff legal name ('[Hubstaff Name]'). Payroll will bounce unless rectified." Provide resolution options: update Wise name or submit Homeaglow ID alias.
   - Step 5: Active Account State:
     * Display masked account email, currency, recipient ID, automated payroll status, and next scheduled payout calculation based on tracked hours (e.g., 32 hrs @ $20/hr = $640.00).

4. Training Demo Modes & Controls:
   - Guided Mode: Step-by-step interactive checklist with hint callouts and progress tracking (1 to 5 steps).
   - Exam / Test Mode: Realistic unassisted testing where trainee must complete the connection independently and receive a pass/fail compliance scorecard.
   - Scenario Switcher:
     * Happy Path (Standard instant connection)
     * Name Mismatch Error (Practice resolving KYC discrepancies)
     * Currency Selection Error (Practice selecting proper local currency vs USD)
     * 2-Step Verification Flow (Practice handling Wise security challenges)
   - Reset Button: Instantly clears simulation state so the next trainee can practice immediately.
   - Customizable Trainee Profile: Ability to edit User ID (default #2884697), Trainee Name, and Hourly Rate.

5. Visual Aesthetics:
   - Adhere strictly to Hubstaff's modern SaaS interface (clean enterprise layout, Hubstaff cobalt blue #2260ff accents, subtle borders, tabular numerals for monetary figures and IDs, zero generic AI placeholders).
   - Responsive, crisp, accessible design with zero dead clicks.`;

export const TRAINEE_INSTRUCTION_GUIDE = `# Homeaglow Contractor Onboarding: Hubstaff + Wise Setup Guide

## Objective
Learn how to successfully link your Wise account to Homeaglow's Hubstaff organization so your weekly cleaning / contractor earnings are deposited automatically with zero delays and minimal exchange fees.

---

### Step 1: Access Payment Accounts in Hubstaff
1. Navigate to the Hubstaff dashboard.
2. In the top organization switcher, confirm that **Homeaglow** is selected.
3. In the left sidebar under **Financials**, click **Payment Accounts** (URL: \`/users/2884697/payment_accounts\`).

### Step 2: Initiate Wise Connection
1. Locate the **Wise (formerly TransferWise)** payment card.
2. Click **Connect Wise Account**.
3. Note: Homeaglow recommends Wise over PayPal due to significantly lower currency exchange fees and faster direct bank deposits.

### Step 3: Enter Your Wise Account Details
1. **Account Type**: Select **Personal Account** (unless you operate an incorporated cleaning LLC).
2. **Payout Currency**: Select your local withdrawal currency (e.g., USD for US bank, PHP for Philippines, GBP for UK).
3. **Wise Registered Email**: Enter the exact email address registered to your active Wise account.

### Step 4: Verify Legal Name Consistency (CRITICAL)
- **Homeaglow Rule**: Your Hubstaff account name MUST match your Wise account legal name word-for-word.
- If your Wise account uses a middle name or nickname (e.g., "Maria C. Santos" vs "Maria Santos"), automated bank reconciliation will reject the payment.
- Always ensure both profiles share identical legal identification.

### Step 5: Complete Wise 2-Step Verification (2FA)
1. Enter the 6-digit verification code sent to your Wise authenticator app or phone.
2. Review permissions: Grant Hubstaff permission to send automated weekly payouts.
3. Click **Authorize & Complete Linking**.

### Step 6: Verify Active Status
1. Ensure the payment account badge reads **Active / Verified**.
2. Confirm the auto-payroll toggle is switched **ON** for weekly Monday deposits.
`;

export const TRAINEE_FAQ = [
  {
    q: "Why does Homeaglow prefer Wise instead of PayPal or Direct Wire?",
    a: "Wise charges mid-market exchange rates with minimal transparent transfer fees (typically 0.4% - 0.7%), compared to PayPal's 3-4% foreign exchange markup. This means contractors take home more of their earnings."
  },
  {
    q: "What causes a 'Name Mismatch' error during payroll processing?",
    a: "Hubstaff verifies recipient bank records against your Homeaglow contractor onboarding identity. If your Wise account is in a spouse's name, parent's name, or includes an unverified nickname, the automated payout will fail compliance checks."
  },
  {
    q: "When does Homeaglow disburse payroll via Hubstaff?",
    a: "Payroll is processed automatically every Monday at 12:00 AM UTC for all approved tracked hours from the preceding Monday-Sunday work cycle."
  },
  {
    q: "Can I receive payouts in a different currency than my home country?",
    a: "Yes. With a Wise Multi-Currency account, you can choose to receive payouts in USD or have Wise automatically convert them to your local currency."
  }
];
