import {addDoc, collection, serverTimestamp} from 'firebase/firestore'
import { database } from '../config/firebase-config'
import { useGetUserInfo } from './useGetUserInfo';


//defining our custom hook
export const useAddTransaction=()=>{

    //importing userID from our custom-hook
    const {userID}=useGetUserInfo();

    //reference to our collection in the database
    const transactionRef=collection(database,"transactions");

    //Function to add Transactions (doc) to our collection in firebase
    const addTransaction= async({
        description,
        transactionAmount,
        transactionType
    })=>{
        await addDoc(transactionRef,{
            userID,
            description,
            transactionAmount,
            transactionType,
            createdAt: serverTimestamp(),
        })
    }
    return {addTransaction}

}