import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import SectionTitle from "./SectionTitle";
import { useInView } from "../hooks/useInView";

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  tags: string[];
  id?: string;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    title: "Software Developer Intern",
    company: "ECare",
    location: "Houston, TX",
    period: "Jul 2025 – Dec 2025",
    bullets: [
      "Architected and developed a multi-tenant healthcare SaaS platform using FastAPI, Next.js, and PostgreSQL.",
      "Engineered real-time communication features by integrating AWS Chime SDK, enabling call capabilities.",
      "Designed and implemented Role-Based Access Control (RBAC) mechanisms using JWT, securing multi-tenant architecture.",
      "Implemented AI-driven solutions utilizing AWS Bedrock, enhancing platform functionality with generative AI features.",
      "Established robust CI/CD pipelines, incorporating unit and integration tests using Pytest to ensure code quality.",
      "Designed database schema, used SQL Alchemy for ORM and managed database migrations with Alembic.",
      "Authored technical documentation using Sphinx to support development and long-term maintainability.",
    ],
    tags: ["FastAPI", "Next.js", "PostgreSQL", "AWS", "Docker"],
    id: "experience-ecare",
  },
  {
    title: "Research Assistant",
    company: "University of Houston",
    location: "Houston, TX",
    period: "Apr 2024 – Jul 2024",
    bullets: [
      "Assisted in security research focused on intelligent traffic systems and connected vehicles, analyzing potential vulnerabilities.",
    ],
    tags: ["Python", "Research", "Security"],
    id: "experience-uh",
  },
  {
    title: "Software Engineer",
    company: "Cognizant Technology Solutions",
    location: "Bangalore, India",
    period: "Aug 2022 – Jul 2023",
    bullets: [
      "Enhanced enterprise applications by testing applications and resolving bugs and adhering to Agile methodologies.",
      "Optimized code reliability by expanding test coverage and end-to-end manual testing for a CRM application.",
    ],
    tags: ["Spring Boot", "Java", "Agile", "JUnit"],
    id: "experience-cognizant1",
  },
  {
    title: "Programmer Analyst Trainee",
    company: "Cognizant Technology Solutions",
    location: "Bangalore, India",
    period: "Feb 2022 – Jul 2022",
    bullets: [
      "Built full-stack web applications during training, mastering HTML, CSS, React, Spring Boot, and SQL.",
      "Built a CRUD application as a capstone project, demonstrating proficiency in RESTful API development and databases.",
    ],
    tags: ["React", "Spring Boot", "SQL", "HTML/CSS"],
    id: "experience-cognizant2",
  },
];

function ExperienceCard({ item, index }: { item: ExperienceItem; index: number }) {
  const { ref, isInView } = useInView(0.1);

  return (
    <Box
      ref={ref}
      id={item.id}
      sx={{
        position: "relative",
        pl: { xs: 4, md: 5 },
        pb: 6,
        "&::before": {
          content: '""',
          position: "absolute",
          left: { xs: 6, md: 8 },
          top: 0,
          bottom: 0,
          width: 2,
          background: "linear-gradient(180deg, #6366f1, rgba(6, 182, 212, 0.3))",
        },
        "&:last-child::before": {
          background: "linear-gradient(180deg, #6366f1, transparent)",
        },
        "&:last-child": { pb: 0 },
      }}
    >
      {/* Timeline dot */}
      <Box
        sx={{
          position: "absolute",
          left: { xs: 1, md: 3 },
          top: 0,
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: isInView ? "#6366f1" : "transparent",
          border: 2,
          borderColor: "primary.main",
          transition: "all 0.4s ease",
          boxShadow: isInView ? "0 0 12px rgba(99, 102, 241, 0.5)" : "none",
        }}
      />

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 3.5 },
          border: 1,
          borderColor: "divider",
          background: "rgba(15, 15, 26, 0.5)",
          backdropFilter: "blur(10px)",
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateX(0)" : "translateX(40px)",
          transition: `all 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`,
          "&:hover": {
            borderColor: "primary.dark",
            background: "rgba(99, 102, 241, 0.04)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { sm: "center" },
            mb: 1.5,
            gap: 1,
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontSize: { xs: "1rem", md: "1.15rem" } }}>
              {item.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "primary.light",
                fontWeight: 500,
              }}
            >
              {item.company} · {item.location}
            </Typography>
          </Box>
          <Chip
            label={item.period}
            size="small"
            variant="outlined"
            sx={{
              borderColor: "rgba(99, 102, 241, 0.3)",
              color: "text.secondary",
              alignSelf: { xs: "flex-start", sm: "center" },
              fontSize: "0.75rem",
            }}
          />
        </Box>

        <Box component="ul" sx={{ pl: 2, mb: 2, mt: 0 }}>
          {item.bullets.map((bullet, i) => (
            <Typography
              key={i}
              component="li"
              variant="body2"
              sx={{ color: "text.secondary", mb: 0.75, lineHeight: 1.7 }}
            >
              {bullet}
            </Typography>
          ))}
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
          {item.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                background: "rgba(99, 102, 241, 0.1)",
                color: "primary.light",
                fontSize: "0.72rem",
                height: 26,
              }}
            />
          ))}
        </Box>
      </Paper>
    </Box>
  );
}

export default function Experience() {
  return (
    <Box id="experience" sx={{ py: { xs: 10, md: 14 }, background: "rgba(15, 15, 26, 0.3)" }}>
      <Container maxWidth="md">
        <SectionTitle
          title="Experience"
          subtitle="My professional journey and contributions"
        />
        <Box>
          {EXPERIENCES.map((item, index) => (
            <ExperienceCard key={item.title + item.company} item={item} index={index} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
