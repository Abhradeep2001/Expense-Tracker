import { auth, provider } from "../../config/firebase-config" 
import { signInWithPopup } from "firebase/auth"
import { Navigate, useNavigate } from "react-router-dom"
import { useGetUserInfo } from "../../custom-hooks/useGetUserInfo";
import "./styles.css";

export const Auth = () => {

  const navigate=useNavigate();

  const {isAuth}=useGetUserInfo();

  //function to sign in with google
  const signInWithGoogle= async()=>{
    const result = await signInWithPopup(auth, provider);

    //Object to store information about the user
    const userInfo={
      userID: result.user.uid,
      userName: result.user.displayName,
      userPhoto: result.user.photoURL,
      isAuth: true,
    }
    //To convert 'userInfo' object into string and saving it inside local-storage
    localStorage.setItem("auth", JSON.stringify(userInfo))
    // console.log(result);

    //After login, redirect to "/expense-tracker page"
    navigate("/expense-tracker")
  }

  //If user is already logged in
  if(isAuth)
    return <Navigate to="/expense-tracker"/>
  

  return (
    <div className="login-page">
      <h1>Welcome to Expense Tracker!!</h1>
      <p>Login In With your Google Account</p>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign In With Google
      </button>
    </div>
  )
}
