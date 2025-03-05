import React from 'react';
import { List } from 'antd';

const TodoView = ({ todos, selectedTodo, setSelectedTodo, newTodo, setNewTodo }) => {
    const handleClick = (item) => {
        if (item === selectedTodo) {
            setSelectedTodo(null); 
            setNewTodo(""); 
        } else {
            setSelectedTodo(item); 
            setNewTodo(item.title); 
        }
    };


    const getStatusClass = (status) => {
        switch (status) {
            case 0: // 대기
                return 'status-waiting';
            case 1: // 진행중
                return 'status-in-progress';
            case 2: // 완료
                return 'status-completed';
            default:
                return 'status-default';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 0:
                return '대기';
            case 1:
                return '진행중';
            case 2:
                return '완료';
            default:
                return '알 수 없음';
        }
    };

    return (
        <div>
            <div className='todo-container'>
                <List
                    dataSource={todos}
                    renderItem={item => (
                        <List.Item
                            onClick={() => handleClick(item)}
                            className="cursor-pointer todo-item"
                            style={{ backgroundColor: selectedTodo === item ? '#e6f7ff' : 'transparent' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                <strong style={{ marginLeft: "10px" }}>
                                    {item.title}
                                </strong>
                                <div className={`status-box ${getStatusClass(item.status)}`} style={{ marginRight: "10px" }}>
                                    {getStatusText(item.status)} {/* 상태 텍스트 표시 */}
                                </div>
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
};

export default TodoView;
