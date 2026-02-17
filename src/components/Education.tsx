import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import SchoolIcon from "@mui/icons-material/School";
import SectionTitle from "./SectionTitle";
import { useInView } from "../hooks/useInView";

interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
}

const EDUCATION: EducationItem[] = [
  {
    degree: "Master of Science in Computer Science",
    institution: "University of Houston",
    location: "Houston, TX",
    period: "Aug 2023 – May 2025",
  },
  {
    degree: "Bachelor of Engineering in Computer Science",
    institution: "Saveetha Engineering College",
    location: "Chennai, India",
    period: "Jun 2018 – May 2022",
  },
];

export default function Education() {
  const { ref, isInView } = useInView();

  return (
    <Box id="education" sx={{ py: { xs: 10, md: 14 }, background: "rgba(15, 15, 26, 0.3)" }}>
      <Container maxWidth="md">
        <SectionTitle title="Education" subtitle="Academic background and qualifications" />
        <Grid container spacing={3} ref={ref}>
          {EDUCATION.map((edu, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={edu.institution}>
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
                  transform: isInView ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.2}s`,
                  "&:hover": {
                    borderColor: "primary.dark",
                    transform: "translateY(-4px)",
                    "& .edu-accent": { width: "100%" },
                  },
                }}
              >
                <Box
                  className="edu-accent"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "30%",
                    height: 2,
                    background: "linear-gradient(90deg, #6366f1, #06b6d4)",
                    transition: "width 0.5s ease",
                  }}
                />
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      background: "rgba(99, 102, 241, 0.1)",
                      color: "primary.light",
                      display: "flex",
                      flexShrink: 0,
                    }}
                  >
                    <SchoolIcon />
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ fontSize: { xs: "1rem", md: "1.1rem" }, mb: 0.5 }}
                    >
                      {edu.degree}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "primary.light", fontWeight: 500, mb: 0.5 }}
                    >
                      {edu.institution}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {edu.location} · {edu.period}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
