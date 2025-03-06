import React, { useState, useEffect } from 'react';
import { List, Card, Button, DatePicker, Row, Col, Typography, Input, Drawer } from 'antd';
import dayjs from 'dayjs';
import { SettingOutlined } from "@ant-design/icons";
import { fetchTodos, sendMail } from '../component/api';

const { Title, Text } = Typography;

function TodoHistory() {
  const [todoList, setTodoList] = useState([]); // 전체 todoList 상태
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format('YYYY-MM')); // 월별로 보기 위한 상태
  const [filteredTodos, setFilteredTodos] = useState([]); // 필터링된 할 일 목록 상태
  const [drawerVisible, setDrawerVisible] = useState(false); // Drawer의 표시 여부
  const [mailId, setMailId] = useState(''); // 메일 ID 상태
  const [mailPassword, setMailPassword] = useState(''); // 메일 비밀번호 상태

  // selectedMonth가 변경될 때마다 호출
  useEffect(() => {
    const getTodos = async (selectedMonth) => {
      try {
        const todos = await fetchTodos(selectedMonth); 
        setTodoList(todos);
        setFilteredTodos(todos); 
      } catch (error) {
        console.error("할 일 목록을 가져오는 중 오류 발생:", error);
      }
    };
    getTodos(selectedMonth); 
  }, [selectedMonth]); 

  // 월별로 할 일 정리
  const groupTodosByMonth = (todos) => {
    return todos.reduce((acc, todo) => {
      const month = dayjs(todo.due_date).format('YYYY-MM');
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(todo);
      return acc;
    }, {});
  };

  // 월별 그룹화
  const groupedTodos = groupTodosByMonth(filteredTodos);


  // 월 별 데이터 세팅
  const handleMonthChange = (date) => {
    if (date) {
      setSelectedMonth(date.format('YYYY-MM')); 
    }
  };

  // 상태별로 할 일 필터링
  const handleFilter = (status) => {
    const filtered = todoList.filter(todo => todo.status === status);
    setFilteredTodos(filtered);
  };

  // 전체 리스트  조회 파라메타 전송
  const handleShowAll = () => {
    setFilteredTodos(todoList);
  };

  // 메일 보내기
  const handleSendMail = async () => {
    const todosList = filteredTodos.map((item) => {
      const statusText = getStatusText(item.status);
      const formattedDate = dayjs(item.due_date).format('YYYY-MM-DD');
      return `${item.title}, ${statusText}, ${formattedDate}`;
    });
    await sendMail(mailId, mailPassword, todosList);
  };

  // 상태 숫자 -> 텍스트 변환
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
        return '대 기';
      case 1:
        return '진행중';
      case 2:
        return '완료';
      default:
        return '알 수 없음';
    }
  };

  // Drawer를 열 때 호출되는 함수
  const openDrawer = () => {
    setDrawerVisible(true);
  };

  // Drawer를 닫을 때 호출되는 함수
  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  // 메일 ID 입력 값 변경 처리
  const handleMailIdChange = (e) => {
    setMailId(e.target.value);
  };

  // 메일 비밀번호 입력 값 변경 처리
  const handleMailPasswordChange = (e) => {
    setMailPassword(e.target.value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Todo History</Title>

      <Row gutter={16} align="middle" style={{ marginBottom: '20px' }}>
        <Col span={12}>
          {/* 월 선택 */}
          <div>
            <DatePicker.MonthPicker
              value={dayjs(selectedMonth)}
              onChange={handleMonthChange}
              placeholder="월 선택"
              style={{ width: '200px' }}
            />
          </div>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          {/* 상태별 필터 버튼 */}
          <div>
            <Button type="default" onClick={handleShowAll} style={{ marginRight: '10px' }}>
              전체 보기
            </Button>
            <Button type="default" onClick={() => handleFilter(1)} style={{ marginRight: '10px' }}>
              진행중
            </Button>
            <Button type="default" onClick={() => handleFilter(0)} style={{ marginRight: '10px' }}>
              대 기
            </Button>
            <Button type="default" onClick={() => handleFilter(2)} style={{ marginRight: '10px' }}>
              완 료
            </Button>
            <Button type="primary" onClick={handleSendMail} style={{ marginRight: '5px' }}>
              메일 보내기
            </Button>
            <Button type="primary" onClick={openDrawer}>
              <SettingOutlined />
            </Button>
          </div>
        </Col>
      </Row>

      {/* 월별로 할 일 리스트 */}
      <div>
        <Row gutter={16}>
          {Object.keys(groupedTodos).map((month) => (
            <Col span={24} key={month} style={{ marginBottom: '20px' }}>
              <Card
                title={<Text strong>{`${month}월`}</Text>}
                style={{
                  backgroundColor: '#f0f2f5',
                  width: '100%',
                  borderRadius: '8px',
                  paddingBottom: '10px',
                }}
              >
                {/* 스크롤이 적용될 div 태그 */}
                <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                  <List
                    itemLayout="horizontal"
                    dataSource={groupedTodos[month]}
                    renderItem={item => (
                      <List.Item
                        style={{
                          backgroundColor: '#fff',
                          marginBottom: '10px',
                          borderRadius: '5px',
                          padding: '10px',
                        }}
                        actions={[
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
                            {getStatusText(item.status)} {/* 상태 텍스트 표시 */}
                          </div>,
                          <Text>{dayjs(item.due_date).format('YYYY-MM-DD')}</Text>
                        ]}
                      >
                        <List.Item.Meta
                          title={<Text strong>{item.title}</Text>}
                        />
                      </List.Item>
                    )}
                  />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* 설정 Drawer */}
      <Drawer
        title="메일 기본 정보 설정"
        placement="right"
        onClose={closeDrawer}
        open={drawerVisible}
        width={300}
      >
        <div style={{ marginBottom: "40px" }}>
          <Text>Mail ID:</Text>
          <Input
            style={{ marginTop: "10px" }}
            value={mailId}
            onChange={handleMailIdChange}
            placeholder="메일 ID를 입력하세요"
          />
        </div>
        <div>
          <Text>Mail PassWord:</Text>
          <Input
            style={{ marginTop: "10px" }}
            value={mailPassword}
            onChange={handleMailPasswordChange}
            type="password"
            placeholder="메일 비밀번호를 입력하세요"
          />
        </div>
      </Drawer>
    </div>
  );
}

export default TodoHistory;
