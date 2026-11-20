// Single source for all site content. Every fact here comes from the portfolio profile.
// House rules: no em dashes, no invented facts, ECare is a full-time role.

export const NAME = "Lokeshwar";
export const FULL_NAME = "Lokeshwar Reddy Nandanapalli";
export const TELUGU_NAME = "లోకేశ్వర రెడ్డి నందనపల్లి";
export const EMAIL = "lnandanapalli@gmail.com";

export const LINKS = [
  { label: "Email", href: `mailto:${EMAIL}`, handle: EMAIL },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/lnandanapalli/", handle: "in/lnandanapalli" },
  { label: "GitHub", href: "https://github.com/lnandanapalli", handle: "@lnandanapalli" },
  { label: "LeetCode", href: "https://leetcode.com/u/lokr", handle: "u/lokr" },
  { label: "Medium", href: "https://medium.com/@lnandanapalli", handle: "@lnandanapalli" },
];

export const SUMMARY =
  "AI Software Engineer with 3 years building production RAG and agent systems: a clinical chatbot used daily by real patients, and NLPDF, a solo-built LLM-to-action platform. Hands-on with Python, LangChain, FastAPI, and async backends.";

export const STATUS =
  "Software Developer at ECare (healthcare startup, Houston, TX) since July 2025. Open to software engineering roles: full-stack and backend, junior to mid level, in the US and India.";

export const ROLES = [
  "RAG chatbots",
  "LLM-to-action platforms",
  "multi-tenant SaaS",
  "full-stack apps, end to end",
  "async Python backends",
];

export const ABOUT_POINTS: [string, string][] = [
  [
    "How I work",
    "A generalist builder across full-stack and backend. I ship working apps end to end, and at ECare I am the most senior developer on a small team, without the title.",
  ],
  [
    "Why",
    "I like building things that actually get used. Ship, watch real usage, improve. The ECare clinical chatbot is used by real people every day.",
  ],
  [
    "Proudest of",
    "NLPDF. Built from scratch, LLM-to-action, I own the deployment cycle, 150+ tests. The most complete thing I have shipped.",
  ],
];

export const FACTS: [string, string][] = [
  ["Based in", "Houston, TX, USA. Open to relocation anywhere in the US."],
  ["From", "Chittoor, Andhra Pradesh, India"],
  ["Languages", "English, Telugu"],
  ["Preferred language", "Python"],
  ["AI dev tools", "Codex, Claude Code, Muse, and nearly all major GenAI tools"],
  ["Security practice", "Hands-on practice on Hack The Box"],
];

export interface FlowDef {
  title: string;
  nodes: { t: string; s: string }[];
  /** a side branch hanging off node `at`, e.g. rejected requests */
  branch?: { at: number; label: string; kind?: "block" | "retry" };
}

export interface Job {
  company: string;
  role: string;
  place: string;
  period: string;
  type?: string;
  points: string[];
  /** how many points the card shows before "open details" (all shown in the panel) */
  preview?: number;
  stack: string[];
  flows: FlowDef[];
}

