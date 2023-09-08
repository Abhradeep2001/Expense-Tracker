//This hook basically returns an object containing all the userInfo inside of our local-storage

export const useGetUserInfo=()=>{
    //Converting stringify objects into JSON object
    const {userID, userName, userPhoto, isAuth}=JSON.parse(localStorage.getItem("auth")) || {};

    return {userID, userName, userPhoto, isAuth};

}