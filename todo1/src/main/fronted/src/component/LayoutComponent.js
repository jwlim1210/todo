import React from "react";
import { Layout, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Link } from "react-router-dom";

const { Header, Footer, Sider, Content } = Layout;

function LayoutComponent({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  // collapsed 상태 변화 확인을 위한 콘솔 로그 추가
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
    console.log("collapsed after:", !collapsed); // 상태 변경 후 출력
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="layout-header">
        <div style={{ textAlign: "center" }}>
          <h2>FDXNETWORKS</h2>
        </div>

        <Button
          onClick={toggleCollapse} // 클릭 시 toggleCollapse 호출
          style={{
            background: "#f0f2f5",
            position: "absolute",
            top: 15,
            fontSize: "20px", // 아이콘 크기 조정
            right: 200, // 버튼을 오른쪽에 배치하기 위해 left에서 right로 수정
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </Header>


      <Layout style={{ position: "relative" }}>
        <Sider width={collapsed ? 0 : 200} className="layout-sidebar-left">
          <nav>
            <Link to="/todo"><h3>📝 오늘 일정</h3></Link>
            <Link to="/calendar"><h3 style={{ marginTop: "20px" }}> 📅 전체 일정</h3></Link>
          </nav>
        </Sider>

        <Content
          className="layout-content"
          style={{
            marginLeft: collapsed ? "0px" : "200px",
            marginRight: collapsed ? "0px" : "200px",
          }}
        >
          <div>
            {children}
          </div>
        </Content>

        <Sider width={collapsed ? 0 : 200} className="layout-sidebar-right"></Sider>
      </Layout>

      <Footer style={{ textAlign: "center", padding: "10px", background: "#001529", color: "white" }}>
        FDXNETWORKS ©2025 Created by LimJungWoo
      </Footer>
    </Layout>
  );
}

export default LayoutComponent;
