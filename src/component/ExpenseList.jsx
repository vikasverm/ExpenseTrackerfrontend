import "../App.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPenToSquare,faTrash} from "@fortawesome/free-solid-svg-icons";
export default function ExpenseList() {
  const [expenseItem, setExpenseitem] = useState("");
  const [expensePrice, setExpenseprice] = useState("");
  const [transactionValue, setTransactionValue] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [dark, setDark] = useState("rgb(245 245 244)");
  const [toDoId, setToDoId] = useState("")
  const addToDo = (expenseItem,setExpenseitem,expensePrice,setAmount,setTransactionValue) => {
    if (expenseItem.trim() !== "" && expensePrice.trim() !== "") {
      axios
        .post("http://localhost:3001/add", {
          expenseItem,
         
        expensePrice})
        .then(() => toast.success("added succesfully"))
        .catch((err) => console.log(err));
allData(setTransactionValue)
setExpenseitem("");
      setAmount("");
    }
  };

  const updateMode = (id, expenseItem, expensePrice) => {
    setExpenseitem(expenseItem);
    setIsUpdating(true)
    setExpenseprice(expensePrice);
setToDoId(id)
  };
const allData=(setTransactionValue)=>
{
  axios
  .get("http://127.0.0.1:3001/get")
  .then(({data}) => {
    setTransactionValue(data)
  })
  .catch((err) => console.log(err));
}

 allData(setTransactionValue);

  const deleteAmount = (id) => {
    axios
      .delete("http://127.0.0.1:3001/deleteItem/" + id)
      .then(() => {
        toast.success("deleted succesfully")
        window.location.reload();
      })
      .catch((err) => console.log(err));
    console.log(id);

 
  };

  const UpdateTodo=(toDoId,expenseItem,expensePrice,setExpenseitem,setAmount,setIsUpdating,setTransactionValue)=>
  {
  axios.post('http://127.0.0.1:3001/update',{_id:toDoId,expenseItem,expensePrice}).then(
    ()=>{
      toast.success("updated succesfully");
    setExpenseitem("")
      setIsUpdating(false)
      setAmount("")
      
      allData(setTransactionValue)}
    
  ).catch((err)=>console.log(err))
  }
  const incomeResult = transactionValue.map((data) => data.expensePrice);
  let result = incomeResult.map((i) => Number(i));

  const incomeValue = result
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expenseValue = result
    .filter((item) => item < 0)
    .reduce((incomeValue, a) => incomeValue - a, 0)
    .toFixed(2);

  //dark mode
  var root = document.getElementById("root");
  root.style.backgroundColor = dark;
  const darkMode = () => {
    if (dark !== "rgb(245 245 244)") {
      var text1 = document.getElementById("section");

      text1.style.color = "black";
      setDark("white");
    } else {
      var text2 = document.getElementById("section");

      text2.style.color = "white";
      setDark("black");
    }
  };
  return (
    <>
    <section id="section">
      <div className="grid grid-cols-1 lg:grid-cols-2 ">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16  lg:px-8 lg:py-24   bg-white  
shadow-md rounded-sm">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md b ">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-1xl ">
              Add New Transaction
            </h2>
            <form action="#" method="POST" className="mt-8 ">
              <div className="space-y-5 ">
                <div className="">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Text:-{" "}
                    </label>
                  </div>
                  <div className="mt-2 flex justify-center">
                    <input
                      className="flex h-10 w-80 rounded-md border  border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Enter Text"
                      id="text"
                      value={expenseItem}
                      required
                      onChange={(e) => setExpenseitem(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-start">
                    <label
                      htmlFor="Amount"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Amount:-{""}
                      <br />
                    </label>
                  </div>
                  <p className="flex text-slate-600 justify-center">
                    (negative-expense,positive-income)
                  </p>

                  <div className="mt-2 flex justify-center ">
                    <input
                      className="flex h-10 w-80 rounded-md  border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="number"
                      placeholder="Amount"
                      id="amount"
                      value={expensePrice}
                      required
                      onChange={(e) => setExpenseprice(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-center">
                  <button
                    type="button"
                    className="h-10 w-80 rounded-md  border text-white flex justify-center font-bold bg-black px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={isUpdating?()=>UpdateTodo(toDoId,expenseItem,expensePrice,setExpenseitem,setExpenseprice,setIsUpdating,setTransactionValue):()=>addToDo(expenseItem,setExpenseitem,expensePrice,setExpenseprice,setTransactionValue)}
                  >
                    {isUpdating ? "Go" : "Add Transaction"}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="">
          <div className="flex justify-end">
            <button onClick={darkMode}>
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            </button>
          </div>

          <h1 className=" text-3xl font-bold ">EXPENSE TRACKER </h1>

          <h2 className="flex pl-20 pt-20">YOUR BALANCE</h2>
          <span className=" flex ml-20 text-4xl font-bold">
            ₹{incomeValue - expenseValue}
          </span>
          <div className="lg:w-[600px] w-full shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] h-20  bg-white  ml-auto mt-5 ">
            <div className="pt-4 flex justify-center space-x-40   border-spacing-x-1 h-70 ">
              <div >
                <h1 className=" font-bold w-1/2 ">INCOME</h1>
                <span className="  font-bold text-lime-600	 text-xl">
                  +₹ {incomeValue}
                </span>
              </div>

              <div className="">
                <h1 className=" font-bold w-1/2 ">EXPENSES</h1>
                <span className=" font-bold text-red-600 text-xl">
                  -₹{expenseValue}{" "}
                </span>
              </div>
            </div>
          </div>

          <div className="">
            <h1 className="flex ml-20 mt-10   justify-start border-b-4 text-lg	">
              Transaction
            </h1>
            <div className="ml-20">
              <ul className="shadow-md">
                {transactionValue.map((data, index) => {
                  return (
                    <div key={index}>
                      <li className="flex p-3 bg-white">
                      <span className="pl-4  w-96 "> {" "}
                        {data.expenseItem}{" "}</span> {" "}
                      
                        <span className=" font-bold text-lg">
                          {" "}
                          {data.expensePrice}
                        </span>
                        <br />
                        <div
                          style={{ width: "400px" }}
                          className="flex justify-end"
                        >
                          <button
                            onClick={() =>
                              updateMode(
                                data._id,
                                data.expenseItem,
                                data.expensePrice
                              )
                            }
                            className="rounded-md bg-black ml-20 px-3 py-2  text-white "
                          >
                           <FontAwesomeIcon icon={faPenToSquare} />

                          </button>

                          <button
                            onClick={() => deleteAmount(data._id)}
                            className="rounded-md  bg-black lg:ml-20 px-3 py-2  text-white"
                          >
                          <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </li>
                      <hr />
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <ToastContainer />
    </>
  );
}
