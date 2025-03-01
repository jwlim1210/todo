import axios from "axios";
import { useEffect, useState } from "react";
import { Layout, Calendar, Input, Button, List, message } from "antd";

const { Header, Footer, Sider, Content } = Layout;

function App() {
  const [todoList, setTodoList] = useState([]); // 선택된 날짜의 todoList
  const [selectedDate, setSelectedDate] = useState(null); // selectedDate 상태 정의

  // 날짜 클릭 시 해당 날짜에 맞는 Todo 리스트 가져오기
  const handleDateSelect = async (value) => {
    const selectedDate = value.format('YYYY-MM-DD'); // 선택된 날짜 포맷
    setSelectedDate(selectedDate); // 선택된 날짜 상태 업데이트

    // 선택된 날짜에 맞는 todo 리스트 API 호출
    const response = await axios.get(`/api/todo/list?due_date=${selectedDate}`);
    setTodoList(response.data); // 가져온 todo 리스트 상태 업데이트
    // message.success('API 호출 성공');
  };


  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="custom-header">
        일정관리
      </Header>

      <Layout>
        <Sider width={200} style={{ background: "#f0f2f5", padding: "10px" }}>
          <h3>📅 Calendar</h3>
          <h3 style={{ marginTop: "20px" }}>📝 Add Todo</h3>
        </Sider>

        <Content style={{ padding: "20px", minHeight: "80vh", background: "white" }}>
          <h1>Todo List</h1>
          <Calendar
            fullscreen={false}  // 풀스크린을 사용하지 않음
            style={{ background: "white", borderRadius: "10px", padding: "10px" }}
            onSelect={handleDateSelect}  // 날짜 클릭 시 API 호출
          />

          <h2>선택된 날짜: {selectedDate}</h2>
          <h3>Todo List:</h3>
          <div style={{ marginTop: "20px" }}>
                <List
                  bordered
                  dataSource={todoList}
                  renderItem={item => (
                    <List.Item>
                      <strong>{item.title}</strong>
                      <br />
                      {item.description || "No description"}
                    </List.Item>
                  )}
                />

          </div>


          <button className="btn btn--alt">일정 추가</button>
          <button className="btn btn--alt">일정 삭제</button>
        </Content>

        <Sider width={200} style={{ background: "#f0f2f5", padding: "10px" }}>
          Right Sidebar
        </Sider>
      </Layout>

      <Footer style={{ textAlign: "center", padding: "10px", background: "#001529", color: "white" }}>
        Footer ©2025 Created by You
      </Footer>
    </Layout>
  );



}

export default App;
