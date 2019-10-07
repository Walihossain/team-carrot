import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles(theme => ({
  root: {
    "& > span": {
      margin: theme.spacing(2)
    }
  },
  iconHover: {
    "&:hover": {
      color: red[800]
    }
  }
}));

export default function Icons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Icon color="secondary" fontSize="large">
        add_circle
      </Icon>
    </div>
  );
}
