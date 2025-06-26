import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { adduser, removeuser } from "../utils/userSlice";
import { LOGO } from "../utils/constants.jsX";
import { USER_AVATAR } from "../utils/constants.jsX";

const Header = ()=>{
  const dispatch = useDispatch();

    const navigate = useNavigate();
    const user = useSelector((store)=>store.user)
    const handleSignOut = () =>{
        

        signOut(auth).then(() => {

          }).catch((error) => {
            navigate("/error")
          });
          
    }
 useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
               //user signed in
                const {uid, email,displayName} = user;
                dispatch(adduser({uid:uid,email:email,displayName:displayName}))
                navigate("/browse")
                
            } else {
                // User is signed out
                dispatch(removeuser())
                navigate("/")
               
            }
        });

        //unsubscribe when componenet unmounts
        return ()=> unsubscribe();
    }, [])


    return(
        <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between items-center">
        {/* Left Component */}
        <img
          className="w-44"
          src={LOGO}
          alt="Netflix Logo"
        />
      
        {/* Right Components */}
        {user &&(
             <div className="flex items-center gap-4">
          <img
            className="w-10 h-10  object-cover"
            src={USER_AVATAR}
            alt="user-icon"
          />
          <button className="text-white hover:underline " onClick={handleSignOut}>(Sign Out)</button>
        </div>
        )}
      </div>
      
    )
}

export default Header;