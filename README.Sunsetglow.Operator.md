### Sunsetglow Prompt Operator (Pheno.Binding.Compiler)

This operator generates all GTM deliverables needed to reach your first paying customer using the provided Pheno/LEX framework.

### Files
- `prompts/sunsetglow_operator.prompt.md`: The operator definition. Paste this into your LLM and fill the input block.

### How to use
1. Open `prompts/sunsetglow_operator.prompt.md`.
2. In the `bind.input` block, fill your details for `company`, `mission`, `industry`, `target_market`, `constraints`, and any existing assets.
3. Run the prompt. The model will execute the bound actions in order and emit a single CAPSULE containing:
   - ICP, value prop, competitor map, offer/pricing, brand kit spec
   - Landing page copy/structure, analytics+CRM+email sequence
   - PRD + must-have backlog, MVP plan, payments + onboarding
   - QA/security/accessibility checklists, legal outlines
   - Closed beta plan, testimonial/case study script
   - Lead list/outreach framework, launch assets
   - Support setup, KPIs, weekly review, v0.1 plan

### Example invocation
```text
⊢ bind.input{
  company: "Sunsetglow",
  mission: "Help indie SaaS founders launch faster with a guided GTM copilot",
  industry: "SaaS",
  target_market: "Indie SaaS founders in productivity tooling",
  constraints: { team: "solo + contractor", budget: "$3k", timeline_weeks: 4 },
  existing_assets: { domain: "sunsetglow.app", brand: "none", code: "prototype", socials: ["twitter.com/sunsetglow"] },
  compliance: { legal: ["ToS", "Privacy"], privacy: ["cookie banner"] },
  brand_voice: { tone: "clear, confident, warm" },
  risks: ["limited design time", "unknown conversion"]
}
⇨ direct.flow{ φ := [compile.icp→compile.value_prop→compile.competitor_map→compile.offer_pricing→compile.brand_kit→compile.landing_copy→compile.analytics_crm_email→compile.prd_backlog→compile.mvp_impl_plan→compile.payments_onboarding→compile.qa_security_accessibility→compile.legal_docs→compile.beta_plan→compile.testimonial_case_study→compile.lead_list_outreach→compile.launch_assets→compile.support_kpis_roadmap] }
⟿ ν{Resilience}
▷ project.output{CAPSULE}
```

### Acceptance gates (done criteria)
- **Problem validation**: 10+ target interviews, 3 verbatims captured.
- **Assets live**: Landing page, analytics, CRM, welcome+nurture emails.
- **MVP**: First value < 15 minutes, payments live, onboarding clear.
- **Proof**: ≥1 testimonial or quantified result.
- **Sales**: ≥50 ICP leads, ≥10 meetings, ≥1 paying customer onboarded.

### Tips
- Keep answers concise and action-oriented. The model will propose defaults when inputs are UNKNOWN and label them as assumptions.
- You can run the operator multiple times: first to draft, then with feedback to refine each deliverable.