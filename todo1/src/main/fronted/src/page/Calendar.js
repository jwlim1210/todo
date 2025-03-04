import axios from "axios";
import { useEffect, useState } from "react";
import TodoList from '../component/TodoList';
import CalendarView from '../component/CalendarView';
import dayjs from "dayjs";

function Calendar() {
    const [todoList, setTodoList] = useState([]); // 전체 todoList 상태
    const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜 상태
    const [calendarValue, setCalendarValue] = useState(dayjs()); // 캘린더에서 선택된 날짜
    const [selectedMonth, setSelectedMonth] = useState(dayjs().format("YYYY-MM")); // 선택된 월

    const today = dayjs().format('YYYY-MM-DD');

    // Todo 리스트 가져오기 (월별 조회)
    const fetchTodos = async (month) => {
        try {
            const response = await axios.get(`/api/todo/list?due_month=${month}`);
            setTodoList(response.data);
        } catch (error) {
            console.error("할 일 목록을 가져오는 중 오류 발생:", error);
        }
    };

    // 날짜 별 삭제 
    const deleteTodos = async (selectedDate) => {
        try {
            const response = await axios.delete(`/api/todo/date/del?due_date=${selectedDate}`);
            setTodoList(todoList.filter(todo => todo.due_date !== selectedDate));
        } catch (error) {
            console.error("데이터 없음", error);
        }
    };

    useEffect(() => {
        handleDateSelect(dayjs()); // 오늘 날짜를 기본 선택으로 설정
    }, []);

    // 날짜 선택 시 API 호출 및 상태 업데이트
    const handleDateSelect = async (value) => {
        const selectedDate = value.format('YYYY-MM-DD');
        const selectedMonth = value.format('YYYY-MM'); // YYYY-MM 형식으로 월 추출
        setSelectedDate(selectedDate);
        setCalendarValue(value);
        setSelectedMonth(selectedMonth);
        fetchTodos(selectedMonth); // 선택된 월 기준으로 API 호출
    };

    // Today 버튼 클릭 시 오늘 날짜로 설정 + API 호출
    const handleTodayClick = () => {
        const todayDate = dayjs();
        handleDateSelect(todayDate);
    };

    // Reset 버튼 클릭 시 날짜에 있는 값들 삭제
    const handleResetClick = () => {
        deleteTodos(selectedDate);
        handleTodayClick();
    };

    // 컴포넌트가 마운트될 때 오늘 날짜 데이터 가져오기
    useEffect(() => {
        fetchTodos(selectedMonth); // 처음 마운트될 때 현재 월 데이터를 불러오기
    }, [selectedMonth]);

    const filteredTodos = selectedDate
        ? todoList.filter(todo => todo.due_date === selectedDate)
        : todoList; // 선택된 날짜가 없으면 전체 리스트

    return (
        <div
            style={{
                flex: 1, // 양옆 균등 비율
                padding: "10px", // 여백 추가 (선택사항)
                display: "flex",
                justifyContent: "flex-start", // 왼쪽 정렬
                alignItems: "flex-start", // 위쪽 정렬
                width: "100%", // 전체 너비를 사용
                height: "100vh", // 전체 높이를 화면에 맞게 설정
            }}
        >
            <div style={{ flex: 1, padding: "10px" }}>
                <CalendarView
                    todoList={todoList}
                    handleDateSelect={handleDateSelect}
                    handleTodayClick={handleTodayClick}
                    handleResetClick={handleResetClick}
                    calendarValue={calendarValue}
                />
            </div>

            <div
                style={{
                    borderLeft: "1px solid #ccc", // 가는 회색 실선
                    height: "100%", // 중앙선이 전체 높이에 걸쳐 있도록 설정
                }}
            ></div>

            <div style={{ flex: 1, padding: "20px", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <span style={{ fontSize: "25px", fontWeight: "bold" }}>
                        To-Do List
                    </span>
                    <span style={{ marginTop: "10px" }}>
                        Selectd : {selectedDate}
                    </span> 
                </div>
                <TodoList todos={filteredTodos} />
            </div>



        </div>
    );
}

export default Calendar;
