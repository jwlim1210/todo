import React from "react";
import { Layout, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Link } from "react-router-dom";

const { Header, Footer, Sider, Content } = Layout;

function LayoutComponent({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="layout-header">
        <div style={{ textAlign: "center" }}>
          <h2>FDXNETWORKS</h2>
        </div>

        <Button
          onClick={toggleCollapse} 
          style={{
            background: "#f0f2f5",
            position: "absolute",
            top: 15,
            fontSize: "20px", 
            right: collapsed ? 40 : 200, 
            transition: "right 0.3s", 
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </Header>


      <Layout style={{ position: "relative" }}>
        <Sider width={collapsed ? 0 : 200} className="layout-sidebar-left">
          <nav>
            <Link to="/calendar"><h3>📅 Calendar </h3></Link>
            <Link to="/todoHistory"><h3 style={{ marginTop: "20px" }}> 📝 History </h3></Link>
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

      <Footer className="layout-footer">
        FDXNETWORKS ©2025 Created by LimJungWoo
      </Footer>
    </Layout>
  );
}

export default LayoutComponent;
