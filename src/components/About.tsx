import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CodeIcon from "@mui/icons-material/Code";
import CloudIcon from "@mui/icons-material/Cloud";
import StorageIcon from "@mui/icons-material/Storage";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SectionTitle from "./SectionTitle";
import { useInView } from "../hooks/useInView";

const HIGHLIGHTS = [
  { icon: <CodeIcon />, title: "Full-Stack", description: "React, Next.js, Spring Boot, FastAPI" },
  { icon: <CloudIcon />, title: "Cloud Native", description: "AWS, Azure, Docker, Kubernetes" },
  { icon: <StorageIcon />, title: "Databases", description: "PostgreSQL, MySQL, SQL Server" },
  { icon: <SmartToyIcon />, title: "AI / ML", description: "AWS Bedrock, RAG, Fine Tuning" },
];

export default function About() {
  const { ref, isInView } = useInView();

  return (
    <Box id="about" sx={{ py: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg">
        <SectionTitle title="About Me" subtitle="A brief introduction to who I am and what I do" />

        <Grid container spacing={4} ref={ref}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateX(0)" : "translateX(-40px)",
                transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", mb: 3, fontSize: "1.05rem" }}
              >
                Software Engineer with 2+ years of experience designing, developing, and
                maintaining full-stack web applications. I thrive on building solutions
                that are both technically sound and deliver excellent user experiences.
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", mb: 3, fontSize: "1.05rem" }}
              >
                Experienced in FastAPI, Spring Boot, and React, with expertise in developing
                RESTful APIs. Proficient in cloud-native ecosystems and CI/CD pipelines,
                with recent hands-on experience integrating LLMs and AI-driven features.
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", fontSize: "1.05rem" }}
              >
                I hold a Master's degree in Computer Science from the University of Houston,
                and I'm constantly exploring emerging technologies to stay at the forefront
                of software development.
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Grid container spacing={2}>
              {HIGHLIGHTS.map((item, index) => (
                <Grid size={{ xs: 6 }} key={item.title}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      height: "100%",
                      textAlign: "center",
                      border: 1,
                      borderColor: "divider",
                      background: "rgba(15, 15, 26, 0.6)",
                      backdropFilter: "blur(10px)",
                      opacity: isInView ? 1 : 0,
                      transform: isInView ? "translateY(0)" : "translateY(30px)",
                      transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`,
                      "&:hover": {
                        borderColor: "primary.main",
                        background: "rgba(99, 102, 241, 0.06)",
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    <Box sx={{ color: "primary.light", mb: 1.5, "& svg": { fontSize: 32 } }}>
                      {item.icon}
                    </Box>
                    <Typography variant="subtitle2" sx={{ color: "text.primary", mb: 0.5 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      {item.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
