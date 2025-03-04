import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Router, Routes 추가
import LayoutComponent from "./component/LayoutComponent"; // 레이아웃 컴포넌트
import Todo from './page/Todo'; // Todo 페이지
import Calendar from './page/Calendar'; // Calendar 페이지

function App() {
  return (
    <Router>
      {/* LayoutComponent로 기본 레이아웃을 감싸고 Routes로 페이지 이동 */}
      <LayoutComponent>
        <Routes>
          {/* Todo 페이지 */}
          <Route path="/todo" element={<Todo />} />
          {/* Calendar 페이지 */}
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </LayoutComponent>
    </Router>
  );
}

export default App;
