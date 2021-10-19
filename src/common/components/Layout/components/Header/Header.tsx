import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(
  theme => ({
    backArrow: {
      fontSize: 30
    },
    menuButton: {
      flex: "0 0 auto",
      marginLeft: -theme.spacing(2),
      marginRight: theme.spacing(),
      marginTop: -theme.spacing(2)
    },
    root: {
      "&:hover": {
        color: theme.typography.body1.color
      },
      position: "fixed",
      height: "40px",
      width: "100%",
      top: 0,
      alignItems: "center",
      color: theme.palette.grey[500],
      cursor: "pointer",
      display: "flex",
      transition: theme.transitions.duration.standard + "ms",
      [theme.breakpoints.down("sm")]: {
        // margin: theme.spacing(4, 0, 0, 0)
      }
    },
    skeleton: {
      marginBottom: theme.spacing(2),
      width: "10rem"
    },
    title: {
      color: "inherit",
      flex: 1,
      marginLeft: theme.spacing(),
      textTransform: "uppercase"
    }
  }),
  { name: "Header" }
);

const Header = props => {
  const { children } = props;

  const classes = useStyles(props);

  return <div className={classes.root}>{children}</div>;
};
export default Header;
