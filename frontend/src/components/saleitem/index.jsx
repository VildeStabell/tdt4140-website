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

export default function SaleItem({ productID }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea component={Link} to={`/product/${productID}`}>
        <CardMedia
          className={classes.media}
          image="https://www.ikea.com/no/no/images/products/landskrona-3-seat-sofa-gunnared-dark-grey-metal__0602115_PE680184_S5.JPG?f=s"
          title="Sofa til salgs"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Sofa til salgs
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            499,-
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
