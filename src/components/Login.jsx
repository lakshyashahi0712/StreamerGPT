
import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { adduser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constants.jsX";
import { BG_IMG } from "../utils/constants.jsX";



const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();


    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }
    const handleFormSubmit = (e) => {
        e.preventDefault(); // ✅ stops page reload
        // Logic for Sign In or Sign Up goes here
    };

    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);


    const handleButtonClick = () => {
        const message = checkValidData(email.current.value, password.current.value)

        // console.log(email)
        // console.log(password)
        setErrorMessage(message)


        if (!isSignInForm) {
            //sign up logic

            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value, photoURL: {USER_AVATAR}
                    }).then(() => {
                        const { uid, email, displayName } = auth.currentUser;
                        dispatch(adduser({ uid: uid, email: email, displayName: displayName }))

                        // ...
                    }).catch((error) => {
                        setErrorMessage(error.message)
                    });


                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage)
                });



        }
        else {
            //sign in logic

            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(error.message);
                    setErrorMessage(errorCode + "-" + errorMessage)
                });


        }
    }

    return (
        <div>
            <Header />
            <div className="absolute">
                <img src={BG_IMG} alt="bg-image" />
            </div>
            <form onSubmit={handleFormSubmit} className="absolute p-12 w-3/12 my-36 mx-auto right-0 left-0 bg-black/75 rounded-lg">
                <h1 className="text-white text-4xl font-bold">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>
                {!isSignInForm && (<input ref={name} type="text" placeholder="Full Name" className="p-2 mb-3 mt-11 bg-gray-200 w-11/12 rounded-lg" />)}
                <input ref={email} type="text" placeholder="Email Address" className="p-2 mb-3 mt-3 bg-gray-200 w-11/12 h-2/12 rounded-lg" />
                <input ref={password} type="password" placeholder="Password" className="p-2 mb-3 mt-3 bg-gray-200 w-11/12 rounded-lg" />
                <p className="text-red-600 font-bold text-lg py-2">{errorMessage}</p>
                <button className="p-4 mb-3 mt-3 w-11/12 bg-red-600 font-extrabold text-white rounded-lg" onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className="text-white py-4 cursor-pointer" onClick={toggleSignInForm}>
                    {isSignInForm ? "New to Netflix ? Sign Up Now" : "Already a User ? Sign In now"}</p>
            </form>
        </div>
    )
}
export default Login;