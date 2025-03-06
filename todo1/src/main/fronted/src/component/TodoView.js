import React from 'react';
import { List, Input, Button, message } from 'antd';
import dayjs from 'dayjs';

const TodoView = ({
    todos,
    selectedTodo,
    setSelectedTodo,
    addTodo,
    delTodo,
    updateTodo,
    selectedDate,
    setNewTodo,
    newTodo,
    getTodos,
    updateStatus
}) => {

    // 추가
    const addNewTodo = async () => {
        if (newTodo === "") { message.error("할 일을 입력 해주세요!"); return; }

        await addTodo(newTodo, selectedDate);
        setNewTodo("");
        await getTodos(selectedDate);  // 할 일 추가 후 리스트 갱신
    };

    // 삭제
    const removeTodo = async () => {
        await delTodo(selectedTodo.id);
        await getTodos(selectedDate); // 할 일 삭제 후 리스트 갱신
        setSelectedTodo(null);
        setNewTodo("");
    };

    // 상태값 변경 
    const modifyStatus = async () => {
        if (!selectedTodo || newTodo === "") { message.error("수정 할 일을 입력 해주세요!"); return; }
        await updateStatus(selectedTodo.id);
        await getTodos(selectedDate);
        setSelectedTodo(null);
        setNewTodo("");
    };

    //수정 
    const modifyTodo = async () => {
        if (!selectedTodo || newTodo === "") { message.error("수정 할 일을 입력 해주세요!"); return; }
        await updateTodo(selectedTodo.id, newTodo);
        setSelectedTodo(null);
        setNewTodo("");
        await getTodos(selectedDate);  // 할 일 수정 후 리스트 갱신
    };

    // 리스트 클릭 이벤트
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
            case 0:
                return { backgroundColor: '#f0ad4e', color: 'white' };  // 대기 상태
            case 1:
                return { backgroundColor: '#5bc0de', color: 'white' };  // 진행중 상태
            case 2:
                return { backgroundColor: '#28a745', color: 'white' };  // 완료 상태
            default:
                return { backgroundColor: '#6c757d', color: 'white' };  // 기본 상태
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
            <div className="todo-container">
                <List
                    dataSource={todos}
                    renderItem={item => (
                        <List.Item
                            onClick={() => handleClick(item)}
                            className="cursor-pointer todo-item"
                            style={{
                                backgroundColor: selectedTodo === item ? '#e6f7ff' : 'transparent',
                                marginBottom: '10px',
                                borderRadius: '5px',
                                padding: '10px',
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                <strong
                                    style={{
                                        marginLeft: "10px",
                                        textDecoration: item.status === 2 ? 'line-through' : 'none',
                                        color: item.status === 2 ? '#999' : 'black'
                                    }}
                                >
                                    {item.title}
                                </strong>
                                <div
                                    className="status-box"
                                    style={{
                                        ...getStatusClass(item.status),
                                        padding: '5px 10px',
                                        borderRadius: '5px',
                                        marginRight: '10px',
                                        fontSize: '14px',
                                    }}
                                >
                                    {getStatusText(item.status)}
                                </div>
                            </div>
                        </List.Item>
                    )}
                />
            </div>

            {/* 할 일 추가 입력 필드와 버튼 */}
            <div style={{ marginTop: "10px", display: "flex", flexDirection: "column" }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Input
                        maxLength={50}
                        placeholder="새로운 할 일을 입력하세요"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        onPressEnter={selectedTodo ? modifyTodo : addNewTodo}
                        disabled={dayjs().isAfter(dayjs(selectedDate), 'day') && !selectedTodo}
                    />
                    <Button
                        type="primary"
                        onClick={selectedTodo ? modifyTodo : addNewTodo}
                        disabled={dayjs().isAfter(dayjs(selectedDate), 'day') && !selectedTodo}
                        style={{ backgroundColor: selectedTodo ? '#faad14' : '', borderColor: selectedTodo ? '#faad14' : '' }}
                    >
                        {selectedTodo ? "수정" : "추가"}
                    </Button>
                    <Button
                        type="primary"
                        onClick={modifyStatus}
                        disabled={(dayjs().isAfter(dayjs(selectedDate), 'day') && !selectedTodo) || !selectedTodo || selectedTodo?.status === 0}
                    >
                        상태 변경
                    </Button>
                    <Button
                        type="primary" danger
                        onClick={removeTodo}  // 삭제 시 removeTodo 함수 사용
                        disabled={!selectedTodo}
                    >
                        삭제
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TodoView;
