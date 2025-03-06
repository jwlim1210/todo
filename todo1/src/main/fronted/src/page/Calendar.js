import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import dayjs from 'dayjs';
import CalendarView from '../component/CalendarView';
import TodoView from '../component/TodoView';
import { fetchTodos, addTodo, updateTodo, deleteTodo, updateStatus } from '../component/api';

const { Title, Text } = Typography;
function Calendar() {
    const [todoList, setTodoList] = useState([]); // 전체 todoList 상태
    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD')); // 기본 날짜 오늘로 설정
    const [calendarValue, setCalendarValue] = useState(dayjs()); // 캘린더에서 선택된 날짜
    const [newTodo, setNewTodo] = useState("");  // 새로운 할 일 입력 상태
    const [selectedTodo, setSelectedTodo] = useState(null); // 선택된 할 일 상태

    useEffect(() => {
        getTodos(selectedDate);
    }, [selectedDate]);

    const getTodos = async (selectedDate) => {
        try {
            const todos = await fetchTodos(selectedDate);
            setTodoList(todos);
        } catch (error) {
            console.error("할 일 목록을 가져오는 중 오류 발생:", error);
        }
    };

    // 조회
    const handleDateSelect = async (value) => {
        const selectedDate = value.format('YYYY-MM-DD');
        setSelectedDate(selectedDate);
        setCalendarValue(value);
        getTodos(selectedDate);
        setSelectedTodo(null);
        setNewTodo("")
    };

    const filteredTodos = selectedDate
        ? todoList.filter(todo => todo.due_date === selectedDate)
        : todoList;

    return (
        <div className="calendar-container" style={{ display: "flex", padding: "20px" }}>
            {/* 캘린더 */}
            <div style={{ flex: 1, padding: "10px", marginRight: "20px" }}>
                <CalendarView
                    todoList={todoList}
                    handleDateSelect={handleDateSelect}
                    handleTodayClick={() => handleDateSelect(dayjs())}
                    calendarValue={calendarValue}
                />
            </div>
            {/* 경계선 */}
            <div style={{ borderLeft: "1px solid #ccc", height: "100%" }}></div>

            {/* todo */}
            <div style={{ flex: 1, marginLeft: "10px", padding: "20px", display: "flex", flexDirection: "column", overflowY: "auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <Title level={2}>Todo Page</Title>
                    <span style={{ marginTop: "50px" }}>
                        Selected : {selectedDate}
                    </span>
                </div>

                {/* 할 일 목록 보여주기 */}
                <TodoView
                    todos={filteredTodos}
                    selectedTodo={selectedTodo}
                    setSelectedTodo={setSelectedTodo}
                    addTodo={addTodo}
                    delTodo={deleteTodo}
                    updateTodo={updateTodo}
                    selectedDate={selectedDate}
                    setNewTodo={setNewTodo} 
                    newTodo={newTodo} 
                    getTodos={getTodos} 
                    updateStatus={updateStatus}
                />
            </div>
        </div>
    );
}

export default Calendar;
