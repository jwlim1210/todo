import React, { useState } from 'react';
import { List, Input, Button } from 'antd';
import axios from 'axios';

const TodoList = ({ todos, addTodo, selectedDate, delTodo, updateTodo }) => {
  const [newTodo, setNewTodo] = useState("");
  const [selectedTodo, setSelectedTodo] = useState(null);  // 선택된 할 일을 관리할 상태 추가

  // 새로운 할 일을 추가하는 함수
  const handleAddTodo = async () => {

    if (newTodo == "") {
      alert("할 일을 입력 해주세요!!!");
      return;
    }
    if (!selectedTodo) {
      try {
        await axios.post('http://localhost:18080/api/todo/add', {
          title: newTodo,
          due_date: selectedDate,
        });
        addTodo(newTodo);
        setNewTodo("");
      } catch (error) {
        console.error("할 일 추가 중 오류 발생:", error);
      }
    } else {
      // 선택된 할 일이 있다면 수정
      try {
        await axios.put('http://localhost:18080/api/todo/update', {
          id: selectedTodo.id,
          title: newTodo,
        });
        updateTodo(newTodo);
        setNewTodo("");

      } catch (error) {
        console.error("할 일 수정 중 오류 발생:", error);
      }
    }
  };

  // Todo 리스트 삭제 
  const deleteTodos = async (id) => {
    try {
      await axios.delete(`/api/todo/date/del?parameter=${id}`);
      delTodo(id); // 삭제 후 부모 컴포넌트에서도 반영
      setNewTodo("");
    } catch (error) {
      console.error("데이터 없음", error);
    }
  };

  // Todo 항목 선택
  const handleClick = (item) => {
    if (selectedTodo === item) {
      setSelectedTodo(null);  // 이미 선택된 항목을 다시 클릭하면 선택 해제
      setNewTodo("");
    } else {
      setSelectedTodo(item);  // 클릭한 항목을 선택
      setNewTodo(item.title);
    }
  };

  // 상태별 클래스를 반환하는 함수
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

  // 상태 값을 숫자에서 문자열로 변환
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
      <div className="todo-container"> {/* 클래스 이름으로 변경 */}

        {/* 할 일 리스트 */}
        <List
          dataSource={todos}
          renderItem={item => (
            <List.Item
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: selectedTodo === item ? '#e6f7ff' : 'transparent',
                borderRadius: '4px',
                cursor: 'pointer',
                padding: '8px 12px',
                transition: "all 0.3s ease"
              }}
              onClick={() => handleClick(item)}  // 클릭 이벤트 핸들러 추가
            >
              <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                <strong
                  style={{
                    textDecoration: item.status === 2 ? 'line-through' : 'none',
                    color: item.status === 2 ? '#999' : '#000',
                    flex: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis', // 길어진 제목은 생략
                    whiteSpace: 'nowrap', // 제목이 길어져도 한 줄로 표시
                    paddingRight: '10px' // 제목과 상태 사이에 공간 추가
                  }}
                >
                  {item.title}
                </strong>

                {/* 상태 사각형 박스 */}
                <div
                  className={`status-box ${getStatusClass(item.status)}`}  // 조건부 클래스를 추가
                  style={{
                    padding: '5px 12px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    textTransform: 'capitalize'
                  }}
                >
                  {getStatusText(item.status)} {/* 상태 텍스트 표시 */}
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>

      {/* 인풋 박스 + 버튼 */}
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <Input
          placeholder="새로운 할 일을 입력하세요"
          value={newTodo}
          maxLength={50}
          onChange={(e) => setNewTodo(e.target.value)}
          onPressEnter={handleAddTodo}
        />

        <Button
          type="primary"
          onClick={handleAddTodo}
          style={{
            backgroundColor: selectedTodo ? 'orange' : '', // 선택된 할 일이 있으면 주황색
            borderColor: selectedTodo ? 'orange' : '', // 선택된 할 일이 있으면 테두리도 주황색
          }}
        >
          {selectedTodo ? "수정" : "추가"}
        </Button>
        <Button
          type="primary"
          danger
          onClick={() => {
            if (selectedTodo) {
              deleteTodos(selectedTodo.id);
            } else {
              alert("삭제할 할 일을 선택하세요!");
            }
          }}
        >
          삭제
        </Button>
      </div>
    </div>
  );
};

export default TodoList;
