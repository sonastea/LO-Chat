import { Box, Button, Grid, Typography } from "@mui/material";
import herobg from "../../public/images/hero-bg.jpg";

const hero = {
  title: "LO:Chat",
  description:
    "A simple messaging web app implemented in typescript using the react framework nextjs and react component library material-ui.",
  img: "/images/hero-bg.jpg",
  action: {
    text: "Try LO:Chat",
    href: "/chat",
  },
};

const Hero = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        minHeight: "600px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        spacing={6}
        sx={{
          display: "flex",
          alignItems: "center",
          maxWidth: "1280px",
          padding: "50px",
        }}
      >
        <Grid item xs={12} md={7}>
          <Typography
            variant="h3"
            fontWeight={700}
            sx={{ paddingBottom: "15px" }}
            color="primary"
          >
            {hero.title}
          </Typography>
          <Typography
            variant="h6"
            sx={{ opacity: "0.5", paddingBottom: "30px" }}
          >
            {hero.description}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: "180px",
              fontSize: "16px",
              display: { xs: "flex", sm: "block" },
              marginLeft: { xs: "auto", sm: "initial" },
              marginRight: { xs: "auto", sm: "initial" },
              textAlign: "center",
            }}
            href={hero.action.href}
            aria-label={hero.action.text}
          >
            Try LO:Chat
          </Button>
        </Grid>
        <Grid item xs={12} md={5}>
          <picture>
            <img
              src={herobg.src}
              alt=""
              style={{
                maxWidth: "100%",
              }}
            />
          </picture>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;
