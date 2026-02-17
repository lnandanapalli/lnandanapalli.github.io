import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const SOCIAL_LINKS = [
  { icon: <LinkedInIcon fontSize="small" />, href: "https://www.linkedin.com/in/lnandanapalli/" },
  { icon: <GitHubIcon fontSize="small" />, href: "https://github.com/lnandanapalli" },
];

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Divider sx={{ mb: 4, borderColor: "divider" }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {new Date().getFullYear()} Lokeshwar Reddy Nandanapalli.
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            {SOCIAL_LINKS.map((link) => (
              <IconButton
                key={link.href}
                component="a"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{
                  color: "text.secondary",
                  "&:hover": { color: "primary.light" },
                }}
              >
                {link.icon}
              </IconButton>
            ))}
            <IconButton
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              size="small"
              sx={{
                ml: 1,
                color: "text.secondary",
                border: 1,
                borderColor: "divider",
                "&:hover": {
                  color: "primary.light",
                  borderColor: "primary.main",
                },
              }}
            >
              <KeyboardArrowUpIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
