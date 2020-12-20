import React from "react";
import Task from "../../Components/Task/task.component";
import classes from "./task-list.module.css";
import { Droppable } from "react-beautiful-dnd";

function TaskListContainer({ taskList, id }) {
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => {
        const { isDraggingOver } = snapshot;
        return (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ background: isDraggingOver ? "#ddd" : "#fff" }}
            className={classes.TaskList}
          >
            {taskList.map((task, i) => {
              return (
                <Task
                  boardId={id}
                  id={task._id}
                  index={i}
                  key={task._id}
                  taskName={task.name}
                />
              );
            })}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
}

export default TaskListContainer;
