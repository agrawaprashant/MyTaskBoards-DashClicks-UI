import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserBoard from "../../Components/UserBoard/user-board.component";
import * as actions from "../../Store/Actions/actions";
import classes from "./user-boards.module.css";
import { DragDropContext } from "react-beautiful-dnd";
import Spinner from "../../Components/SharedCompoents/HomeSpinner/home-spinner.component";

function UserBoardsContainer() {
  const dispatch = useDispatch();
  const boards = useSelector((state) => {
    return state.board;
  });
  useEffect(() => {
    dispatch(actions.fetchUserBoards());
  }, [dispatch]);

  const dragEndHandler = (result) => {
    console.log(result);
    const { source, destination, draggableId } = result;
    if (destination && destination.droppableId !== source.droppableId) {
      handleTransferTask(
        source.droppableId,
        destination.droppableId,
        draggableId
      );
    }
  };

  const handleTransferTask = (source, destination, taskId) => {
    dispatch(actions.transferTask(taskId, destination, source));
  };
  return (
    <DragDropContext onDragEnd={dragEndHandler}>
      {boards.userBoards.length === 0 ? (
        <Spinner />
      ) : (
        <div className={classes.UserBoardsContainer}>
          {boards.userBoards.map((board) => {
            return (
              <UserBoard
                key={board._id}
                id={board._id}
                name={board.name}
                taskList={board.taskList}
              />
            );
          })}
        </div>
      )}
    </DragDropContext>
  );
}

export default UserBoardsContainer;
