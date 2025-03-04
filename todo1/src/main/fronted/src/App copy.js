import axios from "axios";
import { useEffect, useState } from "react";
import { Layout, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import TodoList from './component/TodoList';
import CalendarView from './component/CalendarView';
import dayjs from "dayjs";
import { BrowserRouter as Router, Route, Routes,Link } from "react-router-dom";

const { Header, Footer, Sider, Content } = Layout;

function App() {
  const [todoList, setTodoList] = useState([]); // 전체 todoList 상태
  const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜 상태
  const [collapsed, setCollapsed] = useState(false); // 왼쪽 사이드바는 기본적으로 보이도록 설정 (false)


  const today = dayjs().format('YYYY-MM-DD');

  // 날짜 클릭 시 해당 날짜에 맞는 Todo 리스트 가져오기
  const handleDateSelect = async (value) => {
    const selectedDate = value.format('YYYY-MM-DD');  // Dayjs 객체에서 'YYYY-MM-DD' 형식으로 변환
    setSelectedDate(selectedDate);
  };

  // 컴포넌트가 마운트될 때 전체 Todo 리스트를 가져옵니다.
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get(`/api/todo/list?due_date=`);
      setTodoList(response.data); // 전체 Todo 리스트 저장
      handleDateSelect(dayjs(today)); // 초기 선택 날짜를 오늘로 설정
    };
    fetchTodos();
  }, []); // 이 부분이 컴포넌트 마운트 시 한 번만 호출됨

  // 선택된 날짜에 맞는 할 일 필터링
  const filteredTodos = selectedDate
    ? todoList.filter(todo => todo.due_date === selectedDate) // 선택된 날짜에 맞는 할 일만 필터링
    : [];

  return (
    <Layout style={{ minHeight: "100vh" }}>

      <Header className="custom-header">
        <div style={{ textAlign: "center" }}>
          <h2>FDXNETWORKS</h2>
        </div>
      </Header>
      {/* 사이드바 버튼 */}
      <Button
        type="primary"
        onClick={() => setCollapsed(!collapsed)}
        style={{
          position: "absolute",
          top: 15,
          left: 15,
          zIndex: 100,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Layout style={{ position: 'relative' }}>


        {/* 왼쪽 사이드바 */}
        <Sider
          width={collapsed ? 0 : 200}  // collapsed 상태에 따라 사이드바 너비 조정
          className="custom-sidebar"
          style={{
            transition: "all 0.3s ease",
            position: 'absolute', // 절대 위치 지정
            zIndex: 100,
          }}
        >
          <h3>📝 오늘 일정</h3> 
          <h3 style={{ marginTop: "20px" }}> 📅 전체 일정</h3>
        </Sider>

        {/* 콘텐츠 영역 */}
        <Content
          className="custom-content"
          style={{
            marginLeft: collapsed ? "0px" : "200px", // 사이드바가 열릴 때 콘텐츠 영역 크기 조정
            marginRight: collapsed ? "0px" : "200px", // 오른쪽 사이드바가 열릴 때 콘텐츠 영역 크기 조정
            display: collapsed ? "flex" : "block",
          }}
        >
          <div style={{ flex: 1, transition: "all 0.3s ease-in-out" }}>
            <CalendarView todoList={todoList} handleDateSelect={handleDateSelect} />
          </div>
          <div style={{ flex: 1, transition: "all 0.3s ease-in-out" }}>
            <h2>선택된 날짜: {selectedDate}</h2>
            <TodoList todos={filteredTodos} />
          </div>

        </Content>

        {/* 오른쪽 사이드바 */}
        <Sider
          width={collapsed ? 0 : 200}  // collapsed 상태에 따라 사이드바 너비 조정
          className="custom-sidebar-right"
        >
        </Sider>
      </Layout>

      <Footer style={{ textAlign: "center", padding: "10px", background: "#001529", color: "white" }}>
        Footer ©2025 Created by You
      </Footer>
    </Layout>
  );
}

export default App;
