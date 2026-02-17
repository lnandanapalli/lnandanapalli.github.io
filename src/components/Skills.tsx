import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import CodeIcon from "@mui/icons-material/Code";
import WebIcon from "@mui/icons-material/Web";
import StorageIcon from "@mui/icons-material/Storage";
import BuildIcon from "@mui/icons-material/Build";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CloudIcon from "@mui/icons-material/Cloud";
import SectionTitle from "./SectionTitle";
import { useInView } from "../hooks/useInView";
import type { ReactNode } from "react";

interface SkillCategory {
  title: string;
  icon: ReactNode;
  skills: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Languages",
    icon: <CodeIcon />,
    skills: ["Python", "Java", "JavaScript", "TypeScript", "C", "C++", "C#", "Go", "Rust", "SQL", "Bash"],
  },
  {
    title: "Frameworks",
    icon: <WebIcon />,
    skills: ["Spring Boot", "FastAPI", "React", "Next.js", "Bootstrap", "Material UI", "JUnit", "Pytest", "Selenium"],
  },
  {
    title: "Databases",
    icon: <StorageIcon />,
    skills: ["MySQL", "PostgreSQL", "SQL Server"],
  },
  {
    title: "Tools & Methods",
    icon: <BuildIcon />,
    skills: ["Git", "Jira", "Swagger", "Postman", "Agile", "DevOps"],
  },
  {
    title: "CI/CD",
    icon: <RocketLaunchIcon />,
    skills: ["GitHub Actions", "Docker", "Kubernetes"],
  },
  {
    title: "AI / ML",
    icon: <SmartToyIcon />,
    skills: ["TensorFlow", "PyTorch", "AWS Bedrock", "Fine Tuning", "RAG"],
  },
  {
    title: "Cloud",
    icon: <CloudIcon />,
    skills: ["AWS", "Azure", "Linux", "Nginx"],
  },
];

function SkillCard({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  const { ref, isInView } = useInView(0.1);

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }} ref={ref}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          height: "100%",
          border: 1,
          borderColor: "divider",
          background: "rgba(15, 15, 26, 0.5)",
          backdropFilter: "blur(10px)",
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
          transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`,
          "&:hover": {
            borderColor: "primary.dark",
            background: "rgba(99, 102, 241, 0.04)",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
          <Box
            sx={{
              color: "primary.light",
              display: "flex",
              alignItems: "center",
              "& svg": { fontSize: 24 },
            }}
          >
            {category.icon}
          </Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {category.title}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
          {category.skills.map((skill, skillIndex) => (
            <Chip
              key={skill}
              label={skill}
              size="small"
              sx={{
                background: "rgba(99, 102, 241, 0.08)",
                color: "text.secondary",
                fontSize: "0.78rem",
                height: 28,
                opacity: isInView ? 1 : 0,
                transition: `opacity 0.4s ease ${index * 0.1 + skillIndex * 0.05}s`,
                "&:hover": {
                  background: "rgba(99, 102, 241, 0.18)",
                  color: "primary.light",
                },
              }}
            />
          ))}
        </Box>
      </Paper>
    </Grid>
  );
}

export default function Skills() {
  return (
    <Box id="skills" sx={{ py: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg">
        <SectionTitle title="Skills" subtitle="Technologies and tools I work with" />
        <Grid container spacing={3}>
          {SKILL_CATEGORIES.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
