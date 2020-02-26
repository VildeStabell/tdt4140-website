import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  media: {
    height: 140
  }
});

export default function SaleItem({ productID, title, price, image }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea component={Link} to={`/product/${productID}`}>
        <CardMedia
          className={classes.media}
          image={image}
          title="Sofa til salgs"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="primary" component="p">
            {price},-
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
