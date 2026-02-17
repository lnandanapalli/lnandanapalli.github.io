import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TypeWriter from "./TypeWriter";

const SOCIAL_LINKS = [
  { icon: <LinkedInIcon />, label: "LinkedIn", href: "https://www.linkedin.com/in/lnandanapalli/" },
  { icon: <GitHubIcon />, label: "GitHub", href: "https://github.com/lnandanapalli" },
];

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background orbs */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: { xs: 300, md: 500 },
          height: { xs: 300, md: 500 },
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "float1 8s ease-in-out infinite",
          "@keyframes float1": {
            "0%, 100%": { transform: "translate(0, 0)" },
            "50%": { transform: "translate(30px, -30px)" },
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: { xs: 250, md: 400 },
          height: { xs: 250, md: 400 },
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "float2 10s ease-in-out infinite",
          "@keyframes float2": {
            "0%, 100%": { transform: "translate(0, 0)" },
            "50%": { transform: "translate(-40px, 20px)" },
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          right: "20%",
          width: { xs: 150, md: 250 },
          height: { xs: 150, md: 250 },
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
          animation: "float3 12s ease-in-out infinite",
          "@keyframes float3": {
            "0%, 100%": { transform: "translate(0, 0) scale(1)" },
            "33%": { transform: "translate(20px, -20px) scale(1.1)" },
            "66%": { transform: "translate(-10px, 15px) scale(0.95)" },
          },
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            animation: "fadeInUp 1s ease-out",
            "@keyframes fadeInUp": {
              from: { opacity: 0, transform: "translateY(40px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "primary.light",
              fontWeight: 500,
              mb: 2,
              fontSize: { xs: "1rem", md: "1.15rem" },
              letterSpacing: 1,
            }}
          >
            Hello, I'm
          </Typography>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
              fontWeight: 800,
              background: "linear-gradient(135deg, #e2e8f0 0%, #6366f1 50%, #06b6d4 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
              lineHeight: 1.1,
            }}
          >
            Lokeshwar Reddy
          </Typography>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
              fontWeight: 800,
              color: "text.primary",
              mb: 3,
              lineHeight: 1.1,
            }}
          >
            Nandanapalli
          </Typography>

          <Box sx={{ mb: 4, minHeight: { xs: 40, md: 50 } }}>
            <TypeWriter
              strings={[
                "Software Engineer",
                "Full-Stack Developer",
                "Cloud & AI Enthusiast",
              ]}
              variant="h4"
              sx={{
                color: "text.secondary",
                fontSize: { xs: "1.2rem", md: "1.8rem" },
                fontWeight: 400,
              }}
            />
          </Box>

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              maxWidth: 580,
              mb: 5,
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              lineHeight: 1.8,
            }}
          >
            Building robust, scalable web applications with modern technologies.
            Passionate about clean code, great user experiences, and AI-driven solutions.
          </Typography>

          <Stack direction="row" spacing={1.5} sx={{ mb: 4 }}>
            {SOCIAL_LINKS.map((link) => (
              <Tooltip key={link.label} title={link.label} arrow>
                <IconButton
                  component="a"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "text.secondary",
                    border: 1,
                    borderColor: "rgba(99, 102, 241, 0.3)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "primary.light",
                      borderColor: "primary.main",
                      background: "rgba(99, 102, 241, 0.1)",
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  {link.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Stack>
        </Box>
      </Container>

      {/* Scroll indicator */}
      <Box
        sx={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          animation: "bounce 2s infinite",
          "@keyframes bounce": {
            "0%, 20%, 50%, 80%, 100%": { transform: "translateX(-50%) translateY(0)" },
            "40%": { transform: "translateX(-50%) translateY(-12px)" },
            "60%": { transform: "translateX(-50%) translateY(-6px)" },
          },
        }}
      >
        <IconButton
          onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
          sx={{ color: "text.secondary", opacity: 0.5, "&:hover": { opacity: 1 } }}
        >
          <KeyboardArrowDownIcon fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
}
