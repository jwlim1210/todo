// Calendar.js
import axios from "axios";
import { useEffect, useState } from "react";
import TodoList from '../component/TodoList';
import CalendarView from '../component/CalendarView';
import dayjs from "dayjs";

function Calendar({ collapsed }) {
    const [todoList, setTodoList] = useState([]); // 전체 todoList 상태
    const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜 상태

    const today = dayjs().format('YYYY-MM-DD');

    // 날짜 클릭 시 해당 날짜에 맞는 Todo 리스트 가져오기
    const handleDateSelect = async (value) => {
        const selectedDate = value.format('YYYY-MM-DD'); // Dayjs 객체에서 'YYYY-MM-DD' 형식으로 변환
        setSelectedDate(selectedDate);
    };

    // 컴포넌트가 마운트될 때 전체 Todo 리스트를 가져옵니다.
    useEffect(() => {
        const fetchTodos = async () => {
            const response = await axios.get(`/api/todo/list?due_date=`);
            setTodoList(response.data);
            handleDateSelect(dayjs(today));
        };
        fetchTodos();
    }, []);

    const filteredTodos = selectedDate
        ? todoList.filter(todo => todo.due_date === selectedDate)
        : [];

    return (
        <div>
            {/* CalendarView 컴포넌트를 flex 레이아웃으로 배치 */}
            <div
                style={{
                    flex: 1,
                    display: collapsed ? "flex" : "block" , // collapsed 상태에 따라 display 변경
                }}
            >
                console.log({collapsed});
                
                <CalendarView todoList={todoList} handleDateSelect={handleDateSelect} />
            </div>

            {/* TodoList 컴포넌트를 flex 레이아웃으로 배치 */}
            <div
                style={{
                    flex: 1,
                    display: collapsed ? "flex" : "block" , // collapsed 상태에 따라 display 변경
                }}
            >
                <h2>선택된 날짜: {selectedDate}</h2>
                <TodoList todos={filteredTodos} />
            </div>
        </div>
    );
}

export default Calendar;
