import React from "react";
import TodoList from "../component/TodoList"; // TodoList 컴포넌트를 불러옵니다

function Todo({ collapsed }) {
  return (
    <div>
      <h2>Todo Page</h2>
      <TodoList /> {/* TodoList 컴포넌트를 여기에 표시 */}
    </div>
  );
}

export default Todo;
