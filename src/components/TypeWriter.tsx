import { useState, useEffect, useCallback } from "react";
import Typography, { type TypographyProps } from "@mui/material/Typography";

interface TypeWriterProps extends Omit<TypographyProps, "children"> {
  strings: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
}

export default function TypeWriter({
  strings,
  typeSpeed = 80,
  deleteSpeed = 50,
  pauseDuration = 2000,
  ...typographyProps
}: TypeWriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [stringIndex, setStringIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const current = strings[stringIndex];

    if (!isDeleting) {
      setDisplayText(current.substring(0, displayText.length + 1));
      if (displayText.length === current.length) {
        setTimeout(() => setIsDeleting(true), pauseDuration);
        return;
      }
    } else {
      setDisplayText(current.substring(0, displayText.length - 1));
      if (displayText.length === 0) {
        setIsDeleting(false);
        setStringIndex((prev) => (prev + 1) % strings.length);
        return;
      }
    }
  }, [displayText, isDeleting, stringIndex, strings, pauseDuration]);

  useEffect(() => {
    const speed = isDeleting ? deleteSpeed : typeSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, typeSpeed, deleteSpeed]);

  return (
    <Typography {...typographyProps}>
      {displayText}
      <Typography
        component="span"
        sx={{
          borderRight: "3px solid",
          borderColor: "primary.main",
          ml: 0.5,
          animation: "blink 1s step-end infinite",
          "@keyframes blink": {
            "0%, 100%": { opacity: 1 },
            "50%": { opacity: 0 },
          },
        }}
      />
    </Typography>
  );
}
