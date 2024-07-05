import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import TodoList from "./pages/todo/TodoList";

export default function App() {
  return (
    <div>
      {/* <Login/>
      <TodoList/> */}
      <Router>
          <Routes>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/TodoList" element={<TodoList />} />
            {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </Router>
    </div>
    
  );
}
