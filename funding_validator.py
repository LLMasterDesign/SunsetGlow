#!/usr/bin/env python3
"""
SUNSET GLOW FUNDING VALIDATOR
Computes totals, validates hard gates, exports reports
"""

import yaml
from pathlib import Path
from typing import Dict, List, Any

# ▛▞ LOAD YAML FILES
def load_yaml(path: str) -> Dict[str, Any]:
    """Load YAML with error handling"""
    try:
        with open(path, 'r') as f:
            # Strip comment markers for clean parsing
            content = f.read()
            # Remove custom comment markers
            content = content.replace('//▙▖▙▖▞▞▙▂', '#')
            content = content.replace('//▚▚▂▂', '#')
            return yaml.safe_load(content)
    except Exception as e:
        print(f"❌ Error loading {path}: {e}")
        return {}

# ▛▞ COMPUTE OPERATIONS TOTAL
def compute_operations_total(ops: Dict) -> float:
    """Sum all operations line items"""
    total = 0.0
    if 'items' in ops:
        for category, data in ops['items'].items():
            if 'entries' in data:
                for entry in data['entries']:
                    qty = entry.get('qty', 0)
                    unit_cost = entry.get('unit_cost', 0)
                    total += qty * unit_cost
    return total

# ▛▞ COMPUTE COMPLIANCE TOTAL
def compute_compliance_total(comp: Dict) -> float:
    """Sum all compliance costs"""
    total = 0.0
    if 'gates' in comp:
        for gate in comp['gates']:
            total += gate.get('premium', 0) + gate.get('fee', 0)
    return total

# ▛▞ COMPUTE REVENUE ENGINE TOTAL
def compute_revenue_total(rev: Dict) -> float:
    """Sum all revenue engine costs"""
    total = 0.0
    if 'channels' in rev:
        for channel, data in rev['channels'].items():
            if 'entries' in data:
                for entry in data['entries']:
                    qty = entry.get('qty', 0)
                    unit_cost = entry.get('unit_cost', 0)
                    total += qty * unit_cost
    return total

# ▛▞ CHECK HARD GATES
def check_hard_gates(comp: Dict) -> Dict[str, Any]:
    """Validate all priority 1 compliance gates are verified"""
    gates = comp.get('gates', [])
    priority_1 = [g for g in gates if g.get('priority') == 1]
    verified = [g for g in priority_1 if g.get('status') == 'verified']
    
    can_start = len(verified) == len(priority_1)
    
    return {
        'total_gates': len(priority_1),
        'verified_gates': len(verified),
        'can_start': can_start,
        'blocking': [g['key'] for g in priority_1 if g.get('status') != 'verified']
    }

# ▛▞ GENERATE BREAKDOWN REPORT
def generate_breakdown(ops_total: float, comp_total: float, rev_total: float) -> str:
    """Create funding breakdown markdown"""
    grand_total = ops_total + comp_total + rev_total
    
    report = f"""# 💰 SUNSET GLOW FUNDING BREAKDOWN
**Generated:** 2025-10-15  
**Schema Version:** fund.1.0

---

## 📊 TOTALS

| Category | Amount | % of Total |
|----------|--------|------------|
| **Operations** | ${ops_total:,.2f} | {(ops_total/grand_total*100):.1f}% |
| **Compliance (Hard Gates)** | ${comp_total:,.2f} | {(comp_total/grand_total*100):.1f}% |
| **Revenue Engine** | ${rev_total:,.2f} | {(rev_total/grand_total*100):.1f}% |
| **GRAND TOTAL** | **${grand_total:,.2f}** | **100%** |

---

## 🎯 FUNDING TARGETS

| Scenario | Amount | Coverage |
|----------|--------|----------|
| **Minimum Viable** | $5,000 | Compliance + Priority 1 Ops + 30-day marketing |
| **Recommended** | $7,000 | Full Priority 1 coverage |
| **Optimal** | ${grand_total:,.2f} | All planned items |

---

## 📋 PRIORITY 1 BREAKDOWN

**Operations Priority 1:** ${sum(e.get('qty', 0) * e.get('unit_cost', 0) for cat in ops.get('items', {}).values() for e in cat.get('entries', []) if e.get('priority') == 1):,.2f}

**Compliance Priority 1:** ${sum(g.get('premium', 0) + g.get('fee', 0) for g in comp.get('gates', []) if g.get('priority') == 1):,.2f}

**Revenue Priority 1:** ${sum(e.get('qty', 0) * e.get('unit_cost', 0) for chan in rev.get('channels', {}).values() for e in chan.get('entries', []) if e.get('priority') == 1):,.2f}

**TOTAL PRIORITY 1:** ${sum(e.get('qty', 0) * e.get('unit_cost', 0) for cat in ops.get('items', {}).values() for e in cat.get('entries', []) if e.get('priority') == 1) + sum(g.get('premium', 0) + g.get('fee', 0) for g in comp.get('gates', []) if g.get('priority') == 1) + sum(e.get('qty', 0) * e.get('unit_cost', 0) for chan in rev.get('channels', {}).values() for e in chan.get('entries', []) if e.get('priority') == 1):,.2f}

---

▛▞ Use this number for your $7K–$10K fundraising ask :: ∎
"""
    return report

