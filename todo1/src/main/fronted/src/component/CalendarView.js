import React from 'react';
import { Calendar } from 'antd';

const CalendarView = ({ todoList, handleDateSelect }) => {
    const cellRender = (value) => {
        const date = value.format('YYYY-MM-DD');
        const todosForDate = todoList.filter(todo => todo.due_date === date); // 해당 날짜의 todo 필터링
        if (todosForDate.length === 0) {
            return null;
        }

        // 각 상태별 할 일 개수 구하기
        const waitingCount = todosForDate.filter(todo => todo.status === '대기').length;
        const inProgressCount = todosForDate.filter(todo => todo.status === '진행중').length;
        const completedCount = todosForDate.filter(todo => todo.status === '완료').length;
        return (
            <div style={{ textAlign: 'right', fontSize: "12px" }}>
                    <strong>Status</strong>
                <div style={{ backgroundColor: '#fce5cd',  marginBottom: '2px', borderRadius: '5px' }}>
                <strong> 대기 : {waitingCount}개 </strong>
                </div>
                <div style={{ backgroundColor: '#d9ead3',  marginBottom: '2px',borderRadius: '5px' }}>
                <strong>진행중 : {inProgressCount}개</strong>
                </div>
                <div style={{ backgroundColor: '#c9daf8', marginBottom: '2px', borderRadius: '5px' }}>
                <strong>완료 : {completedCount}개</strong>
                </div>
            </div>
        );
    };

    return (
        <Calendar
            style={{
                background: "white",
                borderRadius: "10px",
                padding: "10px",
                height: "750px", // 캘린더 높이 설정
            }}
            onSelect={handleDateSelect}
            cellRender={cellRender}
            headerRender={({ value, onChange }) => {
                return (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        {/* 이전 달 버튼 */}
                        <button
                            onClick={() => onChange(value.subtract(1, "month"))}
                            style={{ marginRight: 10, border: "none", background: "none", cursor: "pointer" }}
                        >
                            ◀
                        </button>

                        {/* 월 표시 */}
                        <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                            {value.format("MMMM")} {/* 'January', 'February' 등 월만 표시 */}
                        </span>

                        {/* 다음 달 버튼 */}
                        <button
                            onClick={() => onChange(value.add(1, "month"))}
                            style={{ marginLeft: 10, border: "none", background: "none", cursor: "pointer" }}
                        >
                            ▶
                        </button>
                    </div>
                );
            }}
        />

    );

};
export default CalendarView;
