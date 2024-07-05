import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useNavigate } from "react-router-dom";
import { getAuth } from 'firebase/auth';
import Login from "./pages/auth/Login";
import TodoList from "./pages/todo/TodoList";
import ProtectedRoutes from './utils/ProtectedRoutes';
import { signInSuccess } from './redux/user/userSlice';

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn=='true' && storedUser) {
      dispatch(signInSuccess(JSON.parse(storedUser)));
      navigate("/todolist");
    }
  }, [dispatch]);

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
