import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { adduser, removeuser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";
import { USER_AVATAR } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { changeLanguage } from "../utils/configSlice";

const Header = ()=>{
  const dispatch = useDispatch();

    const navigate = useNavigate();
    const user = useSelector((store)=>store.user)
    const showGptSearch = useSelector((store)=> store.gpt.showGptSearch);



    const handleGptSearchClick = ()=>{
      dispatch(toggleGptSearchView());
    }



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


    const handleLanguageChange =(e)=>{
      console.log(e.target.value)
      dispatch(changeLanguage(e.target.value));

    }


    return(
        <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between items-center">
        {/* Left Component */}
        <img
          className="w-44 mx-auto md:mx-0"
          src={LOGO}
          alt="Netflix Logo"
        />
      
        {/* Right Components */}
        {user &&(
             <div className="flex items-center gap-4">
              {
                showGptSearch &&
               ( <select className="p-2 m-2 bg-gray-900 text-white rounded-lg" onChange={handleLanguageChange}>
                {SUPPORTED_LANGUAGES.map(lang=> <option key={lang.identifier} value={lang.identifier}>{lang.name}</option> )}
            
              </select>)}
              <button className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg" onClick={handleGptSearchClick}>
                {showGptSearch?"HOMEPAGE":"GPT SEARCH"}
              </button>
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