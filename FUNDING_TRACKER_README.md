# 🔧 SUNSET GLOW FUNDING TRACKER SYSTEM

**Clean, trackable, version-controlled funding management.**

---

## 📂 SYSTEM COMPONENTS

### Core YAML Files:
1. **FUNDING.META.yaml** — Shared schema, enums, totals
2. **operations.yaml** — Equipment, tools, inventory, crew (soft gates)
3. **compliance.yaml** — Insurance, legal, banking (hard gates)
4. **revenue_engine.yaml** — Marketing, web, customer acquisition (soft gates)

### Automation:
5. **funding_validator.py** — Computes totals, validates gates, exports reports

### Generated Outputs:
- **funding_breakdown.md** — Investor-ready summary with totals
- **compliance_status.md** — Gate status with blocking items highlighted
- **ops_packing_list.csv** — Spreadsheet of all operations line items

---

## 🎯 HOW THIS WORKS

### Hard Gates vs. Soft Gates

**HARD GATES (compliance.yaml):**
- **Cannot start operations** until all priority 1 gates are `status: verified`
- Examples: Insurance, LLC filing, business bank account
- Enforced by: `compliance.start_permission.rule`

**SOFT GATES (operations.yaml, revenue_engine.yaml):**
- **Improves operations** but not required to start
- Examples: Ladder rack, yard signs, routing app
- Can be acquired progressively as revenue flows

### Status Progression

Each line item moves through these states:
1. **planned** — Identified need, no quote yet
2. **quoted** — Price confirmed, vendor selected
3. **ordered** — Purchase initiated, waiting delivery
4. **received** — Item in hand, receipt uploaded
5. **active** — Service/subscription live
6. **verified** — Fully documented, compliance cleared

---

## 🚀 QUICK START

### Step 1: Update Your Quotes
Open each YAML file and replace placeholder values:

```yaml
# BEFORE (generic)
- key: "ladder_24ft_fiberglass"
  status: "quoted"
  priority: 1
  qty: 1
  unit_cost: 260
  vendor: "Werner"

# AFTER (your actual quote)
- key: "ladder_24ft_fiberglass"
  status: "ordered"
  priority: 1
  qty: 1
  unit_cost: 279.99
  vendor: "Home Depot - Princeton"
  receipt_path: "receipts/2025-10-16_homedepot_ladder.pdf"
```

### Step 2: Run the Validator
```bash
python3 funding_validator.py
```

