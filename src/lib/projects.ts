// Content source of truth, ported verbatim from the portfolio design export.

export type ProjectId =
  | 'athenaeum' | 'jpl' | 'msft' | 'glml' | 'toonsutra'
  | 'uw' | 'bite' | 'suits' | 'lesports' | 'cavr';

export interface ProjectBlocks {
  overview: string;
  context: string;
  problem: string;
  solution: string;
  outcome: string;
}

export interface Project {
  company: string;
  position: string;
  team: string;
  title: string;
  date: string;
  tag: string;
  media: string;          // gradient key (see mediaGrad)
  mediaLabel: string;
  desc: string;
  tools: string;
  impact: string;
  timeline: string;
  role: string;
  metaTeam?: string;
  metaTeamLabel?: string;
  metaTools?: string;
  lede: string;
  demoNote: string;
  caption: string;
  blocks: ProjectBlocks;
  reflection?: string;
  // media variants
  photo?: string;
  logo?: string;
  bgLogo?: string;
  logoMaxW?: string;
  logoMaxH?: string;
  mediaAspect?: string;
  composite?: boolean;
}

export const PROJECTS: Record<ProjectId, Project> = {
  athenaeum: {
    company: '', position: '', team: 'Personal project', title: 'Athenæum', date: '2025 · ongoing', tag: '', media: 'graph', mediaLabel: 'STILL — LIVE LINK',
    desc: 'A 3D knowledge graph arranging papers and notes in space by similarity. Drag to rotate; nodes auto-describe and track read state.',
    tools: 'Three.js · UMAP · Python · FastAPI', impact: '515-node semantic map of a field',
    timeline: '2025 — ongoing', role: 'Designer & Engineer',
    lede: 'A three-dimensional knowledge graph that turns my entire reading history into a point cloud you can fly through — related ideas physically cluster, so structure replaces folders.',
    demoNote: 'WEBGL ↗', caption: 'Shown as a still — open the live build to rotate and query the graph.',
    blocks: {
      overview: 'Athenæum treats every paper, note, and bookmark as a point in space, embedded with a language model and projected into three dimensions so related ideas sit together.',
      context: 'After several research labs my flat reading list broke down — hundreds of papers with no sense of how they related. I wanted the shape of a field to be something I could see and rotate.',
      problem: 'Two hard parts: keeping the projection stable as the corpus grows so the map doesn’t reshuffle on every add, and making 500+ nodes legible without turning into hairball soup.',
      solution: 'A Python pipeline embeds each document and reduces it with UMAP into a stable 3-space; a Three.js front-end renders depth-scaled, color-coded nodes, fetches an auto-description on hover, and persists read state.',
      outcome: 'The graph now holds my full corpus across satellite autonomy, medical imaging, and single-cell biology. Finding the bridge between two subfields went from search-and-scroll to looking at where clusters touch.',
    },
  },
  jpl: {
    company: 'NASA JPL', position: 'Machine Learning Intern', team: 'Artificial Intelligence Group', title: 'On-Orbit Reasoning Pipeline', date: 'Summer 2026 — Present', tag: 'Spacecraft Autonomy', media: 'sat', mediaLabel: 'NASA JPL', photo: '/assets/jpl-daring.jpg',
    desc: 'End-to-End onboard satellite autonomy: think on-satellite natural disaster detection, triage, action, and downstream analysis.',
    tools: 'PyTorch · PEFT/LoRA · LangGraph · MLLMs', impact: 'Targeting lower wildfire-response latency on orbit',
    timeline: 'Ongoing', role: 'Machine Learning Intern', metaTeam: 'Steve Chien, Jake H. Lee, Josh Haug', metaTeamLabel: 'Team', metaTools: '—',
    lede: 'A two-agent, on-orbit reasoning pipeline that lets peer satellites re-task each other in natural language — collapsing the vocabulary-derivation step to shorten the loop from observation to wildfire response.',
    demoNote: 'JPL ↗', caption: 'Replace with a flight-software demo or simulation capture.',
    blocks: {
      overview: 'Two cooperating agents reason on-orbit over remote-sensing imagery: a PEFT/LoRA-tuned multimodal LLM perceives, and a LangGraph orchestration layer turns natural-language re-tasking into action between peer satellites.',
      context: 'On orbit, downlink windows are scarce and the vocabulary-derivation handshake between spacecraft is slow — time a fast-moving wildfire doesn’t give you.',
      problem: 'Run a capable remote-sensing MLLM inside a tight compute envelope, and let one satellite re-task another in plain language without a hand-built shared vocabulary.',
      solution: 'A LoRA-tuned remote-sensing MLLM paired with a LangGraph two-agent orchestrator, so natural-language instructions flow directly into peer re-tasking.',
      outcome: 'A natural-language re-tasking loop that skips vocabulary derivation between peer satellites, targeting reduced wildfire-response latency.',
    },
  },
  msft: {
    company: 'Microsoft', position: 'Machine Learning Intern', team: '', title: '3D CT → Radiology-Report VLM', date: 'Summer 2025', tag: 'Medical Imaging', media: 'tissue2', mediaLabel: 'MICROSOFT', logo: '/assets/msft-research.png', bgLogo: '/assets/msft-squares.png',
    desc: 'VLM research & development for surgical & general medicinal applications.',
    tools: 'PyTorch · CLIP · VLMs', impact: 'SOTA on CT-RATE · zero-shot mAP 60% → 93%',
    timeline: 'Ongoing', role: 'Machine Learning Intern', metaTeam: 'Jin Ying', metaTeamLabel: 'Mentor', metaTools: '—',
    lede: 'A vision-language model that reads full 3D CT volumes and writes the radiology report — native volumetric input, reaching SOTA on held-out CT-RATE scans.',
    demoNote: 'MSFT ↗', caption: 'Replace with an annotated CT walkthrough (de-identified).',
    blocks: {
      overview: 'A 3D CT-to-radiology-report VLM that reasons over full volumetric scans rather than slices, reaching SOTA BLEU-1 and BERTScore-F1 on held-out CT-RATE data.',
      context: 'Most medical VLMs flatten CT into 2D slices, throwing away the volumetric structure radiologists actually read.',
      problem: 'Make a vision-language model operate natively on full 3D volumes and produce report-quality language — then push general zero-shot recognition further.',
      solution: 'A volumetric VLM trained on CT-RATE, plus a modified OpenAI CLIP with custom semantic linear classifiers for zero-shot classification.',
      outcome: 'SOTA BLEU-1 and BERTScore-F1 on held-out CT-RATE, beating 2D medical VLMs; zero-shot mAP improved from 60% to 93% on general classification.',
    },
  },
  glml: {
    company: 'Columbia University', position: 'Undergraduate Research Assistant', team: 'GILM Lab', title: 'Breast-Cancer Detection in MRI', date: 'Spring 2026', tag: 'Medical Imaging', logo: '/assets/columbia-logo.png', logoMaxW: '86%', logoMaxH: '72%', mediaAspect: '9 / 2', media: 'tissue', mediaLabel: 'COLUMBIA · GILM LAB',
    desc: 'Using VLMs to predict and detect breast cancer at the tissue level.',
    tools: 'PyTorch · Vision Transformers · MRI', impact: 'pCR prediction AUC 0.94',
    timeline: 'One-semester research project (ongoing)', role: 'Undergraduate Research Assistant', metaTeam: 'Corey Toler-Franklin, Sri', metaTeamLabel: 'Team', metaTools: '—',
    lede: 'Vision Transformers that automate breast-cancer detection in MRI and predict pathologic complete response — validated against clinical benchmarks at AUC 0.94 in targeted subgroups.',
    demoNote: 'GILM ↗', caption: 'Replace with a slide-viewer walkthrough or attention overlay.',
    blocks: {
      overview: 'Vision Transformer architectures tuned to automate breast-cancer detection within MRI datasets, with deep-learning models validated against established clinical benchmarks.',
      context: 'Reading breast MRI for malignancy and treatment response is labor-intensive and hard to standardize across patient subgroups.',
      problem: 'Adapt ViT architectures to MRI volumes and predict pathologic complete response (pCR) reliably enough to hold up against clinical benchmarks.',
      solution: 'Optimized ViT backbones, trained and validated against established clinical benchmarks with attention on targeted patient subgroups.',
      outcome: 'SOTA pCR prediction reaching an AUC of 0.94 in targeted patient subgroups.',
    },
  },
  toonsutra: {
    company: 'Toonsutra', position: 'Machine Learning Intern', team: '', title: 'Comic-Translation RAG', date: 'Fall 2025', tag: 'NLP · Translation', logo: '/assets/toonsutra-logo.png', media: 'comic', mediaLabel: 'TOONSUTRA',
    desc: 'India’s #1 digital comics platform. 3,200+ officially licensed titles in 10 languages.',
    tools: 'Python · RAG · VLMs', impact: '+25% accuracy · −50% translation time',
    timeline: 'One semester', role: 'AI Infrastructure Intern', metaTeam: 'Vishal Anand, Shreyas Desai', metaTeamLabel: 'Team', metaTools: '—',
    lede: 'Image-based Retrieval-Augmented Generation for comic-book translation across four South-Asian dialects — more accurate panels, far less human cleanup.',
    demoNote: 'APP ↗', caption: 'Replace with a before/after translation panel.',
    blocks: {
      overview: 'An image-based RAG system for translating comic books across four South-Asian dialects, grounding the translation in the panel artwork itself.',
      context: 'Comic translation is visual: dialogue, layout, and art carry meaning that pure-text translation gets wrong, forcing heavy human correction.',
      problem: 'Raise translation accuracy across four dialects while cutting the human intervention needed to fix bad outputs.',
      solution: 'Image-based Retrieval-Augmented Generation that conditions translation on the comic’s visual context before generating dialogue.',
      outcome: 'Translation accuracy up 25% across four South-Asian dialects, with expected translation time cut 50% from reduced human intervention.',
    },
  },
  uw: {
    company: 'University of Washington', position: 'Bioinformatician', team: 'Department of Medicine', title: 'Single-Cell RNA Pipeline', date: '2023 — 2025', tag: 'Computational Biology', media: 'cell', mediaLabel: 'UW MEDICINE', logo: '/assets/uw-logo-trans.png',
    desc: 'I built an end-to-end pipeline for single-cell RNA sequencing & downstream analysis.',
    tools: 'Python · Seurat · SingleR', impact: 'Annotation 7+ days → <12 hrs · 90%↓ · $200K grant',
    timeline: 'Completed · published in BMC Genomics (2025)', role: 'Bioinformatician · pipeline author (second author)', metaTeam: 'Kristina Adams Waldorf, Amanda Li (co-first author), and more!', metaTeamLabel: 'Team', metaTools: 'Python (primary), R · Seurat (QC, clustering) · SingleR (annotation) · 10X Cell Ranger · Jupyter, Quarto, Git',
    lede: 'The end-to-end single-cell RNA-seq pipeline I built — and the published placenta atlas it powers — trading days of manual cell annotation for an automated reference pass I made reproducible from raw FASTQs.',
    demoNote: 'PUB ↗', caption: 'Pipeline architecture — three tissue inputs through QC, clustering and SingleR annotation into downstream analysis. Hover to watch it resolve.',
    blocks: {
      overview: 'I built an end-to-end single-cell RNA-seq pipeline — from 10X Genomics output through Seurat quality control and clustering into reference-based SingleR annotation — and it became the computational backbone of our published transcriptomic atlas of the pigtail-macaque placenta.',
      context: 'Our three-tissue placental atlas (chorionic villi, chorioamniotic membranes, decidua) stalled at the final step: assigning an identity to each of tens of thousands of cells. In most labs that annotation is still done by hand — a researcher reading marker genes and labeling clusters one by one — and it was the bottleneck holding up our entire analysis.',
      problem: 'I set out to automate the whole workflow end to end, from raw reads to annotated cells, and to make it reproducible enough that anyone on the team could regenerate every result from raw FASTQs — not just reach a one-off answer.',
      solution: 'I built it primarily in Python: 10X Cell Ranger output flows through Seurat-based quality control and clustering, then into reference-based cell-type annotation with SingleR. I swapped the slow manual labeling pass for an automated reference pass, versioned the whole thing in Git, and made it reproducible from raw reads.',
      outcome: 'I cut annotation time from 7+ days to under 12 hours — a 90%+ reduction — and my pipeline became the backbone of a placenta atlas accepted at BMC Genomics (2025), where I am second author. I carried the same approach into a companion fetal-brain study, and the figures and statistics it produced contributed to a successfully funded $200K grant.',
    },
    reflection: 'The lesson that stuck wasn’t about the modeling — it was that in research, a pipeline nobody else can run is worthless. The repo’s entire purpose is letting someone regenerate every result from raw FASTQs, and building toward that standard rather than toward a one-off answer reframed what the deliverable actually is: not the figure, the reproducibility.',
  },
  bite: {
    company: 'Bite Campus Eats', position: 'Full-Stack Intern', team: '', title: 'Bite — Campus Eats', date: 'Winter 2025', tag: 'Consumer · Delivery', logo: '/assets/bite-logo.png', media: 'food', mediaLabel: 'iOS · ANDROID',
    desc: 'Fewer Fees, Better Bites! Columbia startup delivering top local restaurant food into Columbia campus with no service fees.',
    tools: 'React · Supabase · PostgreSQL', impact: 'Auth + realtime backend for 1,000+ users',
    timeline: 'Ongoing', role: 'Full-stack engineer · founding team', metaTeam: 'Jackson Yang, Tommy Lee, and more!', metaTeamLabel: 'Team', metaTools: '—',
    lede: 'Full-stack work on a campus food-delivery app — secure auth for 1,000+ users, a real-time vendor/driver backend, and live savings against competitor pricing.',
    demoNote: 'APP ↗', caption: 'Replace with an app store preview or ordering flow.',
    blocks: {
      overview: 'Full-stack engineering on Bite, a campus food-delivery app: authentication, a vendor and driver backend, and a real-time savings feature for users.',
      context: 'A campus delivery startup needed secure accounts, reliable vendor/driver operations, and a reason for students to trust its pricing.',
      problem: 'Stand up secure auth at scale, real-time vendor/driver infrastructure, and a savings feature that holds up against competitor prices.',
      solution: 'MFA plus Apple/G-Suite auth providers, a vendor and driver backend with real-time messaging, notifications and live vehicle tracking, and a React/Supabase savings aggregator.',
      outcome: 'A secure authentication system for 1,000+ users and a real-time backend powering vendor, driver and savings features.',
    },
  },
  suits: {
    company: '', position: '', team: 'Columbia Space Initiative', title: 'NASA SUITS', date: 'Fall 2025 — Present', tag: 'AR · Computer Vision', media: 'ar', mediaLabel: 'AR · UNITY', composite: true,
    desc: 'Augmented-reality interfaces assisting NASA Artemis astronauts during extravehicular tasks, plus a DINOv3 model with multi-modal context pooling and logistic-regression heads that spots external damage on lunar terrain vehicles from on-headset video.',
    tools: 'Unity · C# · DINOv3 · Computer Vision', impact: 'On-headset damage detection from sparse data',
    timeline: 'One year — proposal, build & presentation', role: 'Sub-team lead', metaTeam: 'Mission leads Grace X & Hiba Altaf, and more!', metaTeamLabel: 'Team', metaTools: '—',
    lede: 'Augmented-reality tooling for NASA Artemis astronauts on EVAs — and an on-headset vision model that flags external damage on lunar terrain vehicles from live video.',
    demoNote: 'AR ↗', caption: 'Replace with a headset capture or AR overlay clip.',
    blocks: {
      overview: 'AR interfaces that guide NASA Artemis astronauts through extravehicular tasks, paired with an on-headset vision model that inspects lunar terrain vehicles for external damage.',
      context: 'EVAs are high-stakes and hands-busy; astronauts need guidance and inspection in-view, not on a tablet, and training data for lunar hardware is scarce.',
      problem: 'Deliver legible AR guidance during EVAs and detect vehicle damage from on-headset video using only sparse datasets.',
      solution: 'A Unity/C# AR interface plus a DINOv3 model with multi-modal context pooling and logistic-regression heads, trained to identify external damage from headset video streams.',
      outcome: 'AR extravehicular guidance and an on-headset damage-detection model that works from sparse lunar-vehicle data.',
    },
  },
  lesports: {
    company: '', position: '', team: 'Personal project', title: 'LeSports', date: 'Fall 2025', tag: 'VLM · RAG', media: 'sports', mediaLabel: 'VLM · RAG',
    desc: 'A pipeline that uses Video-Language Models and a RAG-based query system to automatically transcribe, vector-align, and tag sports clips with professional commentary — 92.6% top-1 retrieval with mean-pooling temporal aggregation, beating GRU on short-form clips.',
    tools: 'Python · Video-LMs · RAG · Computer Vision', impact: '92.6% top-1 clip retrieval',
    timeline: 'One semester', role: 'Class Capstone (project)', metaTeam: 'Nikash Das', metaTeamLabel: 'Partner', metaTools: '—',
    lede: 'Video-Language Models plus RAG that transcribe, align, and tag sports clips with professional commentary — and retrieve the right moment at 92.6% top-1.',
    demoNote: 'CV ↗', caption: 'Replace with a tagged-clip retrieval demo.',
    blocks: {
      overview: 'A pipeline that automatically transcribes, vector-aligns, and tags short sports clips with professional commentary using Video-Language Models and a RAG-based database query system.',
      context: 'Short-form sports clips are hard to search: the meaning lives in motion and commentary, not metadata, and recurrent encoders struggle on brief sequences.',
      problem: 'Retrieve the right clip from natural-language queries while aggregating temporal video features better than recurrent baselines.',
      solution: 'Video-Language Model embeddings with a mean-pooling temporal aggregation strategy and a RAG query layer over a clip database.',
      outcome: '92.6% top-1 retrieval accuracy, outperforming GRU recurrent architectures on short-form sports clips.',
    },
  },
  cavr: {
    company: '', position: '', team: 'Robot-manipulation research', title: 'CAVR', date: 'Spring 2026', tag: 'Robot Manipulation', media: 'robot', mediaLabel: 'ROBOTICS',
    desc: 'A frozen-stack vision-action pipeline (DINOv2 + Grounding-DINO → SAM 2) producing language-conditioned object masks over dense feature maps for behavioral cloning — 85% success on robosuite Lift from 50 scripted demos, matching R3M and VC-1.',
    tools: 'Python · DINOv2 · Grounding-DINO · SAM 2', impact: '85% robosuite Lift, matching R3M / VC-1',
    timeline: 'One semester', role: 'Class Capstone (project)', metaTeam: 'Luke Yuan', metaTeamLabel: 'Partner', metaTools: '—',
    lede: 'A frozen-stack vision-action pipeline that turns language into object masks over dense features for behavioral cloning — matching strong baselines on robosuite Lift from just 50 demos.',
    demoNote: 'SIM ↗', caption: 'Replace with a robosuite rollout or mask overlay.',
    blocks: {
      overview: 'CAVR is a frozen-stack vision-action pipeline — DINOv2 plus Grounding-DINO into SAM 2 — producing language-conditioned object masks over dense feature maps for behavioral cloning.',
      context: 'Behavioral cloning needs grounded perception, but training perception end-to-end from few demos is brittle and data-hungry.',
      problem: 'Get language-conditioned, mask-level grounding for manipulation without fine-tuning the perception stack, and learn from only a handful of demos.',
      solution: 'A frozen DINOv2 + Grounding-DINO → SAM 2 stack that emits language-conditioned masks over dense features, feeding a behavioral-cloning policy.',
      outcome: '85% success on robosuite Lift from 50 scripted demos, matching R3M and VC-1; an ablation showed concept masking is indistinguishable from no masking on clean single-object scenes, motivating multi-object follow-ups.',
    },
  },
};

