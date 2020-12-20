import React, { useState, useEffect } from "react";
import classes from "./task.module.css";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import * as actions from "../../Store/Actions/actions";
import Modal from "../SharedCompoents/Modal/modal.component";
import SmallSpinner from "../SharedCompoents/SmallSpinner/small-spinner.component";
import SnackBar from "../SharedCompoents/SnackBar/snack-bar.component";

function Task({ taskName, id, index, boardId }) {
  const [showEditBtn, setShowEditBtn] = useState(false);
  const [showTaskDeleteModal, setShowTaskDeleteModal] = useState(false);
  const [showEditTaskInput, setEditTaskInput] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState(taskName);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setShowSnackbar(false);
    }, 2000);
  }, [showSnackbar]);

  const dispatch = useDispatch();
  const taskStyles = [classes.Task];

  const taskEditCallback = () => {
    setEditTaskInput(false);
    setShowSpinner(false);
    setSnackbarText("Task edited!");
    setShowSnackbar(true);
  };

  const taskTitleChangeHandler = () => {
    setShowSpinner(true);
    dispatch(actions.editTask(id, boardId, newTaskTitle, taskEditCallback));
  };

  const confirmClickHandler = () => {
    setShowSpinner(true);
    dispatch(actions.deleteTask(id, boardId));
  };

  return (
    <>
      <Draggable key={id} draggableId={id} index={index}>
        {(provided, snapshot) => {
          const { isDragging } = snapshot;
          if (isDragging) taskStyles.push(classes.TaskDragging);
          return (
            <div
              onMouseEnter={() => !showEditTaskInput && setShowEditBtn(true)}
              onMouseLeave={() => setShowEditBtn(false)}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              className={taskStyles.join(" ")}
            >
              {showEditTaskInput ? (
                <div className={classes.EditTaskField}>
                  <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                  />
                  <button onClick={() => taskTitleChangeHandler()}>
                    <i class="fas fa-check"></i>
                  </button>
                  <button onClick={() => setEditTaskInput(false)}>
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              ) : (
                <p>{taskName}</p>
              )}
              {showEditBtn && (
                <div className={classes.EditTask}>
                  <button
                    onClick={() => {
                      setEditTaskInput(true);
                      setShowEditBtn(false);
                    }}
                    className={classes.EditBtn}
                  >
                    <i class="fas fa-pen"></i>
                  </button>
                  <button
                    onClick={() => setShowTaskDeleteModal(true)}
                    className={classes.EditBtn}
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              )}
            </div>
          );
        }}
      </Draggable>
      {showTaskDeleteModal && (
        <Modal
          show={showTaskDeleteModal}
          modalClosed={() => setShowTaskDeleteModal(false)}
        >
          <div className={classes.DeleteTaskModal}>
            <div className={classes.DeleteTaskModalHeader}>
              <h5>Delete Task Confirmation </h5>
            </div>
            <div className={classes.DeleteTaskModalBody}>
              <p>{`Do you really want to delete task ?`}</p>
              <div className={classes.DeleteTaskConfirmControls}>
                <button
                  onClick={confirmClickHandler}
                  className={classes.ConfirmBtn}
                >
                  {showSpinner ? <SmallSpinner /> : "Confirm"}
                </button>
                <button
                  onClick={() => setShowTaskDeleteModal(false)}
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

export default Task;
