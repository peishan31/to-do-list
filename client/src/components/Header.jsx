import React from 'react';
import { useDispatch } from 'react-redux';
import { signOutSuccess } from '../redux/user/userSlice';
import { getAuth, signOut } from 'firebase/auth';
import { Navbar, Button } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const dispatch = useDispatch();
    const auth = getAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => {
            dispatch(signOutSuccess());
            navigate('/');
        }).catch((error) => {
            console.error("Error signing out:", error);
        });
    };

    return (
        <Navbar fluid={true} className="bg-white shadow-md w-full">
            <div className="container mx-auto flex justify-between items-center">
                <Navbar.Brand href="/">
                    <span className="self-center whitespace-nowrap text-xl font-semibold text-blue-600">
                        To Do App
                    </span>
                </Navbar.Brand>
                <div className="flex">
                    <Link to="/" onClick={handleLogout} className="nav-link text-gray-700 hover:text-blue-600">
                        Logout
                    </Link>
                </div>
            </div>
        </Navbar>
    )
}

export default Header