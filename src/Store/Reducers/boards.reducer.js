import * as actionTypes from "../Actions/actionTypes";
import { updateObject } from "../../Shared/utility";

const initialState = {
  userBoards: [],
  laoding: false,
  error: null,
};

const fetchUserBoardsStart = (state, action) => {
  return updateObject(state, { loading: true, error: null });
};
const fetchUserBoardsSuccess = (state, action) => {
  const { boards } = action.payload;
  return updateObject(state, { loading: false, userBoards: boards });
};
const fetchUserBoardsFailed = (state, action) => {
  const { error } = action.payload;
  return updateObject(state, { loading: false, error: error });
};
const addTaskStart = (state, action) => {
  return updateObject(state, { loading: true, error: null });
};
const addTaskSuccess = (state, action) => {
  const { task, userId } = action.payload;
  const updatedBoardList = [...state.userBoards];
  let updatedBoard = updatedBoardList.find((board) => board._id === userId);
  updatedBoard
    ? (updatedBoard.taskList = updatedBoard.taskList.concat([task]))
    : (updatedBoard.taskList = null);
  return updateObject(state, { loading: false, userBoards: updatedBoardList });
};
const addTaskFailed = (state, action) => {
  const { error } = action.payload;
  return updateObject(state, { loading: false, error: error });
};

const deleteBoardStart = (state, action) => {
  return updateObject(state, { error: null });
};
const deleteBoardSuccess = (state, action) => {
  const { id } = action.payload;
  const updatedBoardList = [...state.userBoards];
  const deletedBoardIndex = updatedBoardList.findIndex(
    (board) => board._id === id
  );
  updatedBoardList.splice(deletedBoardIndex, 1);

  return updateObject(state, { userBoards: updatedBoardList });
};
const deleteBoardFailed = (state, action) => {
  const { error } = action.payload;
  return updateObject(state, { error: error });
};

const addBoardStart = (state, action) => {
  return updateObject(state, { error: null });
};
const addBoardSuccess = (state, action) => {
  console.log("add board success");
  const { board } = action.payload;
  board.taskList = [];
  let updatedBoardList = [...state.userBoards];
  updatedBoardList = updatedBoardList.concat([board]);
  return updateObject(state, { userBoards: updatedBoardList });
};
const addBoardFailed = (state, action) => {
  const { error } = action.payload;
  return updateObject(state, { error: error });
};

const editBoardStart = (state, action) => {
  return updateObject(state, { error: null });
};
const editBoardSuccess = (state, action) => {
  const { boardId, newName } = action.payload;
  const updatedBoardList = [...state.userBoards];
  const updatedBoard = updatedBoardList.find((board) => board._id === boardId);
  if (updatedBoard) updatedBoard.name = newName;
  return updateObject(state, { userBoards: updatedBoardList });
};
const editBoardFailed = (state, action) => {
  const { error } = action.payload;
  return updateObject(state, { error: error });
};

const editTaskStart = (state, action) => {
  return updateObject(state, { error: null });
};
const editTaskSuccess = (state, action) => {
  const { task, ownerId } = action.payload;
  const updatedBoardList = [...state.userBoards];
  const updatedBoard = updatedBoardList.find((board) => board._id === ownerId);
  if (updatedBoard) {
    const updatedTaskIndex = updatedBoard.taskList.findIndex(
      (t) => t._id === task._id
    );
    updatedBoard.taskList[updatedTaskIndex] = task;
  }
  return updateObject(state, { userBoards: updatedBoardList });
};
const editTaskFailed = (state, action) => {
  const { error } = action.payload;
  return updateObject(state, { error: error });
};

const deleteTaskStart = (state, action) => {
  return updateObject(state, { error: null });
};
const deleteTaskSuccess = (state, action) => {
  const { taskId, userId } = action.payload;
  const updatedBoardList = [...state.userBoards];
  const updatedBoard = updatedBoardList.find((board) => board._id === userId);
  if (updatedBoard) {
    const deletedTaskIndex = updatedBoard.taskList.findIndex(
      (t) => t._id === taskId
    );
    updatedBoard.taskList.splice(deletedTaskIndex, 1);
  }
  return updateObject(state, { userBoards: updatedBoardList });
};
const deleteTaskFailed = (state, action) => {
  const { error } = action.payload;
  return updateObject(state, { error: error });
};

