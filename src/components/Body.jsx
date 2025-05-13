import Browse from "./Browse";
import Login from "./Login";
import React, { useEffect } from 'react'
import { createBrowserRouter} from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { adduser, removeuser } from "../utils/userSlice";


const Body = () => {
    const dispatch= useDispatch();
    


    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/browse",
            element: <Browse />
        },
    ])

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
               //user signed in
                const {uid, email,displayName} = user;
                dispatch(adduser({uid:uid,email:email,displayName:displayName}))
                
                
            } else {
                // User is signed out
                dispatch(removeuser())
               
            }
        });
    }, [])

    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
}

export default Body;