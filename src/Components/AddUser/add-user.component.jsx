import React, { useState, useEffect } from "react";
import classes from "./add-user.module.css";
import { useDispatch } from "react-redux";
import Modal from "../SharedCompoents/Modal/modal.component";
import SmallSpinner from "../SharedCompoents/SmallSpinner/small-spinner.component";
import * as actions from "../../Store/Actions/actions";
import SnackBar from "../SharedCompoents/SnackBar/snack-bar.component";

function AddUserButton() {
  const [showAddBoardModal, setShowAddBoardModal] = useState(false);
  const [boardTitle, setBoardTitle] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowSnackbar(false);
    }, 2000);
  }, [showSnackbar]);

  const dispatch = useDispatch();
  const addBoardCallback = () => {
    setShowSpinner(false);
    setShowAddBoardModal(false);
    setBoardTitle("");
    setShowSnackbar(true);
  };
  const addBoardClickHandler = () => {
    setShowSpinner(true);
    dispatch(actions.addBoard(boardTitle, addBoardCallback));
  };
  return (
    <>
      <button
        onClick={() => setShowAddBoardModal(true)}
        className={classes.AddUserButton}
      >
        {/* <i className="material-icons">add</i> */}
        <i class="fas fa-plus fa-2x"></i>
      </button>
      {showAddBoardModal && (
        <Modal
          show={showAddBoardModal}
          modalClosed={() => {
            setShowAddBoardModal(false);
          }}
        >
          <div className={classes.AddTaskModal}>
            <div className={classes.AddTaskModalHeader}>
              <h5>{`Add User Board`} </h5>
            </div>
            <div className={classes.AddTaskModalBody}>
              <p>Please enter the user board title and click on Add Board.</p>
              <div className={classes.AddTaskControls}>
                <input
                  onChange={(e) => setBoardTitle(e.target.value)}
                  value={boardTitle}
                  type="text"
                  placeholder="Board Title"
                />
                <button onClick={addBoardClickHandler}>
                  {showSpinner ? <SmallSpinner /> : "Add Board"}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
      {<SnackBar text="Board added!" show={showSnackbar} />}
    </>
  );
}

export default AddUserButton;
