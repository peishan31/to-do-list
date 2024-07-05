import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai' 

const OAuth = () => {
    return (
        <Button 
            type="button" 
            outline 
            className="flex items-center space-x-2 p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-blue-300">
            <AiFillGoogleCircle className="w-6 h-6 mr-2"/>
            <span>Sign in with Google</span>
        </Button>
    )
}

export default OAuth