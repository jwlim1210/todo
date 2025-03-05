import React from "react";
import TodoList from "../component/TodoList"; // TodoList 컴포넌트를 불러옵니다

function Todo({ collapsed }) {
  return (
    <div className=" ">
      <h2>Todo Page</h2>
      <TodoList />
    </div>
  );
}

export default Todo;
