import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import CalendarView from '../component/CalendarView';
import TodoView from '../component/TodoView';
import { Input, Button } from 'antd';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../component/api';

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

    // 추가
    const addNewTodo = async () => {
        if (newTodo === "") { alert("할 일을 입력 해주세요!"); return; }
        try {
            await addTodo(newTodo, selectedDate);
            setNewTodo(""); 
            await getTodos(selectedDate); 
        } catch (error) {
            console.error("할 일 추가 중 오류 발생:", error);
        }
    };

    // 삭제
    const removeTodo = async () => {
        if (!selectedTodo) {
            alert("삭제할 할 일을 선택해주세요!");
            return;
        }
        try {
            await deleteTodo(selectedTodo.id);
            await getTodos(selectedDate); // 할 일 삭제 후 재호출
            setSelectedTodo(null); // 삭제 후 선택된 할 일 초기화
            setNewTodo(""); // 삭제 후 인풋 박스 초기화
        } catch (error) {
            console.error("할 일 삭제 중 오류 발생:", error);
        }
    };

    //수정
    const modifyTodo = async () => {
        if (!selectedTodo || newTodo === "") {
            alert("수정할 할 일을 입력해주세요!");
            return;
        }
        try {
            await updateTodo(selectedTodo.id, newTodo);
            setSelectedTodo(null);
            setNewTodo(""); 
            await getTodos(selectedDate);
        } catch (error) {
            console.error("할 일 수정 중 오류 발생:", error);
        }
    };

    // 조회
    const handleDateSelect = async (value) => {
        const selectedDate = value.format('YYYY-MM-DD');
        setSelectedDate(selectedDate);
        setCalendarValue(value);
        getTodos(selectedDate); 
    };

    // 캘린더 날짜 클릭
    const handleTodayClick = () => {
        const todayDate = dayjs();
        handleDateSelect(todayDate);
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
                    handleTodayClick={handleTodayClick}
                    calendarValue={calendarValue}
                />
            </div>
            {/* 경계선 */}
            <div style={{ borderLeft: "1px solid #ccc", height: "100%" }}></div>

            {/* todo */}
            <div style={{ flex: 1, marginLeft: "10px", padding: "20px", display: "flex", flexDirection: "column", overflowY: "auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <span style={{ fontSize: "25px", fontWeight: "bold" }}>
                        To-Do List
                    </span>
                    <span style={{ marginTop: "10px" }}>
                        Selected : {selectedDate}
                    </span>
                </div>

                {/* 할 일 목록 보여주기 */}
                <TodoView
                    todos={filteredTodos}
                    selectedTodo={selectedTodo}
                    setSelectedTodo={setSelectedTodo} // 선택된 할 일을 설정하는 함수 전달
                    addTodo={addNewTodo}
                    delTodo={removeTodo}
                    updateTodo={modifyTodo}
                    selectedDate={selectedDate}
                    setNewTodo={setNewTodo} // 새로운 할 일 텍스트를 업데이트할 함수 전달
                    newTodo={newTodo} // 새로운 할 일 텍스트 상태 전달
                />

                {/* 할 일 추가 입력 필드와 버튼 */}
                <div style={{ marginTop: "10px", display: "flex", flexDirection: "column" }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Input
                            placeholder="새로운 할 일을 입력하세요"
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                            onPressEnter={selectedTodo ? modifyTodo : addNewTodo} // 수정 상태에 따라 처리 함수 달리 설정
                            style={{ flex: 1 }}
                        />
                        <Button
                            type="primary"
                            onClick={selectedTodo ? modifyTodo : addNewTodo} // 수정 상태에 따라 처리 함수 달리 설정
                        >
                            {selectedTodo ? "수정" : "추가"} {/* 버튼 텍스트 변경 */}
                        </Button>
                        <Button
                            type="primary" danger
                            onClick={removeTodo}  // 삭제 시 removeTodo 함수 사용
                        >
                            삭제
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calendar;
