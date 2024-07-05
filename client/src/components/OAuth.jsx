import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth' 
import { useDispatch } from 'react-redux';
import { app } from '../firebase'
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {

    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider);
            console.log(resultsFromGoogle);
            const res = await fetch("/api/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL
                })
            });

            if (!res.ok) {
                throw new Error('Failed to authenticate with Google');
            }
        
            const data = await res.json();
            dispatch(signInSuccess(data)); // Dispatching the user data to Redux store
            navigate("/todolist");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <Button
                type="button"
                outline
                className="flex items-center space-x-2 p-2 rounded-lg"
                onClick={handleGoogleClick}
            >
                <AiFillGoogleCircle className="w-6 h-5 mr-2" />
                <span>Continue with Google</span>
            </Button>
        </div>

    )
}

export default OAuth