# ▛▞ GENERATE COMPLIANCE STATUS
def generate_compliance_status(gate_check: Dict, comp: Dict) -> str:
    """Create compliance gate status report"""
    gates = comp.get('gates', [])
    
    report = f"""# 🚦 COMPLIANCE GATE STATUS
**Generated:** 2025-10-15

---

## 🎯 START PERMISSION

**Can Start Operations?** {"✅ YES" if gate_check['can_start'] else "❌ NO"}

**Rule:** All priority 1 gates must be status == verified

**Status:** {gate_check['verified_gates']} / {gate_check['total_gates']} gates verified

---

## 🔒 BLOCKING GATES

"""
    if gate_check['blocking']:
        for key in gate_check['blocking']:
            gate = next((g for g in gates if g['key'] == key), None)
            if gate:
                report += f"- **{key}** (status: {gate['status']}) — {gate['note']}\n"
    else:
        report += "✅ No blocking gates. Clear to operate.\n"
    
    report += "\n---\n\n## 📋 ALL GATES\n\n"
    
    for gate in gates:
        status_emoji = "✅" if gate['status'] == 'verified' else "🟡" if gate['status'] in ['quoted', 'ordered'] else "⚪"
        priority = "🔴" if gate['priority'] == 1 else "🟠" if gate['priority'] == 2 else "🟢"
        cost = gate.get('premium', 0) + gate.get('fee', 0)
        
        report += f"\n### {status_emoji} {gate['key']} {priority}\n"
        report += f"- **Cost:** ${cost:,.2f}\n"
        report += f"- **Status:** {gate['status']}\n"
        report += f"- **Note:** {gate['note']}\n"
    
    report += "\n---\n\n▛▞ Update status to 'verified' + upload docs to clear gates :: ∎\n"
    
    return report

# ▛▞ MAIN EXECUTION
if __name__ == "__main__":
    print("🔍 Loading funding YAMLs...")
    
    # Load files
    ops = load_yaml('operations.yaml')
    comp = load_yaml('compliance.yaml')
    rev = load_yaml('revenue_engine.yaml')
    
    # Compute totals
    print("📊 Computing totals...")
    ops_total = compute_operations_total(ops)
    comp_total = compute_compliance_total(comp)
    rev_total = compute_revenue_total(rev)
    grand_total = ops_total + comp_total + rev_total
    
    # Check hard gates
    print("🚦 Checking compliance gates...")
    gate_check = check_hard_gates(comp)
    
    # Display summary
    print("\n" + "="*60)
    print("💰 SUNSET GLOW FUNDING SUMMARY")
    print("="*60)
    print(f"Operations:        ${ops_total:>10,.2f}")
    print(f"Compliance:        ${comp_total:>10,.2f}")
    print(f"Revenue Engine:    ${rev_total:>10,.2f}")
    print("-" * 60)
    print(f"GRAND TOTAL:       ${grand_total:>10,.2f}")
    print("="*60)
    print(f"\n🚦 Start Permission: {'✅ GRANTED' if gate_check['can_start'] else '❌ BLOCKED'}")
    print(f"   Gates Verified: {gate_check['verified_gates']}/{gate_check['total_gates']}")
    if gate_check['blocking']:
        print(f"   Blocking: {', '.join(gate_check['blocking'])}")
    
    # Generate reports
    print("\n📝 Generating reports...")
    
    breakdown = generate_breakdown(ops_total, comp_total, rev_total)
    Path('funding_breakdown.md').write_text(breakdown)
    print("   ✅ funding_breakdown.md")
    
    compliance_status = generate_compliance_status(gate_check, comp)
    Path('compliance_status.md').write_text(compliance_status)
    print("   ✅ compliance_status.md")
    
    # Export CSV
    print("\n📤 Exporting CSVs...")
    
    # Operations CSV
    with open('ops_packing_list.csv', 'w') as f:
        f.write("Category,Item,Qty,Unit Cost,Total,Vendor,Priority,Status,Note\n")
        for category, data in ops.get('items', {}).items():
            for entry in data.get('entries', []):
                qty = entry.get('qty', 0)
                unit_cost = entry.get('unit_cost', 0)
                total = qty * unit_cost
                f.write(f"{category},{entry['key']},{qty},{unit_cost},{total},{entry['vendor']},{entry['priority']},{entry['status']},\"{entry['note']}\"\n")
    print("   ✅ ops_packing_list.csv")
    
    print("\n✅ All reports generated. Review funding_breakdown.md for investor presentation.\n")
    print("▛▞ Next: Update status fields to 'verified' as you secure quotes/receipts :: ∎\n")
