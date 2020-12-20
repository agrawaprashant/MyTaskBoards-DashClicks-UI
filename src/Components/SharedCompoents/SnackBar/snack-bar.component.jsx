import React from "react";
import classes from "./snack-bar.module.css";

function SnackBar({ text, show }) {
  const snackbarClasses = [classes.Snackbar];
  if (show) snackbarClasses.push(classes.Show);
  return <div className={snackbarClasses.join(" ")}>{text}</div>;
}

export default SnackBar;
