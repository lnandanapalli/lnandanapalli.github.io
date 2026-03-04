import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SectionTitle from "./SectionTitle";
import { useInView } from "../hooks/useInView";

interface Project {
  title: string;
  subtitle: string;
  description: string[];
  tags: string[];
  github?: string;
  live?: string;
  id?: string;
}

const PROJECTS: Project[] = [
  {
    title: "NLPDF",
    subtitle: "AI-Powered PDF Processing Platform",
    description: [
      "Built a full-stack PDF processing platform where users issue natural language commands (compress, split, merge, rotate, convert) that are parsed by Llama 3.1 into validated operation chains executed server-side.",
      "Engineered an LLM-to-action pipeline: prompt-engineered JSON protocol, Pydantic schema validation, retry with feedback loop, and a chained execution engine supporting bulk operations across multiple files.",
      "Implemented production-grade auth: JWTs with refresh token rotation and JTI revocation, CSRF double-submit protection, email OTP verification, Argon2id hashing, Cloudflare Turnstile CAPTCHA, and IP rate limiting.",
      "Developed a fully async Python backend with FastAPI, SQLAlchemy async sessions, and Alembic migrations on SQL Server, with 150+ tests covering auth, security, LLM parsing, and PDF operations.",
      "Created a React 19 TypeScript frontend with cookie-based auth, automatic silent token refresh via Axios interceptors, drag-and-drop file upload, and natural language command input.",
      "Containerized the backend and frontend using Docker, deployed on Azure App Service and connected with Azure SQL"
    ],
    tags: ["React", "FastAPI", "TypeScript", "SQL Server", "Docker", "Azure", "LLMs"],
    github: "https://github.com/lnandanapalli/nlpdf",
    live: "https://nlpdf.site",
    id: "project-nlpdf",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, isInView } = useInView();

  return (
    <Grid size={{ xs: 12, md: 8 }} ref={ref} id={project.id}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          height: "100%",
          border: 1,
          borderColor: "divider",
          background: "rgba(15, 15, 26, 0.5)",
          backdropFilter: "blur(10px)",
          position: "relative",
          overflow: "hidden",
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(40px)",
          transition: `all 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.2}s`,
          "&:hover": {
            borderColor: "primary.main",
            transform: "translateY(-6px)",
            "& .project-glow": {
              opacity: 1,
            },
          },
        }}
      >
        {/* Hover glow effect */}
        <Box
          className="project-glow"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: "linear-gradient(90deg, #6366f1, #06b6d4)",
            opacity: 0,
            transition: "opacity 0.3s ease",
          }}
        />

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
          <AutoAwesomeIcon sx={{ color: "primary.light", fontSize: 28 }} />
          <Box>
            <Typography variant="h5" sx={{ fontSize: { xs: "1.2rem", md: "1.35rem" } }}>
              {project.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "primary.light", fontWeight: 500 }}>
              {project.subtitle}
            </Typography>
          </Box>
        </Box>

        <Box component="ul" sx={{ pl: 2, mb: 3, mt: 0 }}>
          {project.description.map((point, i) => (
            <Typography
              key={i}
              component="li"
              variant="body2"
              sx={{ color: "text.secondary", mb: 0.75, lineHeight: 1.7 }}
            >
              {point}
            </Typography>
          ))}
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mb: 3 }}>
          {project.tags.map((tag) => (
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

        <Box sx={{ display: "flex", gap: 1.5 }}>
          {project.github && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<GitHubIcon />}
              component="a"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                borderColor: "rgba(99, 102, 241, 0.3)",
                color: "text.secondary",
                "&:hover": {
                  borderColor: "primary.main",
                  color: "primary.light",
                  background: "rgba(99, 102, 241, 0.08)",
                },
              }}
            >
              Source
            </Button>
          )}
          {project.live && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<LaunchIcon />}
              component="a"
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                borderColor: "rgba(6, 182, 212, 0.3)",
                color: "text.secondary",
                "&:hover": {
                  borderColor: "secondary.main",
                  color: "secondary.light",
                  background: "rgba(6, 182, 212, 0.08)",
                },
              }}
            >
              Visit Website
            </Button>
          )}
        </Box>
      </Paper>
    </Grid>
  );
}

export default function Projects() {
  return (
    <Box id="projects" sx={{ py: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg">
        <SectionTitle
          title="Projects"
          subtitle="Featured projects that showcase my skills"
        />
        <Grid container spacing={3} justifyContent="center">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
