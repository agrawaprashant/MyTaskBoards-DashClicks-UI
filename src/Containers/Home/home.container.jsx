import React from "react";
import AddUserButton from "../../Components/AddUser/add-user.component";
import UserBoardsContainer from "../UserBoards/user-boards.container";
import classes from "./home.module.css";

function HomeContainer() {
  return (
    <div className={classes.Home}>
      <div className={classes.Header}>
        <p>My Task Boards</p>
      </div>
      <div className={classes.AddUserButtonArea}>
        <AddUserButton />
      </div>
      <div className={classes.UserBoardsArea}>
        <UserBoardsContainer />
      </div>
    </div>
  );
}

export default HomeContainer;
