import React from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { format } from "date-fns";
import { cookies } from "next/headers";
import Withdraw from "@/Components/Withdraw/Withdraw";

const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL





const fetchWalletTransaction=async(userId)=>{
  try {
    const response=await axios.get(`${BASE_URL}/business-info/sellerInfo?ownerId=${userId}`);

    return response.data?.data?.businessInfo


    
  } catch (error) {
    console.log(error,"error in wallet");
    
    
  }
}

const WithdrawalRequest = async() => {
  const cookieStore=cookies();
  const userId = cookieStore.get(`userId`)?.value;

  const  transactionsWallet=await fetchWalletTransaction(userId);
  console.log(transactionsWallet,"transactionsWallet")
  return (
    <div className="mx-auto p-4 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-blue-600 font-semibold text-lg">Withdrawal Request</h2>
        <div className="flex gap-2 items-center justify-center">
        <span className="text-gray-800 font-bold text-lg">
          Balance: <span className="text-blue-600">₹{transactionsWallet?.walletBalance ? transactionsWallet?.walletBalance.toFixed(2) :"0"}</span>
        </span>
<Withdraw amount={transactionsWallet?.walletBalance} fetchWalletTransaction={fetchWalletTransaction()}/>
        </div>
      </div>
      <div className="mt-4 space-y-4">
        {[...transactionsWallet?.walletTransactions ?? []]?.slice().reverse().map((transaction) => {
            const duration = formatDistanceToNow(new Date(transaction.createdAt), { addSuffix: true });
            return(
            <div key={transaction._id} className="flex items-center justify-between border border-[#E1E6EF] p-4 rounded-lg shadow-sm">
              <div>
                <h3 className="text-gray-800 font-semibold">{transaction._id}</h3>
                <p className="text-gray-500 text-sm">{transaction._id} • Duration: {duration}</p>
              </div>
              <div className="text-right">
                <span className={`text-sm font-semibold  ${transaction.transactionType === 'order' ?"text-green-500" :" text-[#FF2D55]"}`}  >{transaction.transactionType === 'order' ? '+' : '-'} ₹{transaction.amount}
                  {/* + ₹ */}
                </span>
                <div className="text-gray-500 text-xs">
  {format(new Date(transaction.createdAt), "dd-MM-yyyy")} • {format(new Date(transaction.createdAt), "hh:mm a")}
</div>
              </div>
            </div>
  )})}
      </div>
    </div>
  );
};

export default WithdrawalRequest;
