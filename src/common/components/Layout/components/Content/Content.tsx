import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import React from "react";

const useStyles = makeStyles(
  theme => ({
    root: {
      [theme.breakpoints.up("lg")]: {
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: theme.breakpoints.width("lg")
      },
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(0, 3)
      },
      padding: theme.spacing(0, 1)
    }
  }),
  {
    name: "Content"
  }
);

interface ContentProps {
  className?: string;
}

export const Content: React.FC<ContentProps> = props => {
  const { className, ...rest } = props;

  const classes = useStyles(props);

  return <div className={classNames(classes.root, className)} {...rest} />;
};
Content.displayName = "Content";
export default Content;