const transferTaskStart = (state, action) => {
  console.log("transfered task success");
  const { taskId, newOwner, oldOwner } = action.payload;
  const updatedBoardList = [...state.userBoards];
  const updtedDestinationBoard = updatedBoardList.find(
    (board) => board._id === newOwner
  );
  const updatedSourceBoard = updatedBoardList.find(
    (board) => board._id === oldOwner
  );
  if (updtedDestinationBoard && updatedSourceBoard) {
    const transferredTask = updatedSourceBoard.taskList.find(
      (task) => task._id === taskId
    );
    const transferredTaskIndex = updatedSourceBoard.taskList.findIndex(
      (task) => task._id === taskId
    );
    console.log("task-->", transferredTask);
    console.log("index-->", transferredTaskIndex);
    updatedSourceBoard.taskList.splice(transferredTaskIndex, 1);
    console.log("sourceBoard -->", updatedSourceBoard);
    updtedDestinationBoard.taskList = updtedDestinationBoard.taskList.concat([
      transferredTask,
    ]);
    console.log("destinationBoard-->", updtedDestinationBoard);
  }

  return updateObject(state, { userBoards: updatedBoardList });
};
const transferTaskSuccess = (state, action) => {
  // console.log('transfered task success')
  // const { taskId, newOwner,oldOwner } = action.payload;
  // const updatedBoardList = [...state.userBoards];
  // const updtedDestinationBoard = updatedBoardList.find(board => board._id === newOwner);
  // const updatedSourceBoard = updatedBoardList.find(board => board._id === oldOwner);
  // if (updtedDestinationBoard && updatedSourceBoard) {
  //     const transferredTask = updatedSourceBoard.taskList.find(task => task._id === taskId);
  //     const transferredTaskIndex = updatedSourceBoard.taskList.findIndex(task => task._id === taskId);
  //     console.log("task-->",transferredTask);
  //     console.log("index-->" ,transferredTaskIndex)
  //     updatedSourceBoard.taskList.splice(transferredTaskIndex, 1);
  //     console.log("sourceBoard -->", updatedSourceBoard)
  //     updtedDestinationBoard.taskList = updtedDestinationBoard.taskList.concat([transferredTask]);
  //     console.log("destinationBoard-->",updtedDestinationBoard)
  //  }
  // return updateObject(state, { userBoards: updatedBoardList });
  return state;
};
const transferTaskFailed = (state, action) => {
  const { error } = action.payload;
  return updateObject(state, { error: error });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_BOARDS_START:
      return fetchUserBoardsStart(state, action);
    case actionTypes.FETCH_USER_BOARDS_SUCCESS:
      return fetchUserBoardsSuccess(state, action);
    case actionTypes.FETCH_USER_BOARDS_FAIL:
      return fetchUserBoardsFailed(state, action);
    case actionTypes.ADD_TASK_START:
      return addTaskStart(state, action);
    case actionTypes.ADD_TASK_SUCCESS:
      return addTaskSuccess(state, action);
    case actionTypes.ADD_TASK_FAIL:
      return addTaskFailed(state, action);
    case actionTypes.DELETE_BOARD_START:
      return deleteBoardStart(state, action);
    case actionTypes.DELETE_BOARD_SUCCESS:
      return deleteBoardSuccess(state, action);
    case actionTypes.DELETE_BOARD_FAIL:
      return deleteBoardFailed(state, action);
    case actionTypes.ADD_BOARD_START:
      return addBoardStart(state, action);
    case actionTypes.ADD_BOARD_SUCCESS:
      return addBoardSuccess(state, action);
    case actionTypes.ADD_BOARD_FAIL:
      return addBoardFailed(state, action);
    case actionTypes.EDIT_BOARD_START:
      return editBoardStart(state, action);
    case actionTypes.EDIT_BOARD_SUCCESS:
      return editBoardSuccess(state, action);
    case actionTypes.EDIT_BOARD_FAIL:
      return editBoardFailed(state, action);
    case actionTypes.EDIT_TASK_START:
      return editTaskStart(state, action);
    case actionTypes.EDIT_TASK_SUCCESS:
      return editTaskSuccess(state, action);
    case actionTypes.EDIT_TASK_FAIL:
      return editTaskFailed(state, action);
    case actionTypes.DELETE_TASK_START:
      return deleteTaskStart(state, action);
    case actionTypes.DELETE_TASK_SUCCESS:
      return deleteTaskSuccess(state, action);
    case actionTypes.DELETE_TASK_FAIL:
      return deleteTaskFailed(state, action);
    case actionTypes.TRANSFER_TASK_START:
      return transferTaskStart(state, action);
    case actionTypes.TRANSFER_TASK_SUCCESS:
      return transferTaskSuccess(state, action);
    case actionTypes.TRANSFER_TASK_FAIL:
      return transferTaskFailed(state, action);
    default:
      return state;
  }
};
export default reducer;