export const JOBS: Job[] = [
  {
    company: "ECare",
    role: "Software Developer",
    place: "Houston, TX",
    period: "Jul 2025 to Present",
    type: "Full-time",
    preview: 4,
    points: [
      "Own full-stack features end to end across the clinic's multi-tenant SaaS platform, from React/Next.js frontends in TypeScript through FastAPI and PostgreSQL services, shipped in small independently tested increments.",
      "Built and shipped a RAG-based clinical chatbot used daily by real patients and clinic staff, with a layered safety pipeline that screens deceptive messages before they reach the RAG model.",
      "Hardened the staff LMS platform (Next.js, ASP.NET): triaged and patched security vulnerabilities and shipped production fixes with regression testing, acting as the senior-most developer on the team.",
      "Dockerized services on Azure App Service, with a custom observability setup for monitoring and alerting.",
      "Architected and built the multi-tenant chronic-care SaaS platform from the ground up using FastAPI, Next.js, TypeScript, and PostgreSQL.",
      "Integrated AWS Bedrock to add generative-AI features to the platform.",
      "Engineered real-time calling by integrating the AWS Chime SDK.",
      "Designed the schema with SQLAlchemy ORM and Alembic migrations, plus JWT-based RBAC for tenant isolation.",
      "Built CI/CD pipelines with Pytest unit and integration tests via GitHub Actions, establishing the team's testing discipline.",
      "Wrote Oracle PL/SQL stored procedures and triggers supporting backend data workflows.",
    ],
    stack: [
      "Python", "FastAPI", "PostgreSQL", "React", "Next.js", "TypeScript", "RAG", "AWS Bedrock",
      "AWS Chime SDK", "SQLAlchemy", "Alembic", "JWT RBAC", "ASP.NET", "C#", "Oracle PL/SQL",
      "Docker", "Azure App Service", "Pytest", "GitHub Actions",
    ],
    flows: [
      {
        title: "Clinical RAG chatbot: request flow",
        nodes: [
          { t: "Message", s: "patient or staff" },
          { t: "Safety layer", s: "screens deceptive input" },
          { t: "RAG model", s: "retrieval + answer" },
          { t: "Reply", s: "back to the user" },
        ],
        branch: { at: 1, label: "✕ screened out" },
      },
      {
        title: "Multi-tenant SaaS: request path",
        nodes: [
          { t: "Client", s: "Next.js + TypeScript" },
          { t: "JWT RBAC", s: "tenant isolation" },
          { t: "FastAPI", s: "services" },
          { t: "PostgreSQL", s: "SQLAlchemy + Alembic" },
          { t: "AWS Bedrock", s: "generative-AI features" },
        ],
        branch: { at: 1, label: "✕ wrong tenant" },
      },
      {
        title: "CI/CD pipeline",
        nodes: [
          { t: "Push", s: "small increment" },
          { t: "GitHub Actions", s: "pipeline" },
          { t: "Pytest", s: "unit + integration" },
          { t: "Azure", s: "Docker on App Service" },
        ],
        branch: { at: 2, label: "✕ tests fail" },
      },
    ],
  },
  {
    company: "University of Houston",
    role: "Research Assistant",
    place: "Houston, TX",
    period: "Apr 2024 to Jul 2024",
    points: [
      "Assisted security research on intelligent traffic systems and connected vehicles by preprocessing and analyzing datasets.",
    ],
    stack: ["Security research", "Data preprocessing", "Data analysis"],
    flows: [
      {
        title: "Research support",
        nodes: [
          { t: "Datasets", s: "traffic systems, connected vehicles" },
          { t: "Preprocess", s: "prepare the data" },
          { t: "Analyze", s: "for the security research" },
        ],
      },
    ],
  },
  {
    company: "Cognizant Technology Solutions",
    role: "Programmer Analyst",
    place: "Bangalore, India",
    period: "Aug 2022 to Jul 2023",
    points: [
      "Fixed bugs in a Spring Boot and JSP enterprise application, improving application stability.",
      "Manual end-to-end testing on a custom Salesforce CRM application, raising test coverage and reliability.",
    ],
    stack: ["Java", "Spring Boot", "JSP", "Salesforce CRM", "Manual testing"],
    flows: [
      {
        title: "Enterprise application",
        nodes: [
          { t: "Bug", s: "Spring Boot + JSP app" },
          { t: "Fix", s: "patched" },
          { t: "Stability", s: "improved" },
        ],
      },
      {
        title: "Salesforce CRM",
        nodes: [
          { t: "Custom CRM", s: "Salesforce" },
          { t: "Manual E2E tests", s: "end to end" },
          { t: "Coverage", s: "and reliability up" },
        ],
      },
    ],
  },
  {
    company: "Cognizant Technology Solutions",
    role: "Programmer Analyst Trainee",
    place: "Bangalore, India",
    period: "Feb 2022 to Jul 2022",
    points: ["Capstone project: built a CRUD application demonstrating RESTful API development and database design."],
    stack: ["REST APIs", "CRUD", "Database design"],
    flows: [
      {
        title: "CRUD capstone: request flow",
        nodes: [
          { t: "Client", s: "HTTP request" },
          { t: "REST API", s: "routing" },
          { t: "CRUD", s: "create, read, update, delete" },
          { t: "Database", s: "designed schema" },
        ],
      },
    ],
  },
];

export interface Project {
  key: string;
  title: string;
  subtitle: string;
  live: string;
  github: string;
  blurb: string;
  points: [string, string][];
  stack: string[];
  flows: FlowDef[];
}

export const NLPDF: Project = {
  key: "nlpdf",
  title: "NLPDF",
  subtitle: "AI-Powered PDF Processing Platform",
  live: "https://nlpdf.site",
  github: "https://github.com/lnandanapalli/nlpdf",
  blurb:
    "A full-stack platform where natural-language commands are parsed by Llama 3.1 into validated operation chains, executed server-side.",
  points: [
    ["LLM to action", "Its own JSON protocol, Pydantic validation, and a retry-with-feedback loop for bulk multi-file operations."],
    ["Auth & security", "JWT rotation with JTI revocation, CSRF protection, email OTP, Argon2id hashing, Turnstile CAPTCHA, IP rate limiting."],
    ["Stack", "Async FastAPI backend, React frontend, Docker on Azure. 150+ tests."],
    ["Shipping", "Built from scratch, solo. I own the deployment cycle and used AI to automate a few CI checks and write a few basic e2e tests."],
  ],
  stack: ["Python", "FastAPI", "Llama 3.1", "Pydantic", "React", "Docker", "Azure", "JWT", "Argon2id"],
  flows: [
    {
      title: "Natural language to PDF operations",
      nodes: [
        { t: "Command", s: "plain English" },
        { t: "Llama 3.1", s: "JSON operation chain" },
        { t: "Pydantic", s: "validation" },
        { t: "Server", s: "executes the chain" },
        { t: "PDFs", s: "bulk, multi-file output" },
      ],
      branch: { at: 2, label: "↺ retry with feedback", kind: "retry" },
    },
    {
      title: "Auth & security",
      nodes: [
        { t: "Request", s: "sign in" },
        { t: "Turnstile", s: "CAPTCHA + IP rate limit" },
        { t: "Argon2id", s: "password hash" },
        { t: "Email OTP", s: "verification" },
        { t: "JWT", s: "rotation + JTI revocation" },
      ],
      branch: { at: 1, label: "✕ blocked" },
    },
  ],
};

