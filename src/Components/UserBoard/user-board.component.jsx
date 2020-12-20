import React, { useState, useEffect } from "react";
import TaskListContainer from "../../Containers/TaskList/task-list.container";
import Modal from "../SharedCompoents/Modal/modal.component";
import classes from "./user-board.module.css";
import { useDispatch } from "react-redux";
import * as actions from "../../Store/Actions/actions";
import SmallSpinner from "../SharedCompoents/SmallSpinner/small-spinner.component";
import SnackBar from "../SharedCompoents/SnackBar/snack-bar.component";

function UserBoard({ id, name, taskList }) {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [boardTitle, setBoardTitle] = useState(name);
  const [showBoardTitleEdit, setShowBoardTitleEdit] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setShowSnackbar(false);
    }, 2000);
  }, [showSnackbar]);
  const dispatch = useDispatch();

  const taskAddSuccessHandler = () => {
    setShowAddTaskModal(false);
    setShowSpinner(false);
    setTaskTitle("");
    setSnackbarText("Task added!");
    setShowSnackbar(true);
  };

  const taskAddClickHandler = () => {
    setShowSpinner(true);
    dispatch(actions.addTask(taskTitle, id, taskAddSuccessHandler));
  };

  const confirmClickHandler = () => {
    setShowSpinner(true);
    dispatch(actions.deleteBoard(id));
  };

  const boardTitleChangeCallback = () => {
    setShowBoardTitleEdit(false);
    setSnackbarText("Board title changed!");
    setShowSnackbar(true);
  };

  const boardTitleChangeHandler = () => {
    dispatch(actions.editBoard(id, boardTitle, boardTitleChangeCallback));
  };
  return (
    <>
      <div className={classes.UserBoard}>
        <div className={classes.UserBoardHeader}>
          {showBoardTitleEdit ? (
            <div className={classes.EditBoardTitle}>
              <input
                value={boardTitle}
                onChange={(e) => setBoardTitle(e.target.value)}
              />{" "}
              <button onClick={() => boardTitleChangeHandler()}>
                <i class="fas fa-check"></i>
              </button>
              <button onClick={() => setShowBoardTitleEdit(false)}>
                <i class="fas fa-times"></i>
              </button>{" "}
            </div>
          ) : (
            <p
              style={{ cursor: "pointer" }}
              onClick={() => setShowBoardTitleEdit(true)}
            >
              {name}
            </p>
          )}
          {!showBoardTitleEdit && (
            <button
              onClick={() => setShowDeleteUserModal(true)}
              className={classes.UserDeleteBtn}
            >
              <i className="material-icons">close</i>
            </button>
          )}
        </div>
        <div className={classes.TaskList}>
          <TaskListContainer id={id} taskList={taskList} />
        </div>
        <div className={classes.UserBoardFooter}>
          <button
            onClick={() => setShowAddTaskModal(true)}
            className="material-icons"
          >
            add
          </button>
        </div>
      </div>
      {showAddTaskModal && (
        <Modal
          show={showAddTaskModal}
          modalClosed={() => setShowAddTaskModal(false)}
        >
          <div className={classes.AddTaskModal}>
            <div className={classes.AddTaskModalHeader}>
              <h5>{`Add task for ${name}`} </h5>
            </div>
            <div className={classes.AddTaskModalBody}>
              <p>Please enter the task title and click on Add Task.</p>
              <div className={classes.AddTaskControls}>
                <input
                  onChange={(e) => setTaskTitle(e.target.value)}
                  value={taskTitle}
                  type="text"
                  placeholder="Task title"
                />
                <button onClick={taskAddClickHandler}>
                  {showSpinner ? <SmallSpinner /> : "Add Task"}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
      {showDeleteUserModal && (
        <Modal
          show={showDeleteUserModal}
          modalClosed={() => setShowDeleteUserModal(false)}
        >
          <div className={classes.AddTaskModal}>
            <div className={classes.AddTaskModalHeader}>
              <h5>Delete User Confirmation </h5>
            </div>
            <div className={classes.AddTaskModalBody}>
              <p>{`Do you really want to delete ${name} ?`}</p>
              <div className={classes.DeleteUserConfirmControls}>
                <button
                  onClick={confirmClickHandler}
                  className={classes.ConfirmBtn}
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowDeleteUserModal(false)}
                  className={classes.CancelBtn}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
      {<SnackBar text={snackbarText} show={showSnackbar} />}
    </>
  );
}

export default UserBoard;
