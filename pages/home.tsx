import BrushIcon from "@mui/icons-material/Brush";
import CodeIcon from "@mui/icons-material/Code";
import WebIcon from "@mui/icons-material/Web";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import React from "react";

interface IHeroCard {
  icon: React.JSX.Element;
  text: string;
}

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

const Home = () => {
  const cards: IHeroCard[] = [
    {
      icon: <CodeIcon sx={{ fontSize: 96 }} color="primary" />,
      text: "Typescript React",
    },
    {
      icon: <WebIcon sx={{ fontSize: 96 }} color="primary" />,
      text: "NextJS",
    },
    {
      icon: <BrushIcon sx={{ fontSize: 96 }} color="primary" />,
      text: "Material-UI",
    },
  ];
  return (
    <div>
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
          <Grid size={{ xs: 12, md: 7 }}>
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
          <Grid size={{ xs: 12, md: 5 }}>
            <Image
              style={{ objectFit: "cover", width: "100%", height: "auto" }}
              alt="Hero background"
              src={`/images/hero-bg.jpg`}
              width={600}
              height={400}
              priority={true}
              placeholder="blur"
              blurDataURL="/images/hero-bg.jpg"
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1, minHeight: "360px" }}>
        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            minHeight: "540px",
          }}
        >
          {cards.map((card, index) => (
            <Grid
              size={{ xs: 12, md: 3.7 }}
              minHeight={300}
              key={index}
              sx={{
                backgroundColor: "#f3f3f3",
                textAlign: "center",
                padding: "30px",
                width: "200px",
                borderRadius: "10px",
                margin: "10px !important",
              }}
            >
              {card.icon}
              <Typography>{card.text}</Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Home;
