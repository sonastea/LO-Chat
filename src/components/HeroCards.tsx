import { Box, Grid, Typography } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import WebIcon from "@mui/icons-material/Web";
import BrushIcon from "@mui/icons-material/Brush";

interface IHeroCard {
  icon: JSX.Element;
  text: string;
}

const HeroCards = () => {
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
            item
            xs={12}
            md={3.75}
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
  );
};

export default HeroCards;
