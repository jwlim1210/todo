import React from 'react';
import { Calendar, Button } from 'antd';
import { CaretLeftFilled , CaretRightFilled } from '@ant-design/icons';

const CalendarView = ({ todoList, handleDateSelect, handleTodayClick, calendarValue }) => {
    const cellRender = (value) => {
        const date = value.format('YYYY-MM-DD');
        const todosForDate = todoList.filter(todo => todo.due_date === date);
        if (todosForDate.length === 0) {
            return null;
        }

        const waitingCount = todosForDate.filter(todo => todo.status === 0).length;
        const inProgressCount = todosForDate.filter(todo => todo.status === 1).length;
        const completedCount = todosForDate.filter(todo => todo.status === 2).length;

        return (
            <div style={{ textAlign: 'right', fontSize: "12px" }}>
                <strong>Status</strong>
                <div style={{ backgroundColor: '#fce5cd', marginBottom: '2px', borderRadius: '5px' }}>
                    <strong> 대기 : {waitingCount}개 </strong>
                </div>
                <div style={{ backgroundColor: '#d9ead3', marginBottom: '2px', borderRadius: '5px' }}>
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
            value={calendarValue} // 선택된 날짜 설정
            style={{
                background: "white",
                borderRadius: "10px",
                height: "750px",
            }}
            onSelect={handleDateSelect}
            cellRender={cellRender}
            headerRender={({ value, onChange }) => {
                return (
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        transition: "all 0.3s ease", // 헤더 부분도 자연스럽게 전환
                        padding: "10px"
                    }}>
                        <div>
                            <Button
                                type="text"
                                icon={<CaretLeftFilled />}
                                onClick={() => onChange(value.subtract(1, "month"))}
                                style={{ fontSize: "25px", marginRight: 5 }}
                            />

                            <span style={{ fontSize: "25px", fontWeight: "bold" }}>
                                {value.format("MMMM")}
                            </span>

                            <Button
                                type="text"
                                icon={<CaretRightFilled />}
                                onClick={() => onChange(value.add(1, "month"))}
                                style={{ fontSize: "25px", marginLeft: 5 }}
                                
                            />
                        </div>
                        
                        <div>
                            <Button type="primary" onClick={handleTodayClick} style={{ marginRight: "8px" }}>
                                Today
                            </Button>
                        </div>
                    </div>
                );
            }}
        />
    );
};

export default CalendarView;