**Output:**
- Console summary (totals + gate status)
- `funding_breakdown.md` (share with investors)
- `compliance_status.md` (track what's blocking you)
- `ops_packing_list.csv` (import to Google Sheets)

### Step 3: Track Progress
As you secure items:
1. Update `status` field (`planned` → `quoted` → `ordered` → `verified`)
2. Add `receipt_path` or `docs` references
3. Re-run validator to update reports

---

## 💰 CURRENT FUNDING STATUS

**Total Required:** $6,775.00  
**Breakdown:**
- Operations: $4,195.00 (equipment, tools, inventory, crew float)
- Compliance: $1,500.00 (insurance, LLC, bank account)
- Revenue Engine: $1,080.00 (marketing, web stack)

**Priority 1 Only:** ~$5,500 (calculated by validator)

**Hard Gate Status:** ❌ BLOCKED  
**Blocking Items:** 6 compliance gates (see `compliance_status.md`)

---

## 📋 DAILY WORKFLOW

### Morning: Check Status
```bash
python3 funding_validator.py
```

Review `compliance_status.md`:
- What's blocking start permission?
- Which gates can I clear today?

### During Day: Update YAML
As you get quotes, make purchases, or receive items:
1. Open relevant YAML file
2. Update `status`, `unit_cost`, `vendor`, `receipt_path`
3. Save file

### Evening: Regenerate Reports
```bash
python3 funding_validator.py
```

Send `funding_breakdown.md` to investors showing progress.

---

## 🎯 PRIORITY TIERS EXPLAINED

### Priority 1 (Must-Have)
- **Operations:** Ladders, safety gear, core tools, Tier 1–2 inventory
- **Compliance:** ALL gates (insurance, LLC, bank, contracts)
- **Revenue:** Yard signs, Google Ads bootstrap, booking form

**Target:** Cover all Priority 1 items with $7K fundraise

### Priority 2 (Should-Have)
- **Operations:** Step ladder, ladder levelers, extra storage bins
- **Compliance:** (none at this level)
- **Revenue:** Door hangers, tracking phone number

**Target:** Add these if you raise $8K–$10K

### Priority 3 (Nice-to-Have)
- **Operations:** Tier 3 inventory, routing app subscription
- **Compliance:** (none at this level)
- **Revenue:** (none at this level)

**Target:** Acquire from first revenue

---

## 🔒 COMPLIANCE GATE CLEARANCE CHECKLIST

Track in `compliance.yaml` as you complete each step:

### 1. Insurance (General Liability)
- [ ] Get 3 quotes (Hiscox, The Hartford, NEXT Insurance)
- [ ] Select carrier
- [ ] Pay premium ($1,200)
- [ ] Receive binder + policy declarations
- [ ] Update YAML: `status: verified`, `carrier: "..."`, `policy_number: "..."`

### 2. Workers' Comp
- [ ] Determine if needed (hiring W2 crew?)
- [ ] Get quote if yes
- [ ] OR: Document OAI (Owner as Independent) exemption
- [ ] Update YAML: `status: verified` or `status: not_required`

### 3. LLC Filing
- [ ] File online at Texas SOS: [sos.state.tx.us](https://sos.state.tx.us)
- [ ] Pay $300 fee
- [ ] Receive articles of organization
- [ ] Update YAML: `status: verified`, `sos_tracking: "..."`

### 4. EIN (Employer ID)
- [ ] Apply online at IRS: [irs.gov/ein](https://www.irs.gov/ein)
- [ ] Free, instant approval
- [ ] Download confirmation letter
- [ ] Update YAML: `status: verified`, `confirmation_letter: "path/to/file"`

### 5. Business Bank Account
- [ ] Bring: LLC articles, EIN letter, ID
- [ ] Open account (local credit union or Chase/BoA)
- [ ] Deposit initial funds
- [ ] Update YAML: `status: verified`, `bank: "..."`, `account_last4: "..."`

### 6. Customer Contracts
- [ ] Draft service agreement (use template from `SIMPLE_INVESTMENT_AGREEMENT.md`)
- [ ] Include: scope, pricing, payment, liability waiver, takedown terms
- [ ] (Optional) Have local attorney review ($300–$500)
- [ ] Update YAML: `status: verified`, `counsel_reviewed: true/false`

**When all 6 are verified:** Validator will show `✅ START PERMISSION GRANTED`

---

## 📊 EXPORT & SHARE OPTIONS

### For Investors (PDF/Email)
```bash
# Generate reports
python3 funding_validator.py

# Share these files:
# - funding_breakdown.md (convert to PDF via Pandoc or print to PDF from browser)
# - compliance_status.md (shows transparency + progress)
```

### For Your Own Tracking (Spreadsheet)
```bash
# Import ops_packing_list.csv into Google Sheets
# Sort by priority, status, or category
# Add columns for: date_ordered, date_received, tracking_number
```

### For Git Tracking (Version Control)
```bash
# Commit YAML changes daily
git add operations.yaml compliance.yaml revenue_engine.yaml
git commit -m "Updated 3 quotes, marked insurance as ordered"
git push

# Investors can see your progress in real-time via GitHub
```

---

## 🔄 EXAMPLE: Clearing Your First Gate

**Scenario:** You just purchased general liability insurance.

### Step 1: Update compliance.yaml
```yaml
gates:
  - key: "insurance_general_liability"
    status: "verified"  # changed from "quoted"
    priority: 1
    premium: 1245.00  # actual cost (was 1200 estimate)
    carrier: "Hiscox"
    policy_number: "GLH-TX-2025-123456"
    binder_on_file: true
    docs:
      - "receipts/2025-10-17_hiscox_binder.pdf"
      - "receipts/2025-10-17_hiscox_policy_declarations.pdf"
    note: "Certificate available for customers upon request"
```

### Step 2: Run validator
```bash
python3 funding_validator.py
```

**New output:**
```
🚦 Start Permission: ❌ BLOCKED
   Gates Verified: 1/6
   Blocking: workers_comp, llc_filing_texas, ein, business_bank_account, customer_contract_and_waiver
```

**Progress:** 1 down, 5 to go!

### Step 3: Share update with investors
- Send `compliance_status.md` via email
- Subject: "Sunset Glow Update: Insurance Secured (1/6 gates cleared)"
- Shows you're executing on the plan

---

## 🎯 TARGETING $7K FUNDRAISE

### Current Totals (from validator):
- **Operations Priority 1:** $3,465
- **Compliance Priority 1:** $1,500
- **Revenue Priority 1:** $945
- **Total Priority 1:** ~$5,910

### Recommended Ask: $7,000
**Why $7K instead of $5,910?**
- Buffer for cost overruns (quotes can increase 10–15%)
- Operational float (gas, permits, unexpected expenses)
- Rounds to clean fundraising target

**Breakdown for Investors:**
- "I need $7K to cover all must-have items (Priority 1)"
- "This gets me operational in 10 days"
- "Anything beyond Priority 1 = scaling faster"

---

## 🔧 ADVANCED: Custom Validators

Want to add your own checks? Edit `funding_validator.py`:

### Example: Check if total is within fundraise target
```python
# Add to bottom of funding_validator.py

if grand_total > 10000:
    print(f"⚠️  WARNING: Total exceeds $10K target by ${grand_total - 10000:,.2f}")
    print("   Consider deferring Priority 2–3 items to post-revenue phase.")
```

### Example: Flag items without receipts
```python
# Add to validator

missing_receipts = []
for category, data in ops.get('items', {}).items():
    for entry in data.get('entries', []):
        if entry.get('status') in ['ordered', 'received', 'verified']:
            if not entry.get('receipt_path'):
                missing_receipts.append(entry['key'])

if missing_receipts:
    print(f"📎 Missing receipts: {', '.join(missing_receipts)}")
```

---

## 📁 FILE ORGANIZATION

```
/workspace/
├── FUNDING.META.yaml           # Schema + enums
├── operations.yaml             # Equipment, tools, inventory
├── compliance.yaml             # Insurance, legal, banking
├── revenue_engine.yaml         # Marketing, web, CRM
├── funding_validator.py        # Automation script
├── funding_breakdown.md        # Generated report (share with investors)
├── compliance_status.md        # Generated gate tracker
├── ops_packing_list.csv        # Generated spreadsheet
└── receipts/                   # Store all receipts here
    ├── 2025-10-17_hiscox_binder.pdf
    ├── 2025-10-18_homedepot_ladder.pdf
    └── ...
```

**Tip:** Create `receipts/` folder and reference paths in YAML as you upload documents.

---

## ✅ NEXT STEPS

### Today (Oct 15):
1. Review all 3 YAML files
2. Replace generic vendors/costs with YOUR actual quotes
3. Run validator to see real totals
4. Share `funding_breakdown.md` with first 5 investors

### This Week:
5. As quotes come in, update YAML + re-run validator
6. Clear 1–2 compliance gates (LLC filing, insurance quotes)
7. Use `ops_packing_list.csv` to organize purchases

### By Oct 20 (Fundraise Close):
8. All Priority 1 items either `ordered` or `verified`
9. `compliance_status.md` shows 6/6 gates cleared (or 5/6 with clear plan)
10. Ready to deploy capital immediately

---

## 🔥 WHY THIS SYSTEM WORKS

**Problem:** Spreadsheets get messy, markdown files are static, email threads lose context.

**Solution:** YAML files are:
- ✅ **Human-readable** (easy to edit in any text editor)
- ✅ **Machine-parseable** (validator automates totals + reports)
- ✅ **Git-trackable** (version control shows progress over time)
- ✅ **Export-friendly** (convert to CSV, Markdown, PDF, or JSON)

**Result:** You have a **single source of truth** that updates in real-time as your funding progresses.

---

## 🆘 TROUBLESHOOTING

### Validator won't run
**Error:** `ModuleNotFoundError: No module named 'yaml'`  
**Fix:** Install PyYAML:
```bash
pip3 install pyyaml
```

### Totals seem wrong
**Check:** Are `qty` and `unit_cost` values correct in YAML?  
**Fix:** Review each entry, ensure no typos (e.g., `unit_cost: 1200` not `unit_cost: "1200"`)

### Gate status stuck at "blocked"
**Check:** Are all Priority 1 gates `status: verified`?  
**Fix:** Update YAML as you clear each gate, re-run validator

---

## 📞 SUPPORT

**Questions?** Review:
- `START_HERE.md` — High-level fundraising strategy
- `MASTER_ACTION_PLAN.md` — 7-day execution timeline
- This file (`FUNDING_TRACKER_README.md`) — YAML system usage

**Need to modify?** YAML files are plain text. Edit in:
- VS Code
- Sublime Text
- Notepad++ (Windows)
- Vim/Nano (Linux/Mac terminal)

---

▛▞ You now have investor-grade tracking without complex software :: Just YAML + Python :: ∎
