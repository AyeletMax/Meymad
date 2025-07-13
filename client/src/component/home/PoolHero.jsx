import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function PoolHero() {
  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        margin: 0,
        padding: 0,
      }}
    >
      <img
        src="/img/pool-bg.JPG"
        alt="בריכה"
        style={{
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          display: "block",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            mb: 3,
            fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem", lg: "5rem" },
            textShadow: "3px 3px 10px rgba(0,0,0,0.7)",
            lineHeight: 1.1,
            color: "#fff",
          }}
        >
          בריכה פרטית – הזמנת תור אונליין
        </Typography>
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: 400,
            fontSize: { xs: "1.1rem", sm: "1.5rem", md: "1.8rem", lg: "2rem" },
            opacity: 0.95,
            textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
            color: "#fff",
          }}
        >
          מזמינים תור לבריכה, מגיעים בשעה שנקבעה, משלמים במקום ונהנים מחוויה מרעננת!
          <br />
          הבריכה מחכה לכם – פרטיות, ניקיון, ושקט.
        </Typography>
        <Button
          component={Link}
          to="/newOrder"
          variant="contained"
          size="large"
          sx={{
            bgcolor: "#66bb6a",
            color: "white",
            px: { xs: 4, sm: 6 },
            py: { xs: 2, sm: 3 },
            fontSize: { xs: "1.1rem", sm: "1.4rem" },
            borderRadius: "50px",
            fontWeight: 700,
            boxShadow: 4,
            mt: 2,
            pointerEvents: "auto",
          }}
        >
          הזמינו תור לבריכה ←
        </Button>
      </Box>
    </Box>
  );
}