export const LEFT_PROJECTS: ProjectId[] = ['jpl', 'uw', 'suits', 'bite', 'lesports'];
export const RIGHT_PROJECTS: ProjectId[] = ['msft', 'glml', 'cavr', 'toonsutra'];

// Per-card status: only 'view' cards open a detail when clicked; the rest just
// engage the graph. (Detail pages for the others are reached from the About timeline.)
export type StatusKey = 'build' | 'webwip' | 'view';
export const STATUS: Record<StatusKey, { label: string; color: string; clickable: boolean }> = {
  build: { label: 'Currently building', color: '#790000', clickable: false },
  webwip: { label: 'Web WIP', color: '#9C6A1E', clickable: false },
  view: { label: 'View project →', color: '#1B3A57', clickable: true },
};
export const STATUS_OF: Partial<Record<ProjectId, StatusKey>> = {
  athenaeum: 'build', msft: 'build', jpl: 'build',
  toonsutra: 'webwip', bite: 'webwip', lesports: 'webwip', suits: 'webwip', cavr: 'webwip', glml: 'webwip',
};
export const statusKeyOf = (id: ProjectId): StatusKey => STATUS_OF[id] ?? 'view';

export function mediaGrad(kind: string): string {
  const m: Record<string, string> = {
    graph: 'radial-gradient(circle at 32% 34%, rgba(27,58,87,0.55) 0 1.4px, transparent 1.6px) 0 0/14px 14px, linear-gradient(150deg,#E7DCC2,#D6C8A6)',
    sat: 'linear-gradient(150deg,#1f4a5e,#0f2533)', tissue: 'linear-gradient(150deg,#8a2440,#42101e)',
    tissue2: 'linear-gradient(150deg,#5a1d2a,#280b12)', cell: 'linear-gradient(150deg,#33506f,#1a2740)',
    comic: 'linear-gradient(150deg,#C1313A,#7a1418)', food: 'linear-gradient(150deg,#A8651A,#5e360e)',
    ar: 'linear-gradient(150deg,#1f5566,#0c2733)', sports: 'linear-gradient(150deg,#7a3a22,#3a160c)', robot: 'linear-gradient(150deg,#3a3f6a,#171a35)',
  };
  return m[kind] || m.graph;
}

