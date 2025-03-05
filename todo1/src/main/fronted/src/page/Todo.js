import dayjs from 'dayjs'; 
import React, { useState, useEffect } from 'react';
import TodoView from '../component/TodoView'; 
import { fetchTodos } from '../component/api'; 

function Todo() {
  const [todoList, setTodoList] = useState([]); 
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD')); // 오늘 날짜로 초기화

  // selectedDate가 변경될 때마다 호출
  useEffect(() => {
    const getTodos = async (selectedDate) => {
      console.log(selectedDate);
      
      try {
        const todos = await fetchTodos(selectedDate); // selectedDate에 맞는 할 일 목록을 가져옴
        setTodoList(todos);
      } catch (error) {
        console.error("할 일 목록을 가져오는 중 오류 발생:", error);
      }
    };

    getTodos(selectedDate); // selectedDate 값을 넘겨서 호출
  }, [selectedDate]); // selectedDate가 변경될 때마다 이 useEffect가 실행되도록 설정

  return (
    <div className="">
      <h2>Todo Page</h2>
      {/* TodoView 컴포넌트에 todoList 전달 */}
      <TodoView todos={todoList} />
    </div>
  );
}

export default Todo;
