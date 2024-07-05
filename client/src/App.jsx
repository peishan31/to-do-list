import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import TodoList from "./pages/todo/TodoList";
import ProtectedRoutes from './utils/ProtectedRoutes';

export default function App() {
  return (
    <div>
        <Routes>
          <Route index element={<Login />} />
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/TodoList" element={<TodoList />} /> */}
          <Route element={<ProtectedRoutes/>}>
            <Route path="/TodoList" element={<TodoList />} />
          </Route>
          {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </div>
    
  );
}