// Detail-page table of contents.
export const SECTION_LIST: Array<[keyof ProjectBlocks, string]> = [
  ['overview', 'Overview'],
  ['context', 'Context'],
  ['problem', 'The Problem'],
  ['solution', 'Solution'],
  ['outcome', 'Outcome'],
];
export const BLOCK_HEADING: Record<keyof ProjectBlocks, string> = {
  overview: 'What it is',
  context: 'Where it came from',
  problem: 'The hard part',
  solution: 'How it works',
  outcome: 'Where it landed',
};

export interface ExperienceRow {
  yr: string;
  org: string;
  role: string;
  pid: ProjectId | null;
}
export const EXPERIENCE: ExperienceRow[] = [
  { yr: 'Current', org: 'NASA JPL', role: 'Machine Learning Intern · Artificial Intelligence Group', pid: 'jpl' },
  { yr: 'Current', org: 'AstraSomnia', role: 'AI Infrastructure Intern · Startup', pid: null },
  { yr: '2026', org: 'Columbia University', role: 'Undergraduate Research Assistant · GILM Lab', pid: 'glml' },
  { yr: '2025', org: 'Bite Campus Eats', role: 'Founding Software Engineer · Startup', pid: 'bite' },
  { yr: '2025', org: 'Toonsutra', role: 'Software Engineering Intern · Google-backed Startup', pid: 'toonsutra' },
  { yr: '2025', org: 'Microsoft Research', role: 'Machine Learning Intern · Medical VLM team', pid: 'msft' },
  { yr: '2023', org: 'University of Washington', role: 'Bioinformatician · Department of Medicine', pid: 'uw' },
  { yr: '2022', org: 'Caltech', role: 'Research Assistant · Earth and Environmental Sciences', pid: null },
];

export const TOOLS = ['Python', 'PyTorch', 'React', 'TypeScript', 'C++', 'CLIP', 'VLMs', 'RAG', 'CUDA', 'Supabase', 'AWS', 'Docker'];

export const STATUS_PHRASES = [
  'is currently eating a breakfast burrito',
  'is currently reading a paper',
  'is currently practicing Wushu',
  'is currently on a run',
  'is currently taking a nap',
  'is currently practicing his Chinese',
  'is currently attempting a V6 Boulder',
  'is currently drinking coffee',
  'is currently playing volleyball',
  'is currently yapping to strangers',
  'is currently calling his siblings',
  'is currently doomscrolling Pinterest',
];

// Bio text that scatters into the corners over the graph as you scroll.
export const BIO_CORNERS = [
  { pos: 'top:13vh; left:5vw; text-align:left;', w: '22ch', color: 'var(--ink)', t: 'BA candidate in Computer Science & East Asian Studies at Columbia University' },
  { pos: 'bottom:16vh; right:5vw; text-align:right;', w: '18ch', color: 'var(--navy)', t: 'Passionate about building software and advancing AI-research!' },
];
