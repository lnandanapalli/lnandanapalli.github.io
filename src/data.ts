export const NAME = "Lokeshwar";
export const FULL_NAME = "Lokeshwar Reddy Nandanapalli";

export const LINKS = [
  { label: "GitHub", href: "https://github.com/lnandanapalli", handle: "@lnandanapalli" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/lnandanapalli/", handle: "in/lnandanapalli" },
  { label: "LeetCode", href: "https://leetcode.com/u/lokr/", handle: "u/lokr" },
  { label: "Medium", href: "https://medium.com/@lnandanapalli", handle: "@lnandanapalli" },
];

export const ROLES = [
  "RAG chatbots",
  "agentic AI workflows",
  "LLM → action pipelines",
  "multi-tenant SaaS",
  "secure, production-grade APIs",
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
  points: string[];
  stack: string[];
  flows: FlowDef[];
}

export const JOBS: Job[] = [
  {
    company: "ECare",
    role: "Software Developer",
    place: "Houston, TX",
    period: "Jan 2026 — Now",
    points: [
      "Built a RAG-based AI chatbot for patient and clinic healthcare queries, prioritizing patient safety.",
      "Architected a layered security pipeline: a filtering model catches deceptive messages before they reach the RAG model.",
      "Code-reviewed an LMS platform (ASP.NET, Next.js) used to onboard and train clinic staff.",
      "Containerized and shipped the LMS to Azure App Service after regression testing.",
    ],
    stack: ["RAG", "LLMs", "ASP.NET", "Next.js", "Azure", "Docker"],
    flows: [
      {
        title: "RAG chatbot · request flow",
        nodes: [
          { t: "Query", s: "patient message" },
          { t: "Guard model", s: "filters deceptive input" },
          { t: "Retriever", s: "clinic knowledge base" },
          { t: "LLM", s: "grounded generation" },
          { t: "Answer", s: "safe response" },
        ],
        branch: { at: 1, label: "✕ blocked" },
      },
      {
        title: "LMS · review to release",
        nodes: [
          { t: "Code review", s: "ASP.NET + Next.js" },
          { t: "Regression", s: "test pass" },
          { t: "Container", s: "Docker image" },
          { t: "Azure", s: "App Service" },
        ],
        branch: { at: 1, label: "✕ fix & resubmit" },
      },
    ],
  },
  {
    company: "ECare",
    role: "Software Developer Intern",
    place: "Houston, TX",
    period: "Jul 2025 — Dec 2025",
    points: [
      "Architected a multi-tenant chronic care SaaS platform on FastAPI, Next.js and PostgreSQL.",
      "Real-time calling via the AWS Chime SDK.",
      "RBAC with JWT to lock down the multi-tenant architecture.",
      "Generative AI features powered by AWS Bedrock.",
      "CI/CD with Pytest unit + integration suites; schema design with SQLAlchemy & Alembic.",
    ],
    stack: ["FastAPI", "Next.js", "PostgreSQL", "AWS Bedrock", "Chime SDK", "Pytest"],
    flows: [
      {
        title: "Multi-tenant SaaS · request path",
        nodes: [
          { t: "Client", s: "Next.js app" },
          { t: "JWT + RBAC", s: "tenant & role check" },
          { t: "FastAPI", s: "business logic" },
          { t: "PostgreSQL", s: "tenant-scoped data" },
          { t: "Bedrock", s: "generative AI features" },
        ],
        branch: { at: 1, label: "✕ 403 forbidden" },
      },
      {
        title: "CI/CD pipeline",
        nodes: [
          { t: "Push", s: "feature branch" },
          { t: "Pytest", s: "unit + integration" },
          { t: "Alembic", s: "schema migration" },
          { t: "Deploy", s: "release" },
        ],
        branch: { at: 1, label: "✕ failing tests" },
      },
    ],
  },
  {
    company: "University of Houston",
    role: "Research Assistant",
    place: "Houston, TX",
    period: "Apr 2024 — Jul 2024",
    points: [
      "Security research on intelligent traffic systems and connected vehicles — preprocessing and analyzing datasets.",
    ],
    stack: ["Python", "Data Analysis", "Security"],
    flows: [
      {
        title: "Connected-vehicle security research",
        nodes: [
          { t: "Raw data", s: "traffic & vehicle logs" },
          { t: "Preprocess", s: "clean, normalize" },
          { t: "Analysis", s: "attack patterns" },
          { t: "Findings", s: "security insights" },
        ],
        branch: { at: 1, label: "✕ noisy records" },
      },
    ],
  },
  {
    company: "Cognizant",
    role: "Software Engineer",
    place: "Bangalore, India",
    period: "Aug 2022 — Jul 2023",
    points: [
      "Improved enterprise app stability by fixing bugs in a Spring Boot + JSP application.",
      "Achieved 99% reliability with end-to-end testing on a custom Salesforce CRM application.",
    ],
    stack: ["Java", "Spring Boot", "JSP", "Salesforce"],
    flows: [
      {
        title: "Bug fix lifecycle",
        nodes: [
          { t: "Bug report", s: "enterprise app" },
          { t: "Reproduce", s: "isolate the cause" },
          { t: "Fix", s: "Spring Boot / JSP" },
          { t: "E2E tests", s: "Salesforce CRM" },
          { t: "Release", s: "99% reliability" },
        ],
        branch: { at: 3, label: "↺ regression found", kind: "retry" },
      },
    ],
  },
  {
    company: "Cognizant",
    role: "Programmer Analyst Trainee",
    place: "Bangalore, India",
    period: "Feb 2022 — Jul 2022",
    points: ["Built a CRUD application capstone — RESTful API design and databases."],
    stack: ["REST", "SQL", "Java"],
    flows: [
      {
        title: "CRUD capstone · request flow",
        nodes: [
          { t: "Client", s: "HTTP request" },
          { t: "REST API", s: "routing & validation" },
          { t: "Service", s: "CRUD logic" },
          { t: "Database", s: "SQL" },
        ],
        branch: { at: 1, label: "✕ 400 bad request" },
      },
    ],
  },
];

export const NLPDF = {
  title: "NLPDF",
  subtitle: "AI-powered PDF processing",
  live: "https://nlpdf.site",
  github: "https://github.com/lnandanapalli/nlpdf",
  blurb:
    "A full-stack PDF platform: natural language commands are parsed by Llama 3.1 into validated operation chains and executed server-side.",
  points: [
    ["LLM pipeline", "JSON protocol, Pydantic validation, retries with a feedback loop, chained execution across many files."],
    ["Auth & security", "JWT refresh rotation + JTI revocation, CSRF double-submit, email OTP, Argon2id, Turnstile, IP rate limiting."],
    ["Backend", "FastAPI, async SQLAlchemy, Alembic on SQL Server — 150+ tests across auth, security, parsing and PDF ops."],
    ["Frontend & deploy", "React frontend with silent token refresh, drag-and-drop upload. Dockerized on Azure App Service + Azure SQL."],
  ] as [string, string][],
  stack: ["React", "TypeScript", "FastAPI", "Llama 3.1", "SQL Server", "Docker", "Azure"],
  flows: [
    {
      title: "Natural language → PDF operations",
      nodes: [
        { t: "Command", s: "“compress & split…”" },
        { t: "Llama 3.1", s: "JSON op chain" },
        { t: "Pydantic", s: "schema validation" },
        { t: "Engine", s: "chained execution" },
        { t: "PDFs", s: "bulk output" },
      ],
      branch: { at: 2, label: "↺ retry with feedback", kind: "retry" },
    },
    {
      title: "Auth flow",
      nodes: [
        { t: "Login", s: "email + password" },
        { t: "Turnstile", s: "CAPTCHA + rate limit" },
        { t: "Argon2id", s: "password verify" },
        { t: "Email OTP", s: "verification" },
        { t: "JWT", s: "refresh rotation + JTI" },
      ],
      branch: { at: 1, label: "✕ bot blocked" },
    },
  ] as FlowDef[],
};

export const SKILLS: { group: string; items: string[] }[] = [
  { group: "AI", items: ["RAG", "LangChain", "LangGraph", "MCP", "Fine-tuning", "PyTorch", "TensorFlow"] },
  { group: "Languages", items: ["Python", "TypeScript", "JavaScript", "Java", "SQL", "Bash", "PowerShell", "HTML", "CSS"] },
  { group: "Frameworks", items: ["FastAPI", "React", "Next.js", "SQLAlchemy", "Alembic", "Pytest", "MUI"] },
  { group: "Cloud", items: ["AWS Bedrock", "Lambda", "EC2", "S3", "Aurora", "IAM", "VPC", "Azure App Service", "Functions", "AI Search", "Entra ID", "Azure SQL"] },
  { group: "DevOps", items: ["Docker", "GitHub Actions", "Terraform", "Linux"] },
  { group: "Data & Tools", items: ["PostgreSQL", "SQL Server", "Git", "Jira", "Postman"] },
];

export const EDUCATION = [
  { school: "University of Houston", degree: "M.S. Computer Science", place: "Houston, TX", period: "2023 — 2025" },
  { school: "Saveetha Engineering College", degree: "B.E. Computer Science", place: "Chennai, India", period: "2018 — 2022" },
];

export const MARQUEE = [
  "Python", "FastAPI", "React", "Next.js", "LangGraph", "RAG", "AWS Bedrock", "Azure",
  "PostgreSQL", "Docker", "Terraform", "TypeScript", "MCP", "PyTorch",
];
