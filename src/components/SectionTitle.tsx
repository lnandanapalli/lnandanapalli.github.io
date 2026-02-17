import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useInView } from "../hooks/useInView";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  const { ref, isInView } = useInView();

  return (
    <Box
      ref={ref}
      sx={{
        textAlign: "center",
        mb: { xs: 6, md: 8 },
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <Typography
        variant="h3"
        component="h2"
        sx={{
          fontSize: { xs: "1.8rem", md: "2.5rem" },
          background: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 1,
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
          {subtitle}
        </Typography>
      )}
      <Box
        sx={{
          width: isInView ? 60 : 0,
          height: 3,
          background: "linear-gradient(90deg, #6366f1, #06b6d4)",
          borderRadius: 2,
          mx: "auto",
          mt: 2,
          transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s",
        }}
      />
    </Box>
  );
}
