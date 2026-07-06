import type { Article } from "@/types";
import { authors } from "./authors";
import { categories } from "./categories";

const byId = (id: string) => authors.find((a) => a.id === id)!;
const cat = (slug: string) => categories.find((c) => c.slug === slug)!;

export const articles: Article[] = [
  {
    id: "post-1",
    title: "The Audit That Auditors Can't Pass",
    slug: "the-audit-that-auditors-cant-pass",
    excerpt:
      "Inspection results are worsening even as fees climb. Inside the widening gap between what regulators expect of an audit and what any firm can actually deliver.",
    content: `
<p>Every year the inspectors arrive, and every year the story is the same: sampling failures, thin documentation, scepticism applied like a stamp rather than a discipline. The profession's response has been equally ritual — remediation plans, methodology refreshes, another layer of review. And yet the deficiency rates barely move.</p>
<p>The uncomfortable hypothesis, whispered at conferences and now surfacing in academic work, is that the modern audit file has become an artefact designed for inspection rather than assurance. Partners describe spending more hours documenting judgements than making them. One head of audit at a mid-tier firm put it bluntly: "We are auditing the audit, and someone is auditing that."</p>
<blockquote><p>"We are auditing the audit, and someone is auditing that."</p></blockquote>
<h2>The economics of scepticism</h2>
<p>Scepticism is expensive. It requires senior time, and senior time is the scarcest commodity in a leveraged business model built on pyramids of juniors. When fee pressure meets inspection pressure, the squeeze lands on the middle of the file — the substantive work that doesn't photograph well in a quality review but actually catches misstatements.</p>
<p>Regulators counter that the deficiencies they flag are not paperwork trivia but genuine failures of evidence. Both things can be true. A system that measures quality by documentation will get documentation; whether it gets quality is a different question, and one the market has largely stopped asking.</p>
<h2>What would fixing it look like?</h2>
<p>Proposals abound: audit-only firms, joint audits, regulator-appointed auditors, radical liability reform. Each has been piloted somewhere and embraced nowhere. The likelier path is duller — incremental methodology change, more technology-assisted evidence gathering, and a slow renegotiation of what "reasonable assurance" reasonably means.</p>
<p>What is no longer tenable is the pretence that the expectation gap is a communications problem. It is a production problem. The audit the public imagines cannot be manufactured at the price the market pays, by the workforce the profession can currently attract. Until one of those variables moves, the inspection reports will keep saying what they have always said.</p>`,
    date: "2026-07-02T08:00:00",
    readTime: 9,
    featured: true,
    editorsPick: true,
    featuredImage: {
      node: {
        sourceUrl: "/images/article-01.jpg",
        altText: "Abstract dark green editorial illustration with intersecting lines",
        caption: "The modern audit file: designed for inspection, or for assurance?",
      },
    },
    author: { node: byId("author-1") },
    categories: { nodes: [cat("audit")] },
    tags: { nodes: [{ name: "Audit reform", slug: "audit-reform" }, { name: "Inspection", slug: "inspection" }, { name: "Quality", slug: "quality" }] },
  },
  {
    id: "post-2",
    title: "Pillar Two, Year Three: The Minimum Tax Meets Reality",
    slug: "pillar-two-year-three",
    excerpt:
      "The global minimum tax was meant to end the race to the bottom. Instead it has spawned a race to the footnotes — and a compliance industry nobody budgeted for.",
    content: `
<p>When 140 jurisdictions agreed a 15% global minimum tax, the rhetoric was of simplicity: a floor under corporate tax competition, a truce in the transfer-pricing wars. Three years into implementation, tax directors describe something else entirely — a parallel accounting system with its own data demands, its own elections, and its own capacity to produce surprises.</p>
<p>The safe harbours, designed as temporary relief, have become the main event. Multinationals have discovered that qualifying for them is itself a project measured in thousands of hours. "We built a Pillar Two engine to prove we don't owe Pillar Two tax," one FTSE 100 head of tax told this magazine. "The return on that investment is a rounding error."</p>
<h2>The data problem underneath the tax problem</h2>
<p>GloBE calculations demand data points that consolidation systems were never designed to hold — deferred tax at entity level, covered taxes by jurisdiction, payroll and tangible asset carve-outs. The result has been a quiet boom for the enterprise software vendors and a hiring scramble for the small pool of people who understand both the model rules and the systems.</p>
<blockquote><p>"We built a Pillar Two engine to prove we don't owe Pillar Two tax. The return on that investment is a rounding error."</p></blockquote>
<p>For advisers, the opportunity is real but awkward. Clients resent the spend, and the work is closer to data plumbing than planning. The firms winning mandates are those that arrived with accelerators and templates rather than hourly rates and blank workbooks.</p>
<h2>Where it goes from here</h2>
<p>The politics remain unsettled. Carve-outs are being renegotiated, one large jurisdiction is threatening retaliatory measures, and the permanent safe harbour discussions have the pace of treaty law and the stakes of a trade war. The minimum tax is here to stay; the question is how much of the world's compliance capacity it is entitled to consume.</p>`,
    date: "2026-06-28T09:30:00",
    readTime: 11,
    featured: true,
    featuredImage: {
      node: {
        sourceUrl: "/images/article-02.jpg",
        altText: "Abstract green and brass gradient with geometric overlay",
        caption: "GloBE rules: a floor under tax competition, a ceiling on simplicity.",
      },
    },
    author: { node: byId("author-3") },
    categories: { nodes: [cat("tax")] },
    tags: { nodes: [{ name: "Pillar Two", slug: "pillar-two" }, { name: "OECD", slug: "oecd" }, { name: "International tax", slug: "international-tax" }] },
  },
  {
    id: "post-3",
    title: "The Ledger Learns to Think: Agentic AI Reaches the Back Office",
    slug: "the-ledger-learns-to-think",
    excerpt:
      "Autonomous closing agents now reconcile, accrue, and flag anomalies before the controller's first coffee. The technology works. The accountability question doesn't.",
    content: `
<p>The demos are undeniably seductive. An agent ingests the subledgers overnight, clears 94% of reconciling items, drafts the accrual journal entries with commentary, and leaves the finance team a morning briefing of exceptions ranked by risk. What used to be day five of the close now happens before dawn on day one.</p>
<p>Adoption has moved faster than anyone predicted eighteen months ago, driven less by CFO ambition than by attrition. Finance departments that cannot hire management accountants have stopped trying to, and are instead buying software that does the work of the people they cannot find.</p>
<h2>Who signs the journal?</h2>
<p>The unresolved issue is accountability. A journal entry proposed by an agent, approved by a reviewer who processes two hundred such approvals a day, is signed in name only. Auditors have begun asking pointed questions about what "review" means when the reviewer cannot realistically re-perform the work.</p>
<blockquote><p>A control performed by software and approved at volume is a control in name only — unless the design changes with it.</p></blockquote>
<p>The emerging answer borrows from how the profession already handles specialists and service organisations: controls over the agent rather than over each output. Model validation, input completeness checks, drift monitoring, and genuine sampling of agent output are becoming the new general IT controls. The firms and finance teams that formalise this first will set the template everyone else inherits.</p>
<h2>The junior problem, again</h2>
<p>And beneath it all hums the question the profession keeps deferring: if agents do the work juniors learned on, where do seniors come from? Every efficiency gain is also a rung removed from the ladder. The firms thinking hardest about this are redesigning training around exception investigation rather than preparation — teaching judgement directly instead of hoping it emerges from repetition.</p>`,
    date: "2026-06-30T07:15:00",
    readTime: 8,
    featured: true,
    editorsPick: true,
    featuredImage: {
      node: {
        sourceUrl: "/images/article-03.jpg",
        altText: "Dark abstract illustration suggesting circuitry and ledger lines",
        caption: "The close, reimagined: exceptions first, keystrokes never.",
      },
    },
    author: { node: byId("author-2") },
    categories: { nodes: [cat("technology")] },
    tags: { nodes: [{ name: "AI", slug: "ai" }, { name: "Automation", slug: "automation" }, { name: "Financial close", slug: "financial-close" }] },
  },
  {
    id: "post-4",
    title: "Private Equity Buys the Profession",
    slug: "private-equity-buys-the-profession",
    excerpt:
      "A decade ago the idea was heresy. Today a third of the mid-tier has external capital on the balance sheet. What happens to a profession when its owners stop being its practitioners?",
    content: `
<p>The partnership model survived world wars, globalisation, and the collapse of Arthur Andersen. It may not survive the term sheet. Across the US, UK and increasingly Europe, private equity has moved from dabbling in accountancy to consolidating it, rolling up firms at a pace that has left regulators scrambling to map who actually owns the profession.</p>
<p>The pitch to partners is straightforward: capital for technology, a currency for acquisitions, and — unspoken but understood — a way to monetise goodwill that the partnership model traps until retirement. For a fifty-eight-year-old managing partner, the maths is compelling. For a thirty-two-year-old senior manager, it is more complicated.</p>
<h2>The alternative practice structure</h2>
<p>The deals rely on splitting firms in two: a licensed audit practice owned by CPAs, and a services company — owning the people, the technology, and most of the economics — owned by the fund. Regulators have blessed the structure while admitting they cannot fully see through it. Independence questions multiply when the audit firm's back office is owned by investors with portfolios full of auditable companies.</p>
<blockquote><p>Goodwill that once vested over a career now exits in a single transaction — and someone younger is paying for it.</p></blockquote>
<h2>What the second buyers will want</h2>
<p>Private equity does not hold forever; it sells. The first wave of exits is now approaching, and the profession is about to learn what the second buyers want. If the answer is margin, the pressure lands on training budgets, on partner counts, and eventually on quality. If the answer is growth, the roll-up continues until the mid-tier is three brands deep. Either way, the profession's governance was designed for owners who sat in the building. Those days are ending.</p>`,
    date: "2026-06-25T10:00:00",
    readTime: 10,
    editorsPick: true,
    featuredImage: {
      node: {
        sourceUrl: "/images/article-04.jpg",
        altText: "Abstract composition in deep green and brass tones",
        caption: "The partnership model meets the fund model.",
      },
    },
    author: { node: byId("author-5") },
    categories: { nodes: [cat("practice")] },
    tags: { nodes: [{ name: "Private equity", slug: "private-equity" }, { name: "M&A", slug: "ma" }, { name: "Firm structure", slug: "firm-structure" }] },
  },
  {
    id: "post-5",
    title: "Rates Fell. Insolvencies Didn't.",
    slug: "rates-fell-insolvencies-didnt",
    excerpt:
      "The easing cycle was supposed to rescue the corporate walking wounded. Instead, restructuring desks are busier than at any point since 2009. Tomás Herrera on the lag nobody priced.",
    content: `
<p>The textbook said relief would come quickly: rates down, refinancing windows open, distress receding. The data says otherwise. Corporate insolvencies across major economies remain at cycle highs a full eighteen months into the easing cycle, and the composition has shifted from small-company attrition to mid-market failures with real balance sheets and real creditors.</p>
<p>The explanation is duration. The damage was done not by the level of rates but by the years companies spent at them — eroding cash buffers, deferring capex, quietly stretching creditors. Lower rates cannot refill a depleted balance sheet; they merely slow the leak. For thousands of firms, the arithmetic stopped working in 2024 and is only now arriving at the courthouse.</p>
<h2>The adviser's dilemma</h2>
<p>For accountants, distress is a stress test of the advisory relationship. The technical questions — going concern, covenant forecasts, director duties as the twilight zone approaches — are well mapped. The commercial ones are harder. The client who cannot pay the restructuring fee is the client who most needs the restructuring advice.</p>
<blockquote><p>Lower rates cannot refill a depleted balance sheet; they merely slow the leak.</p></blockquote>
<p>Practices that built dedicated turnaround teams in the lean years are now harvesting the demand. Those that didn't are referring work out — and discovering that a referred client in crisis often becomes another firm's client in recovery.</p>
<h2>What to watch</h2>
<p>Three indicators deserve attention for the next two quarters: trade credit insurance withdrawals, which precede formal insolvency by roughly six months; HMRC and equivalent tax-authority enforcement activity, which has resumed with real appetite; and the maturity wall of 2022-vintage private credit, which reprices this autumn. The cycle is not over. It has simply moved downmarket, to where most accountants' clients live.</p>`,
    date: "2026-06-22T08:45:00",
    readTime: 7,
    featuredImage: {
      node: {
        sourceUrl: "/images/article-05.jpg",
        altText: "Moody abstract gradient suggesting a downward curve",
        caption: "The lag between monetary relief and balance-sheet repair is measured in years.",
      },
    },
    author: { node: byId("author-4") },
    categories: { nodes: [cat("economy")] },
    tags: { nodes: [{ name: "Insolvency", slug: "insolvency" }, { name: "Interest rates", slug: "interest-rates" }, { name: "Restructuring", slug: "restructuring" }] },
  },
  {
    id: "post-6",
    title: "The Sustainability Report Grows Teeth",
    slug: "the-sustainability-report-grows-teeth",
    excerpt:
      "Assurance over climate disclosures is shifting from limited to reasonable — and from marketing exercise to litigation exposure. The profession asked for this work. Now it has to survive it.",
    content: `
<p>For years, sustainability assurance was the friendly corner of the audit market: limited scope, limited liability, limited scepticism. That era is closing. Mandatory reasonable assurance is phasing in across major jurisdictions, and with it comes everything the profession knows from financial audit — inspection regimes, enforcement actions, and plaintiffs' lawyers reading the fine print.</p>
<p>The technical challenge is genuine. Scope 3 emissions estimates rest on data chains that would embarrass a mid-sized payroll system: supplier surveys, industry averages, spend-based proxies. Applying reasonable assurance to numbers with error bars of forty percent requires either methodological courage or careful wording, and the standard-setters have provided limited cover for either.</p>
<h2>Who does the work?</h2>
<p>The talent question is sharper here than anywhere else in the profession. The work demands people fluent in both ISAE methodology and carbon accounting — a population measured in the low thousands globally, being fought over by firms, corporates, and the consultancies that got there first. Salaries for experienced sustainability assurance managers now clear those of their financial audit peers by a comfortable margin.</p>
<blockquote><p>Applying reasonable assurance to numbers with forty-percent error bars requires methodological courage or careful wording.</p></blockquote>
<h2>The opportunity, restated</h2>
<p>None of this is a reason to retreat. Assurance is the profession's franchise, and extending it to non-financial information is the largest expansion of that franchise in a century. But franchises are lost through overreach. The firms that scope conservatively, price for the risk, and decline the engagements they cannot staff will still be doing this work in a decade. The ones chasing market share with generalists may find their name on the first landmark enforcement case.</p>`,
    date: "2026-06-18T11:20:00",
    readTime: 9,
    featuredImage: {
      node: {
        sourceUrl: "/images/article-06.jpg",
        altText: "Abstract warm-toned editorial illustration",
        caption: "From limited assurance to litigated assurance.",
      },
    },
    author: { node: byId("author-1") },
    categories: { nodes: [cat("audit")] },
    tags: { nodes: [{ name: "ESG", slug: "esg" }, { name: "Sustainability", slug: "sustainability" }, { name: "Assurance", slug: "assurance" }] },
  },
  {
    id: "post-7",
    title: "The Timesheet Is Dead. Now Comes the Hard Part.",
    slug: "the-timesheet-is-dead",
    excerpt:
      "Firms are abandoning hourly billing faster than they're learning to price. Sofia Lindqvist on the messy middle of the fixed-fee revolution.",
    content: `
<p>The announcements arrive weekly: another firm scrapping timesheets, another practice moving to "value pricing", another managing partner declaring the billable hour a relic. The direction is right. The execution, across much of the profession, is a masterclass in changing the invoice without changing the firm.</p>
<p>Pricing is a skill, and most firms have spent a century not developing it. The timesheet was many things — a control, a crutch, a surveillance system — but above all it was a pricing methodology that required no judgement. Remove it, and someone must actually decide what a tax return, a board pack, or a restructuring memo is worth. That someone is usually a partner with no training in the question.</p>
<h2>Where fixed fees go wrong</h2>
<p>The failure pattern is consistent. Firms price the first year of a fixed-fee arrangement off the prior year's hours — anchoring to the thing they claim to have abandoned. Scope creep arrives by month four. By year two the engagement is underwater, and the firm either eats the margin or triggers the renegotiation clause it hopefully remembered to include.</p>
<blockquote><p>The timesheet was a pricing methodology that required no judgement. Remove it, and someone has to decide what the work is worth.</p></blockquote>
<p>The firms doing it well share three habits: they price scope, not effort; they build change-order discipline that would pass muster on a construction site; and they track engagement economics obsessively — with data that looks suspiciously like a timesheet, kept for management rather than billing.</p>
<h2>The cultural dividend</h2>
<p>Done properly, the payoff is real and it is cultural as much as commercial. Juniors freed from the six-minute unit stop optimising for recorded hours and start optimising for outcomes. Utilisation theatre fades. And conversations with clients shift from defending invoices to discussing value — which, it turns out, is where the cross-sell lives.</p>`,
    date: "2026-06-15T09:00:00",
    readTime: 8,
    editorsPick: true,
    featuredImage: {
      node: {
        sourceUrl: "/images/article-07.jpg",
        altText: "Abstract composition suggesting grid paper and torn edges",
        caption: "After the six-minute unit: pricing as a discipline.",
      },
    },
    author: { node: byId("author-5") },
    categories: { nodes: [cat("practice")] },
    tags: { nodes: [{ name: "Pricing", slug: "pricing" }, { name: "Billing", slug: "billing" }, { name: "Firm management", slug: "firm-management" }] },
  },
  {
    id: "post-8",
    title: "When the Tax Authority Gets an Upgrade",
    slug: "when-the-tax-authority-gets-an-upgrade",
    excerpt:
      "Revenue bodies are deploying AI-driven risk engines that read filings the way advisers read case law. The compliance game is becoming asymmetric — against the taxpayer.",
    content: `
<p>The modern tax authority no longer waits for the return. It ingests bank feeds, marketplace data, payroll filings and land registries; it graphs relationships across entities; and it scores every taxpayer against patterns learned from a decade of enquiry outcomes. The letter that arrives is no longer a random check. It is a hypothesis, and the authority already believes it.</p>
<p>For advisers, this changes the physics of compliance work. The traditional buffer — that most returns are never looked at — is dissolving. Real-time reporting regimes mean errors surface in weeks, not years, and correction windows are shrinking accordingly. The value of "we'll fix it if they ask" as a filing strategy has collapsed.</p>
<h2>The transparency ratchet</h2>
<p>Each new data stream justifies the next. E-invoicing mandates feed transaction-level analytics; those analytics find discrepancies; the discrepancies justify expanding the mandate. Practitioners in jurisdictions with mature regimes describe a new equilibrium: fewer disputes about facts, more disputes about interpretation, and a permanent low-grade audit that never opens or closes.</p>
<blockquote><p>The letter that arrives is no longer a random check. It is a hypothesis, and the authority already believes it.</p></blockquote>
<h2>Advising in the open</h2>
<p>The advisory response is maturing. Leading practices now run their clients' data through the same analytical lenses the authorities use, surfacing anomalies before the risk engine does. Pre-emptive disclosure, once a nuclear option, is becoming routine hygiene. The profession spent decades helping clients answer the tax authority's questions. Increasingly, the job is anticipating them — because the questions are being generated by software that has already read everything.</p>`,
    date: "2026-06-12T14:30:00",
    readTime: 7,
    featuredImage: {
      node: {
        sourceUrl: "/images/article-08.jpg",
        altText: "Dark green abstract with radiating lines",
        caption: "Real-time reporting: the enquiry that never opens and never closes.",
      },
    },
    author: { node: byId("author-3") },
    categories: { nodes: [cat("tax")] },
    tags: { nodes: [{ name: "Tax administration", slug: "tax-administration" }, { name: "E-invoicing", slug: "e-invoicing" }, { name: "Compliance", slug: "compliance" }] },
  },
  {
    id: "post-9",
    title: "The Spreadsheet Refuses to Die",
    slug: "the-spreadsheet-refuses-to-die",
    excerpt:
      "Forty years of 'Excel killers' have come and gone. Marcus Adeyemi on why the grid endures — and why the profession's favourite tool is also its most persistent risk.",
    content: `
<p>Every finance transformation deck contains the same slide: the tangle of spreadsheets to be eliminated, the clean system landscape to come. The decks age; the spreadsheets do not. Surveys consistently find that the overwhelming majority of finance teams still run material processes through workbooks, including teams that have spent eight figures on platforms promising otherwise.</p>
<p>The endurance is not irrational. The spreadsheet is the only tool in the enterprise stack where the person who understands the problem can also build the solution, immediately, without a ticket, a sprint, or a steering committee. It is end-user computing in its purest form — which is precisely what makes auditors reach for their risk matrices.</p>
<h2>The error literature</h2>
<p>The catalogue of spreadsheet catastrophes is long and bipartisan: trading losses amplified by copy-paste errors, austerity economics built on a broken range, vaccine records lost to a row limit. Studies suggest most large workbooks contain material errors. The profession knows this and proceeds anyway, because the alternative — waiting for IT — has costs the error literature never quantifies.</p>
<blockquote><p>The spreadsheet is the only tool where the person who understands the problem can build the solution without a steering committee.</p></blockquote>
<h2>Governance, not prohibition</h2>
<p>The mature position is emerging in end-user computing policies that treat critical spreadsheets like the applications they are: inventoried, version-controlled, access-managed, and tested. AI assistants that can read, explain and audit workbook logic are making this tractable at scale for the first time. The grid will outlive us all. The question is whether it does so inside the control environment or beneath it.</p>`,
    date: "2026-06-08T08:00:00",
    readTime: 6,
    featuredImage: {
      node: {
        sourceUrl: "/images/article-09.jpg",
        altText: "Abstract grid pattern in muted green tones",
        caption: "End-user computing: the shadow IT the profession built for itself.",
      },
    },
    author: { node: byId("author-2") },
    categories: { nodes: [cat("technology")] },
    tags: { nodes: [{ name: "Spreadsheets", slug: "spreadsheets" }, { name: "Risk", slug: "risk" }, { name: "Controls", slug: "controls" }] },
  },
  {
    id: "post-10",
    title: "The Standard-Setters' Capacity Crisis",
    slug: "the-standard-setters-capacity-crisis",
    excerpt:
      "IAASB, ISSB, PCAOB, FRC: the acronyms are producing rules faster than the profession can absorb them. David Okonkwo on regulation's throughput problem.",
    content: `
<p>Speak privately with a technical partner at any firm and the complaint is identical: the pipeline of new standards has outrun the profession's capacity to implement them. Quality management systems, sustainability disclosure, revised group audit standards, fraud responsibilities, going concern — each individually defensible, collectively indigestible.</p>
<p>The numbers tell the story. A mid-tier firm's technical team, typically a dozen people, now tracks active workstreams from at least five standard-setters across two dozen effective dates. Implementation guidance arrives months before deadlines. Training must be designed before the interpretations settle. Something, inevitably, is absorbed as box-ticking rather than behaviour.</p>
<h2>The consultation illusion</h2>
<p>Standard-setters point to their due process: exposure drafts, comment periods, roundtables. But consultation measures opinion, not capacity. No mechanism exists for the system to say "not yet" — to sequence change against the profession's genuine ability to implement it well. Comment letters pleading for deferral read as special pleading, and are discounted accordingly.</p>
<blockquote><p>Consultation measures opinion, not capacity. No mechanism exists for the system to say "not yet".</p></blockquote>
<h2>A modest proposal</h2>
<p>Other regulated industries manage this with implementation budgets: an explicit cap on the volume of change any regulated entity must absorb per cycle. The idea surfaces periodically in accountancy and dies of institutional politics — no standard-setter wants its priority deferred for another's. Until someone owns the aggregate burden, the profession will keep implementing everything adequately and nothing well. The inspection findings of 2029 are being written in the effective dates of today.</p>`,
    date: "2026-06-05T10:15:00",
    readTime: 8,
    featuredImage: {
      node: {
        sourceUrl: "/images/article-10.jpg",
        altText: "Layered abstract shapes suggesting stacked documents",
        caption: "Two dozen effective dates, one profession.",
      },
    },
    author: { node: byId("author-6") },
    categories: { nodes: [cat("regulation")] },
    tags: { nodes: [{ name: "Standards", slug: "standards" }, { name: "IAASB", slug: "iaasb" }, { name: "Implementation", slug: "implementation" }] },
  },
  {
    id: "post-11",
    title: "Where Have All the Trainees Gone?",
    slug: "where-have-all-the-trainees-gone",
    excerpt:
      "Accountancy enrolments are down by double digits across major markets. The pipeline problem is no longer a projection — it's a rota gap this busy season.",
    content: `
<p>The profession has warned about its pipeline for a decade. The warnings have now become vacancies. Professional body enrolments are down sharply across the US, UK and Australia; university accounting programmes are consolidating; and firms report offer-acceptance rates that would have been unthinkable when a training contract was a golden ticket.</p>
<p>The diagnosis is contested but the ingredients are known: starting salaries that lag consulting, banking and technology by widening margins; a qualification that demands years of exams alongside full-time work; and an image problem that decades of "trusted adviser" branding has not dented. The billable hour's reputation precedes it.</p>
<h2>The salary question firms won't answer</h2>
<p>Every managing partner laments the shortage; few will pay their way out of it. The leverage model depends on cheap juniors, and repricing the bottom of the pyramid reprices everything above it. Instead, firms are substituting: offshore delivery centres, apprenticeship routes, technology, and a quiet relaxation of the degree requirement that once gatekept the profession.</p>
<blockquote><p>Every managing partner laments the shortage; few will pay their way out of it.</p></blockquote>
<h2>A smaller, different profession</h2>
<p>The likeliest future is not collapse but reshaping. Fewer trainees doing traditional preparation work, because the work itself is being automated. More specialists entering laterally — data, sustainability, valuations — who never sit the foundational exams. And a professional identity that must stretch to include people who have never ticked, bashed, or vouched anything. The pipeline is not just shrinking. It is being rerouted.</p>`,
    date: "2026-06-01T09:45:00",
    readTime: 7,
    featuredImage: {
      node: {
        sourceUrl: "/images/article-11.jpg",
        altText: "Abstract composition with diverging lines",
        caption: "The pyramid narrows at the base.",
      },
    },
    author: { node: byId("author-5") },
    categories: { nodes: [cat("practice")] },
    tags: { nodes: [{ name: "Talent", slug: "talent" }, { name: "Recruitment", slug: "recruitment" }, { name: "Training", slug: "training" }] },
  },
  {
    id: "post-12",
    title: "Central Banks Discover the Balance Sheet, Again",
    slug: "central-banks-discover-the-balance-sheet",
    excerpt:
      "Quantitative tightening was supposed to be as boring as watching paint dry. The paint is now on fire in the repo market. What shrinking central bank balance sheets mean for corporate liquidity.",
    content: `
<p>For a decade, corporate treasurers operated in a world of abundant reserves — liquidity so plentiful that its price barely registered as a planning variable. That world is being unwound, deliberately and on schedule, by central banks shrinking balance sheets that swelled through two crises. The unwind was marketed as background noise. Recent money-market tremors suggest the foreground is closer than advertised.</p>
<p>The mechanics matter for anyone advising on corporate finance. As reserves drain, banks' willingness to warehouse liquidity at quarter-ends declines, repo rates spike episodically, and the marginal cost of short-term corporate funding becomes lumpier. Committed facilities that priced as formalities in 2021 are being repriced as the insurance they always were.</p>
<h2>What this means below the FTSE 350</h2>
<p>Large corporates will manage. The squeeze, as ever, travels downmarket. Mid-market businesses that leaned on overdrafts and uncommitted lines face a banking sector with less balance-sheet generosity and more granular risk pricing. Working-capital cycles that were survivable at abundant liquidity become existential at scarce liquidity — a transition their accountants will often see first, in the ageing of the creditors ledger.</p>
<blockquote><p>Committed facilities that priced as formalities in 2021 are being repriced as the insurance they always were.</p></blockquote>
<h2>The going-concern angle</h2>
<p>For auditors and advisers, the practical output is sharper going-concern work: facility headroom modelled against genuinely stressed scenarios, renewal risk treated as real, and management's "the bank has always rolled it" met with professional scepticism. Liquidity is a macro variable again. The profession's working papers should read like it.</p>`,
    date: "2026-05-28T08:30:00",
    readTime: 9,
    featuredImage: {
      node: {
        sourceUrl: "/images/article-12.jpg",
        altText: "Abstract gradient with sharp brass line through dark field",
        caption: "Quantitative tightening: the background noise moves foreground.",
      },
    },
    author: { node: byId("author-4") },
    categories: { nodes: [cat("economy")] },
    tags: { nodes: [{ name: "Liquidity", slug: "liquidity" }, { name: "Central banks", slug: "central-banks" }, { name: "Going concern", slug: "going-concern" }] },
  },
  {
    id: "post-13",
    title: "The Fraud Triangle Gets a Fourth Side",
    slug: "the-fraud-triangle-gets-a-fourth-side",
    excerpt:
      "Pressure, opportunity, rationalisation — and now, automation. Synthetic invoices, deepfaked approvals and AI-generated documentation are industrialising occupational fraud.",
    content: `
<p>The fraud examiner's classic model assumed a human at the centre: someone under pressure, spotting an opportunity, constructing a rationalisation. The model still holds. What has changed is the tooling. Generative systems can now produce invoice trails, supplier correspondence, even video approvals of a quality that defeats the visual inspection most controls quietly rely on.</p>
<p>Investigators describe a step-change in the sophistication of documentation supporting fraudulent transactions. Where a fabricated invoice once betrayed itself through formatting, sequential numbering or a suspiciously fresh PDF, today's synthetic paper trail arrives aged, consistent, and cross-referenced. The controls that checked whether documentation exists were never designed to check whether it is real.</p>
<h2>Verification moves upstream</h2>
<p>The response taking shape abandons document inspection in favour of source verification: bank-confirmed payee validation, supplier onboarding with liveness checks, and transaction-level matching against external data rather than internal paperwork. The unglamorous technologies — verified payment rails, e-invoicing networks with authenticated participants — turn out to be the real fraud controls.</p>
<blockquote><p>The controls that checked whether documentation exists were never designed to check whether it is real.</p></blockquote>
<h2>The auditor's exposure</h2>
<p>For auditors, the implications are uncomfortable. ISA 240's presumptions were calibrated for a world where fabricating convincing evidence was costly. When it costs nothing, the auditor's traditional reliance on documentary evidence needs explicit rethinking — and inspection regimes are already signalling that "the documentation appeared genuine" will not survive as a defence. Provenance, not appearance, is becoming the standard of evidence. The profession should get there before the case law does.</p>`,
    date: "2026-05-24T13:00:00",
    readTime: 8,
    featuredImage: {
      node: {
        sourceUrl: "/images/article-13.jpg",
        altText: "Fractured abstract pattern in green and cream",
        caption: "Synthetic paper trails: aged, consistent, and entirely fake.",
      },
    },
    author: { node: byId("author-1") },
    categories: { nodes: [cat("audit")] },
    tags: { nodes: [{ name: "Fraud", slug: "fraud" }, { name: "Forensics", slug: "forensics" }, { name: "Deepfakes", slug: "deepfakes" }] },
  },
  {
    id: "post-14",
    title: "A Wealth Tax Walks Into a Valuation Problem",
    slug: "a-wealth-tax-walks-into-a-valuation-problem",
    excerpt:
      "As governments hunt revenue, net-wealth taxes are back on the table across Europe. The politics are simple. Valuing a private business every year is not.",
    content: `
<p>Fiscal arithmetic is doing what ideology could not: putting wealth taxes back into mainstream budget debate. Several European finance ministries have live proposals; others are watching. The political case writes itself. The administrative case has to contend with a problem the profession knows intimately — most wealth is not listed, liquid, or easy to value.</p>
<p>A net-wealth tax requires annual valuations of private companies, partnerships, property portfolios and increasingly exotic assets, at population scale. Every methodology choice — multiples, DCF, book-value proxies — becomes a political decision with revenue consequences. Practitioners who lived through pandemic-era business support schemes will recognise the shape: a policy designed in weeks, administered through valuations that take months to do properly.</p>
<h2>Lessons from the countries that tried</h2>
<p>The European graveyard of abandoned wealth taxes is instructive. Most failed not on principle but on plumbing: valuation disputes clogging courts, avoidance through restructuring, revenues persistently below projection once administration costs cleared. The survivors work because they compromise — formulaic valuations, generous business-asset reliefs, low rates. Each compromise narrows the base until the tax is more symbol than revenue.</p>
<blockquote><p>Most wealth taxes failed not on principle but on plumbing.</p></blockquote>
<h2>The advisory season ahead</h2>
<p>Whatever the legislative outcome, the advisory demand is already arriving: clients restructuring holdings ahead of possible rules, valuers being asked for "wealth-tax-ready" appraisals of businesses that have never been valued, and family offices war-gaming residence decisions. For the profession, wealth taxation is less a policy question than a workflow forecast — and the forecast is busy.</p>`,
    date: "2026-05-20T09:10:00",
    readTime: 8,
    featuredImage: {
      node: {
        sourceUrl: "/images/article-14.jpg",
        altText: "Abstract layered composition in deep tones with brass accents",
        caption: "Annual valuations at population scale: the plumbing problem.",
      },
    },
    author: { node: byId("author-3") },
    categories: { nodes: [cat("tax")] },
    tags: { nodes: [{ name: "Wealth tax", slug: "wealth-tax" }, { name: "Valuation", slug: "valuation" }, { name: "Policy", slug: "policy" }] },
  },
  {
    id: "post-15",
    title: "Continuous Auditing Finally Means Something",
    slug: "continuous-auditing-finally-means-something",
    excerpt:
      "Promised since the 1990s, always five years away: audit that watches transactions as they happen is quietly going live at scale. The year-end may never be the same.",
    content: `
<p>The phrase "continuous auditing" has appeared in academic journals for thirty years, usually attached to a pilot that went nowhere. What is different now is infrastructure: clients whose transactions already flow through APIs, evidence available as data feeds rather than PDF requests, and analytical tooling that can hold an entire population rather than a sample.</p>
<p>At a handful of large engagements, the audit now runs as a standing process. Revenue is tested weekly against cash and contracts; journal entries are screened on posting; exceptions route to client teams while the transaction is still warm. By the time year-end arrives, the file is substantially complete and the January crunch is — engagement partners report with something like disbelief — survivable.</p>
<h2>What breaks</h2>
<p>Plenty. Materiality concepts calibrated to annual reporting sit awkwardly on weekly testing. Independence questions arise when the auditor's monitoring becomes, functionally, part of the client's control environment. And the leverage model strains again: continuous audit needs fewer people overall but more of them senior, more of them technical, and none of them seasonal.</p>
<blockquote><p>By the time year-end arrives, the file is substantially complete and January is — partners report with disbelief — survivable.</p></blockquote>
<h2>The standard-setting lag</h2>
<p>The standards assume a periodic audit of a period-end assertion. Regulators privately encourage the innovation while publicly enforcing frameworks that predate it — a tension every methodology partner is currently managing with careful memos. As with most audit innovation, practice is moving first and standards will codify what survives. For once, the profession's future is arriving ahead of schedule.</p>`,
    date: "2026-05-16T07:50:00",
    readTime: 7,
    featuredImage: {
      node: {
        sourceUrl: "/images/article-15.jpg",
        altText: "Flowing abstract lines suggesting continuous data streams",
        caption: "The audit as a standing process, not an annual event.",
      },
    },
    author: { node: byId("author-2") },
    categories: { nodes: [cat("technology")] },
    tags: { nodes: [{ name: "Continuous audit", slug: "continuous-audit" }, { name: "Data analytics", slug: "data-analytics" }, { name: "Innovation", slug: "innovation" }] },
  },
  {
    id: "post-16",
    title: "The Watchdog That Audits the Watchdogs",
    slug: "the-watchdog-that-audits-the-watchdogs",
    excerpt:
      "A new supervisory college for audit regulators is taking shape — peer review for the inspectors themselves. David Okonkwo asks whether anyone can regulate consistently across borders.",
    content: `
<p>Audit is global; its regulation is stubbornly national. A group audit spanning forty jurisdictions answers to forty inspection regimes with forty interpretations of the same international standards. Firms have complained about this for years. Now, unusually, the regulators agree — and are building machinery to do something about it.</p>
<p>The emerging supervisory college model borrows from banking: joint inspections of the largest networks, shared findings databases, and a peer-review mechanism through which regulators assess each other's regimes. The politics are delicate. No inspectorate enjoys being inspected, and sovereignty over enforcement remains untouchable. But the direction — convergence through embarrassment, if not through treaty — is set.</p>
<h2>What firms should expect</h2>
<p>Convergence cuts both ways. Networks that arbitraged softer regimes for group components will find the floor rising. Equally, the maddening inconsistencies — evidence sufficient in one jurisdiction and deficient in the next — should slowly narrow. Technical teams predict a transition decade in which firms comply with the strictest interpretation everywhere, because tracking forty regimes was somehow easier than tracking one converging one.</p>
<blockquote><p>Convergence through embarrassment, if not through treaty.</p></blockquote>
<h2>The deeper question</h2>
<p>Beneath the machinery lies an unresolved debate about what inspection is for: deterrence, improvement, or public reassurance. Regimes optimised for each look different, and the college will have to reconcile members who have chosen differently. If it succeeds, audit quality becomes comparable across borders for the first time. If it fails, the profession keeps its forty rulebooks — and its excuse.</p>`,
    date: "2026-05-12T10:40:00",
    readTime: 6,
    featuredImage: {
      node: {
        sourceUrl: "/images/article-16.jpg",
        altText: "Concentric abstract circles in dark green",
        caption: "Forty regimes, one profession, and a college for the inspectors.",
      },
    },
    author: { node: byId("author-6") },
    categories: { nodes: [cat("regulation")] },
    tags: { nodes: [{ name: "Oversight", slug: "oversight" }, { name: "International", slug: "international" }, { name: "Inspection", slug: "inspection" }] },
  },
];

export default articles;
