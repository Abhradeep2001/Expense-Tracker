import { useState } from "react";
//importing our custom hooks
import { useAddTransaction } from "../../custom-hooks/useAddTransaction"
import { useGetTransactions } from "../../custom-hooks/useGetTransactions";
import { useGetUserInfo } from "../../custom-hooks/useGetUserInfo";

import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { Navigate, useNavigate } from "react-router-dom";
import "./styles.css"

export const ExpenseTracker = () => {

  const navigate=useNavigate();
  const {isAuth}=useGetUserInfo()

  const {addTransaction}=useAddTransaction();
  const {transactions, transactionTotal}=useGetTransactions();
  const {userName,userPhoto}=useGetUserInfo();

  //State variables to store form-data
  const [description, setDescription]=useState("");
  const [transactionAmount, setTransactionAmount]=useState(0);
  const [transactionType, setTransactionType]=useState("expense");

  const handleSubmit=(event)=>{

    event.preventDefault();
    addTransaction({
      description : description,
      transactionAmount: transactionAmount,
      transactionType: transactionType
    })
    setDescription("");
    setTransactionAmount("");

  }

  const userSignOut= async()=>{
    try{
    await signOut(auth);
    //Cleanup
    localStorage.clear();
    
    navigate("/");
    }
    catch(error){
      console.log(error);
    }
  }
  //If user is not logged in
  if(!isAuth)
    return <Navigate to="/"/>

  return (
    <>
    <div className="expense-tracker">
        <div className="container">
          <h1>Expense Tracker</h1>
          <h2>Current User: {userName}</h2>
          <div className="balance">
            <h3> Your Balance</h3>
            {transactionTotal.total >= 0 ? <h2> Rs {transactionTotal.total}</h2> : <h2> -Rs {transactionTotal.total * -1}</h2>}
          </div>
          <div className="summary">
            <div className="income">
              <h4> Income</h4>
              <p>Rs {transactionTotal.income}</p>
            </div>
            <div className="expenses">
              <h4> Expenses</h4>
              <p>Rs {transactionTotal.expense}</p>
            </div>
          </div>
          <form className="add-transaction" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Description"
              value={description}
              required
              onChange={(event) => setDescription(event.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              value={transactionAmount}
              required
              onChange={(event) => setTransactionAmount(event.target.value)}
            />
            <input
              type="radio"
              id="expense"
              value="expense"
              checked={transactionType === "expense"}
              onChange={(event) => setTransactionType(event.target.value)}
            />
            <label htmlFor="expense"> Expense</label>
            <input
              type="radio"
              id="income"
              value="income"
              checked={transactionType === "income"}
              onChange={(event) => setTransactionType(event.target.value)}
            />
            <label htmlFor="income"> Income</label>

            <button type="submit"> Add Transaction</button>
          </form>
        </div>
        {userPhoto && (
          <div className="profile">
            {" "}
            <img className="profile-photo" src={userPhoto} />
            <button className="sign-out-button" onClick={userSignOut}>
              Sign Out
            </button>
          </div>
        )}
      </div>
      <div className="transactions">
      <h3>Transactions</h3>
      <table className="transaction-table">
        <thead>
            <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Type</th>
            </tr>
        </thead>
        <tbody>
            {transactions.map((transaction) => {
                const { id, description, transactionAmount, transactionType } =
                    transaction;
                return (
                    <tr key={id}>
                        <td>{description}</td>
                        <td>${transactionAmount}</td>
                        <td>
                            <label
                                style={{
                                    color: transactionType === "expense" ? "red" : "green",
                                }}
                            >
                                {transactionType}
                            </label>
                        </td>
                    </tr>
                );
            })}
        </tbody>
    </table>
    </div>
  </>
  )
}