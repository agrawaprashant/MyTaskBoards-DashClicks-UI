import * as actionTypes from "./actionTypes";
import axios from "axios";

const fetchUserBoardsStart = () => {
  return {
    type: actionTypes.FETCH_USER_BOARDS_START,
  };
};

const fetchUserBoardSuccess = (boards) => {
  return {
    type: actionTypes.FETCH_USER_BOARDS_SUCCESS,
    payload: {
      boards,
    },
  };
};

const fetchUserBoardFailed = (err) => {
  return {
    type: actionTypes.FETCH_USER_BOARDS_FAIL,
    payload: {
      err,
    },
  };
};

export const fetchUserBoards = () => {
  console.log("fetching boards..");
  return async (dispatch) => {
    try {
      dispatch(fetchUserBoardsStart());
      const response = await axios.get("http://localhost:5000/api/user");
      console.log(response);
      dispatch(fetchUserBoardSuccess(response.data));
    } catch (err) {
      console.log(err);
      dispatch(fetchUserBoardFailed(err.message));
    }
  };
};

const addTaskStart = () => {
  return {
    type: actionTypes.ADD_TASK_START,
  };
};
const addTaskSuccess = (task, userId) => {
  return {
    type: actionTypes.ADD_TASK_SUCCESS,
    payload: {
      task,
      userId,
    },
  };
};
const addTaskFailed = (error) => {
  return {
    type: actionTypes.ADD_TASK_FAIL,
    payload: {
      error,
    },
  };
};

export const addTask = (taskName, userId, callback) => {
  return async (dispatch) => {
    try {
      dispatch(addTaskStart());
      const taskData = {
        taskName,
        userId,
      };
      const response = await axios.post(
        "http://localhost:5000/api/task/add",
        taskData
      );
      callback && typeof callback === "function" && callback();
      dispatch(addTaskSuccess(response.data, userId));
    } catch (err) {
      console.log(err);
      dispatch(addTaskFailed(err));
    }
  };
};

const deleteBoardStart = () => {
  return {
    type: actionTypes.DELETE_BOARD_START,
  };
};
const deleteBoardSuccess = (id) => {
  return {
    type: actionTypes.DELETE_BOARD_SUCCESS,
    payload: {
      id,
    },
  };
};
const deleteBoardFailed = (error) => {
  return {
    type: actionTypes.DELETE_BOARD_FAIL,
    payload: {
      error,
    },
  };
};

export const deleteBoard = (id, callback) => {
  return async (dispatch) => {
    try {
      dispatch(deleteBoardStart());
      await axios.put(`http://localhost:5000/api/user/delete/${id}`);
      dispatch(deleteBoardSuccess(id));
      callback && typeof callback === "function" && callback();
    } catch (err) {
      console.log(err);
      dispatch(deleteBoardFailed(err));
    }
  };
};

const addBoardStart = () => {
  return {
    type: actionTypes.ADD_BOARD_START,
  };
};
const addBoardSuccess = (board) => {
  return {
    type: actionTypes.ADD_BOARD_SUCCESS,
    payload: {
      board,
    },
  };
};
const addBoardFailed = (error) => {
  return {
    type: actionTypes.ADD_BOARD_FAIL,
    payload: { error },
  };
};

export const addBoard = (name, callback) => {
  return async (dispatch) => {
    try {
      const boardData = {
        name,
      };
      dispatch(addBoardStart());
      const response = await axios.post(
        "http://localhost:5000/api/user/add",
        boardData
      );
      dispatch(addBoardSuccess(response.data));
      callback && typeof callback === "function" && callback();
    } catch (err) {
      console.log(err);
      dispatch(addBoardFailed(err));
    }
  };
};

const deleteTaskStart = () => {
  return {
    type: actionTypes.DELETE_TASK_START,
  };
};
const deleteTaskSuccess = (taskId, userId) => {
  return {
    type: actionTypes.DELETE_TASK_SUCCESS,
    payload: {
      taskId,
      userId,
    },
  };
};
const deleteTaskFailed = (error) => {
  return {
    type: actionTypes.DELETE_TASK_FAIL,
    payload: {
      error,
    },
  };
};

export const deleteTask = (taskId, userId, callback) => {
  return async (dispatch) => {
    try {
      dispatch(deleteTaskStart());
      await axios.put(`http://localhost:5000/api/task/delete/${taskId}`);
      callback && typeof callback === "function" && callback();
      dispatch(deleteTaskSuccess(taskId, userId));
    } catch (err) {
      console.log(err);
      dispatch(deleteTaskFailed(err));
    }
  };
};

//transfer task

const transferTaskStart = (taskId, newOwner, oldOwner) => {
  return {
    type: actionTypes.TRANSFER_TASK_START,
    payload: {
      taskId,
      newOwner,
      oldOwner,
    },
  };
};
const transferTaskSuccess = (taskId, newOwner, oldOwner) => {
  return {
    type: actionTypes.TRANSFER_TASK_SUCCESS,
    payload: {
      taskId,
      newOwner,
      oldOwner,
    },
  };
};
const transferTaskFailed = (error) => {
  return {
    type: actionTypes.TRANSFER_TASK_FAIL,
    payload: {
      error,
    },
  };
};

export const transferTask = (taskId, newOwner, oldOwner, callback) => {
  return async (dispatch) => {
    try {
      const transferTaskData = { newOwner };
      dispatch(transferTaskStart(taskId, newOwner, oldOwner));
      await axios.put(
        `http://localhost:5000/api/task/transfer/${taskId}`,
        transferTaskData
      );
      callback && typeof callback === "function" && callback();
      dispatch(transferTaskSuccess(taskId, newOwner, oldOwner));
    } catch (err) {
      console.log(err);
      dispatch(transferTaskFailed(err));
    }
  };
};

const editTaskStart = () => {
  return {
    type: actionTypes.EDIT_TASK_START,
  };
};
const editTaskSuccess = (task, ownerId) => {
  return {
    type: actionTypes.EDIT_TASK_SUCCESS,
    payload: {
      task,
      ownerId,
    },
  };
};
const editTaskFailed = (error) => {
  return {
    type: actionTypes.EDIT_TASK_FAIL,
    payload: {
      error,
    },
  };
};

export const editTask = (taskId, ownerId, taskName, callback) => {
  return async (dispatch) => {
    try {
      const editTaskData = { taskName };
      dispatch(editTaskStart());
      const response = await axios.put(
        `http://localhost:5000/api/task/${taskId}`,
        editTaskData
      );
      callback && typeof callback === "function" && callback();
      dispatch(editTaskSuccess(response.data, ownerId));
    } catch (err) {
      console.log(err);
      dispatch(editTaskFailed(err));
    }
  };
};

const editBoardStart = () => {
  return {
    type: actionTypes.EDIT_BOARD_START,
  };
};
const editBoardSuccess = (boardId, newName) => {
  return {
    type: actionTypes.EDIT_BOARD_SUCCESS,
    payload: {
      boardId,
      newName,
    },
  };
};
const editBoardFailed = (error) => {
  return {
    type: actionTypes.EDIT_BOARD_FAIL,
    payload: {
      error,
    },
  };
};

export const editBoard = (boardId, name, callback) => {
  return async (dispatch) => {
    try {
      const editBoardData = { name };
      dispatch(editBoardStart());
      await axios.put(
        `http://localhost:5000/api/user/${boardId}`,
        editBoardData
      );
      callback && typeof callback === "function" && callback();
      dispatch(editBoardSuccess(boardId, name));
    } catch (err) {
      console.log(err);
      dispatch(editBoardFailed(err));
    }
  };
};
