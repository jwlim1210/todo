import axios from "axios";
import { useEffect, useState } from "react";
import TodoList from '../component/TodoList';
import CalendarView from '../component/CalendarView';
import dayjs from "dayjs";

function Calendar() {
    const [todoList, setTodoList] = useState([]); // 전체 todoList 상태
    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD')); // 기본 날짜 오늘로 설정
    const [calendarValue, setCalendarValue] = useState(dayjs()); // 캘린더에서 선택된 날짜
    const today = dayjs().format('YYYY-MM-DD');

    // Todo 리스트 가져오기 (월별 조회)
    const fetchTodos = async (selectedDate) => {
        try {
            const response = await axios.get(`/api/todo/list?parameter=${selectedDate}`);
            setTodoList(response.data);
        } catch (error) {
            console.error("할 일 목록을 가져오는 중 오류 발생:", error);
        }
    };



    // 새로운 할 일을 추가하는 함수 (TodoList에서 호출)
    const addTodo = (newTodo) => {
        setTodoList([...todoList, { title: newTodo, due_date: selectedDate }]);
        fetchTodos(selectedDate);
    };

    const delTodo = (id) => {
        setTodoList(todoList.filter(todo => todo.id !== id)); // 해당 ID를 가진 todo 삭제
        fetchTodos(selectedDate); // 최신 데이터 불러오기
    };

    const updateTodo = (id) => {
        setTodoList([...todoList, { id: selectedDate.id, due_date: selectedDate}]);
        fetchTodos(selectedDate); // 최신 데이터 불러오기
    };

    // 처음 마운트될 때 현재 월 데이터를 불러오기
    useEffect(() => {
        fetchTodos(selectedDate);
    }, [selectedDate]);


    // 날짜 선택 시 API 호출 및 상태 업데이트
    const handleDateSelect = async (value) => {
        const selectedDate = value.format('YYYY-MM-DD');
        setSelectedDate(selectedDate);
        setCalendarValue(value);
        fetchTodos(selectedDate); // 선택된 월 기준으로 API 호출
    };


    // Today 버튼 클릭 시 오늘 날짜로 설정 + API 호출
    const handleTodayClick = () => {
        const todayDate = dayjs();
        handleDateSelect(todayDate);
    };



    const filteredTodos = selectedDate
        ? todoList.filter(todo => todo.due_date === selectedDate)
        : todoList; // 선택된 날짜가 없으면 전체 리스트

    return (
        <div
            className="calendar-container"
        >
            {/* 캘린터 */}
            <div style={{ flex: 1, padding: "10px" }}>
                <CalendarView
                    todoList={todoList}
                    handleDateSelect={handleDateSelect}
                    handleTodayClick={handleTodayClick}
                    calendarValue={calendarValue}
                />
            </div>

            {/* 중앙 경계선 */}
            <div style={{
                borderLeft: "1px solid #ccc",
                height: "100%",
            }}></div>

            {/* To-Do List */}
            <div style={{ flex: 1, padding: "20px", display: "flex", flexDirection: "column" ,overflowY: "auto"}}>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <span style={{ fontSize: "25px", fontWeight: "bold" }}>
                        To-Do List
                    </span>
                    <span style={{ marginTop: "10px" }}>
                        Selectd : {selectedDate}
                    </span>
                </div>
                <TodoList 
                todos={filteredTodos} 
                addTodo={addTodo} 
                delTodo = {delTodo}
                updateTodo = {updateTodo}
                selectedDate={selectedDate} 
                />
            </div>
        </div>
    );
}

export default Calendar;
