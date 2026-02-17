import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import SectionTitle from "./SectionTitle";
import { useInView } from "../hooks/useInView";
import type { ReactNode } from "react";

interface ContactItem {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}

const CONTACT_INFO: ContactItem[] = [
  {
    icon: <LocationOnIcon />,
    label: "Location",
    value: "Houston, TX",
  },
];

const SOCIAL_LINKS = [
  {
    icon: <LinkedInIcon />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/lnandanapalli/",
  },
  {
    icon: <GitHubIcon />,
    label: "GitHub",
    href: "https://github.com/lnandanapalli",
  },
];

export default function Contact() {
  const { ref, isInView } = useInView();

  return (
    <Box id="contact" sx={{ py: { xs: 10, md: 14 } }}>
      <Container maxWidth="md">
        <SectionTitle title="Get In Touch" subtitle="Let's connect and build something great" />

        <Box ref={ref}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              border: 1,
              borderColor: "divider",
              background: "rgba(15, 15, 26, 0.5)",
              backdropFilter: "blur(10px)",
              textAlign: "center",
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", mb: 5, maxWidth: 500, mx: "auto", fontSize: "1.05rem" }}
            >
              I'm always open to new opportunities, collaborations, and interesting conversations.
              Feel free to reach out!
            </Typography>

            <Grid container spacing={3} sx={{ mb: 5, justifyContent: "center" }}>
              {CONTACT_INFO.map((item, index) => (
                <Grid size={{ xs: 12, sm: 4 }} key={item.label}>
                  <Box
                    component={item.href ? "a" : "div"}
                    href={item.href}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1.5,
                      textDecoration: "none",
                      color: "inherit",
                      opacity: isInView ? 1 : 0,
                      transform: isInView ? "translateY(0)" : "translateY(20px)",
                      transition: `all 0.6s ease ${0.2 + index * 0.15}s`,
                      "&:hover .contact-icon": {
                        background: "rgba(99, 102, 241, 0.15)",
                        borderColor: "primary.main",
                        transform: "translateY(-3px)",
                      },
                    }}
                  >
                    <Box
                      className="contact-icon"
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        border: 1,
                        borderColor: "divider",
                        background: "rgba(99, 102, 241, 0.06)",
                        color: "primary.light",
                        display: "flex",
                        transition: "all 0.3s ease",
                        "& svg": { fontSize: 28 },
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                        {item.label}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {item.value}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              {SOCIAL_LINKS.map((link) => (
                <Button
                  key={link.label}
                  variant="outlined"
                  startIcon={link.icon}
                  component="a"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    borderColor: "rgba(99, 102, 241, 0.3)",
                    color: "text.secondary",
                    px: 3,
                    "&:hover": {
                      borderColor: "primary.main",
                      color: "primary.light",
                      background: "rgba(99, 102, 241, 0.08)",
                    },
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
