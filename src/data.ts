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

export interface Job {
  company: string;
  role: string;
  place: string;
  period: string;
  points: string[];
  stack: string[];
}

export const JOBS: Job[] = [
  {
    company: "ECare",
    role: "Software Developer",
    place: "Houston, TX",
    period: "Jan 2026 — Now",
    points: [
      "Built a RAG-based AI chatbot answering patient & clinic healthcare queries — patient safety first.",
      "Architected a layered security pipeline: a filtering model catches deceptive messages before they ever reach the RAG model.",
      "Code-reviewed an LMS platform (ASP.NET, Next.js) used to onboard and train clinic staff.",
      "Containerized and shipped the LMS to Azure App Service after regression testing.",
    ],
    stack: ["RAG", "LLMs", "ASP.NET", "Next.js", "Azure", "Docker"],
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
  },
  {
    company: "Cognizant",
    role: "Software Engineer",
    place: "Bangalore, India",
    period: "Aug 2022 — Jul 2023",
    points: [
      "Improved enterprise app stability by fixing bugs in a Spring Boot + JSP application.",
      "Hit 99% reliability with end-to-end testing on a custom Salesforce CRM application.",
    ],
    stack: ["Java", "Spring Boot", "JSP", "Salesforce"],
  },
  {
    company: "Cognizant",
    role: "Programmer Analyst Trainee",
    place: "Bangalore, India",
    period: "Feb 2022 — Jul 2022",
    points: ["Built a CRUD application capstone — RESTful API design and databases."],
    stack: ["REST", "SQL", "Java"],
  },
];

export const NLPDF = {
  title: "NLPDF",
  subtitle: "AI-powered PDF processing",
  live: "https://nlpdf.site",
  github: "https://github.com/lnandanapalli/nlpdf",
  blurb:
    "Type what you want done to your PDFs in plain English. Llama 3.1 turns it into a validated chain of operations that runs server-side.",
  points: [
    ["LLM → action", "JSON protocol, Pydantic validation, retries with a feedback loop, chained execution across many files."],
    ["Fort Knox auth", "JWT refresh rotation + JTI revocation, CSRF double-submit, email OTP, Argon2id, Turnstile, IP rate limiting."],
    ["Async to the core", "FastAPI, async SQLAlchemy, Alembic on SQL Server — 150+ tests across auth, security, parsing and PDF ops."],
    ["Shipped", "React frontend with silent token refresh, drag-and-drop upload. Dockerized on Azure App Service + Azure SQL."],
  ] as [string, string][],
  stack: ["React", "TypeScript", "FastAPI", "Llama 3.1", "SQL Server", "Docker", "Azure"],
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
