import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import LayoutComponent from "./component/LayoutComponent"; // 레이아웃 컴포넌트
import TodoHistory from './page/TodoHistory'; // Todo 페이지
import Calendar from './page/Calendar'; // Calendar 페이지

function App() {
  return (
    <Router>
      <MainComponents />
    </Router>
  );
}

function MainComponents() {
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    // 처음에만 /todo로 리디렉션하기 위해 sessionStorage 사용
    if (!sessionStorage.getItem("hasVisited")) {
      navigate('/calendar', { replace: true });
      sessionStorage.setItem("hasVisited", "true");
    }
  }, [navigate]);

  return (
    <LayoutComponent>
      <Routes>
        {/* Todo 페이지 */}
        <Route path="/todoHistory" element={<TodoHistory />} />
        {/* Calendar 페이지 */}
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </LayoutComponent>
  );
}

export default App;
