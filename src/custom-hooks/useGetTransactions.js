import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react"
import { database } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions=()=>{

    //State to keep track of transactions
    const [transactions, setTransactions]=useState([]);

    //State to store total available balance
    const [transactionTotal, setTransactionTotal]=useState({
        total: 0.0,
        income: 0.0,
        expense: 0.0
    })

    // getting the userID from our custom-hook
    const {userID}=useGetUserInfo();

    //Reference to our collection in the database
    const transactionRef=collection(database,"transactions");

    const getTransactions= async()=>{
        let unsubscribe;
        try{
            const queryTransactions=query(transactionRef, where("userID","==",userID),orderBy("createdAt"));

            //To keep track of changes
             unsubscribe = onSnapshot(queryTransactions, (snapshot)=>{
                let docs=[];
                //Keep track og total expense
                let totalExpense=0;
                //Keep track of total income
                let totalIncome=0;
                //Looping through each item of the snapshot array
                snapshot.forEach((doc)=>{
                    const data=doc.data();
                    const id=doc.id;
                    
                    //Filtered data
                    docs.push({...data, id});

                    //If it is an expense
                    if(data.transactionType === "expense"){
                        totalExpense += Number(data.transactionAmount);
                    }
                    //If it is an income
                    else{
                        totalIncome += Number(data.transactionAmount);
                    }
                })
                setTransactions(docs);
                setTransactionTotal({
                    total: totalIncome-totalExpense,
                    income: totalIncome,
                    expense: totalExpense,
                })
            })
            
        }
        catch(error){
            console.log(error);
        }
        return ()=>{
                unsubscribe();
            }
    }
        
    useEffect(()=>{
        getTransactions();
    } , )

    return {transactions, transactionTotal};

}