export const PROJECTS: Project[] = [
  {
    key: "lineboard",
    title: "Lineboard",
    subtitle: "Handwriting Whiteboard for Tablets",
    live: "https://lineboard.site",
    github: "https://github.com/lnandanapalli/lineboard",
    blurb:
      "A handwriting whiteboard for tablets without an active pen. A draggable line splits the screen: write above the line, rest your palm on the locked area below it.",
    points: [
      ["Writing", "Palm filtering, 19 shapes, notebooks, PNG export, version history."],
      ["Accounts", "Supabase auth, sync, and encryption."],
    ],
    stack: ["Supabase", "Palm filtering", "PNG export", "Encryption"],
    flows: [
      {
        title: "How the screen is split",
        nodes: [
          { t: "Write", s: "above the line" },
          { t: "Line", s: "drag to move it" },
          { t: "Palm rest", s: "locked area below" },
        ],
      },
    ],
  },
  {
    key: "p2p",
    title: "P2P File Share",
    subtitle: "Encrypted Peer-to-Peer File Transfer",
    live: "https://share.nlpdf.site",
    github: "https://github.com/lnandanapalli/p2p-file-share",
    blurb:
      "Encrypted peer-to-peer file transfer over UDP hole punching, in a single zero-dependency Python file.",
    points: [
      ["Pairing", "Short codes with SPAKE2 key exchange."],
      ["Browser", "WebRTC browser client with AES-GCM."],
      ["Fallback", "Go relay fallback."],
    ],
    stack: ["Python", "UDP hole punching", "SPAKE2", "WebRTC", "AES-GCM"],
    flows: [
      {
        title: "Sending a file",
        nodes: [
          { t: "Short code", s: "pairs the two peers" },
          { t: "SPAKE2", s: "key exchange" },
          { t: "Hole punch", s: "UDP, peer to peer" },
          { t: "Transfer", s: "encrypted" },
        ],
        branch: { at: 2, label: "↺ Go relay fallback", kind: "retry" },
      },
    ],
  },
];

export interface SkillGroup {
  group: string;
  items?: string[];
  subs?: { label: string; items: string[] }[];
}

export const SKILLS: SkillGroup[] = [
  { group: "AI / ML", items: ["RAG", "LangChain", "LangGraph", "LLM APIs", "Fine-tuning", "PyTorch", "TensorFlow"] },
  {
    group: "Languages",
    items: ["Python", "Java", "JavaScript", "TypeScript", "HTML", "CSS", "SQL", "Bash", "PowerShell", "C++"],
  },
  { group: "Frameworks", items: ["FastAPI", "React", "Next.js", "SQLAlchemy", "Alembic", "Pytest", "MUI"] },
  {
    group: "Cloud",
    subs: [
      { label: "Azure", items: ["App Services", "AI Search", "Azure SQL", "Functions", "Entra ID"] },
      { label: "AWS", items: ["Bedrock", "Lambda", "EC2", "S3", "Aurora", "IAM", "VPC"] },
    ],
  },
  { group: "Databases", items: ["PostgreSQL", "SQL Server"] },
  { group: "DevOps", items: ["Docker", "GitHub Actions", "Terraform", "Linux", "Git", "Jira", "Postman"] },
];

export interface EducationEntry {
  school: string;
  degree: string;
  place: string;
  period: string;
  notes: string[];
}

export const EDUCATION: EducationEntry[] = [
  {
    school: "University of Houston",
    degree: "MS in Computer Science",
    place: "Houston, TX",
    period: "Aug 2023 to May 2025",
    notes: ["Degree conferred May 8, 2025", "GPA 3.534"],
  },
  {
    school: "Saveetha Engineering College",
    degree: "BE in Computer Science",
    place: "Chennai, India",
    period: "Jun 2018 to May 2022",
    notes: ["Anna University", "GPA 8.01/10"],
  },
];

export const SCHOOLING =
  "Earlier schooling: SriChaitanya, Chittoor, Andhra Pradesh. 10th grade, 2016. Intermediate (12th grade), 2018, MPC stream (Maths, Physics, Chemistry).";

/** The hands-on tools line. */
export const MARQUEE = [
  "MCP", "Python", "FastAPI", "LangChain", "Docker", "GitHub Actions", "Azure", "AWS Bedrock",
  "PostgreSQL", "SQLAlchemy", "Pytest", "React", "Next.js", "TypeScript",
];
