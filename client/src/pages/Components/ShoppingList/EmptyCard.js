import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FontAwesome from "./Icon";

const useStyles = makeStyles({
  card: {
    width: 300,
    height: 350,
    margin: 10,
    padding: 10,
    textAlign: "center",
    boxShadow: "5px 5px 10px #cecece"
  },
  button: {
    position: "relative",
    top: 100
  }
});

export default function EmptyCard() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      {" "}
      <CardContent className={classes.button}>
        <FontAwesome></FontAwesome>
        <Typography gutterBottom variant="h5" component="h2">
          Add
        </Typography>
      </CardContent>
    </Card>
  );
}