import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useScrolled } from "../hooks/useScrolled";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const scrolled = useScrolled();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setDrawerOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: scrolled
            ? "rgba(3, 0, 20, 0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? 1 : 0,
          borderColor: "divider",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <Toolbar sx={{ maxWidth: 1200, width: "100%", mx: "auto", px: { xs: 2, md: 3 } }}>
          <Typography
            variant="h6"
            component="a"
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            sx={{
              flexGrow: 1,
              fontWeight: 800,
              fontSize: "1.3rem",
              background: "linear-gradient(135deg, #6366f1, #06b6d4)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            {"<LN />"}
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5 }}>
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                sx={{
                  color: "text.secondary",
                  fontSize: "0.9rem",
                  px: 2,
                  "&:hover": {
                    color: "primary.light",
                    background: "rgba(99, 102, 241, 0.08)",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { md: "none" }, color: "text.primary" }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            background: "rgba(3, 0, 20, 0.95)",
            backdropFilter: "blur(20px)",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: "text.primary" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List sx={{ px: 2 }}>
          {NAV_ITEMS.map((item) => (
            <ListItemButton
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                "&:hover": {
                  background: "rgba(99, 102, 241, 0.1)",
                },
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontWeight: 500 }}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
}
