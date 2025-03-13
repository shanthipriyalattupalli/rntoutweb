import React from "react";

const transactions = [
  { id: 1, name: "John Doe", number: "#123456789", duration: "2 days", amount: 1000, type: "credit", date: "16 Sep 2023", time: "11:21 AM" },
  { id: 2, name: "Emma Watson", number: "#987654321", duration: "4 days", amount: 2400, type: "credit", date: "16 Sep 2023", time: "11:21 AM" },
  { id: 3, name: "Michael Smith", number: "#456789123", duration: "1 day", amount: 2345, type: "credit", date: "16 Sep 2023", time: "11:21 AM" },
  { id: 4, name: "Olivia Brown", number: "#321654987", duration: "5 days", amount: 2455, type: "credit", date: "16 Sep 2023", time: "11:21 AM" },
  { id: 5, name: "William Johnson", number: "#159357486", duration: "4 days", amount: 5545, type: "credit", date: "16 Sep 2023", time: "11:21 AM" },
  { id: 6, name: "Sophia Wilson", number: "#753951486", duration: "1 day", amount: 999, type: "credit", date: "16 Sep 2023", time: "11:21 AM" },
  { id: 7, name: "James Anderson", number: "#852741963", duration: "10 days", amount: 10000, type: "credit", date: "16 Sep 2023", time: "11:21 AM" },
  { id: 8, name: "Isabella Martinez", number: "#456123789", duration: "2 days", amount: 4200, type: "credit", date: "16 Sep 2023", time: "11:21 AM" },
  { id: 9, name: "Alexander Taylor", number: "#369852147", duration: "7 days", amount: 7000, type: "credit", date: "16 Sep 2023", time: "11:21 AM" },
];


const WithdrawalRequest = () => {
  return (
    <div className="mx-auto p-4 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-blue-600 font-semibold text-lg">Withdrawal Request</h2>
        <div className="flex gap-2 items-center justify-center">
        <span className="text-gray-800 font-bold text-lg">
          Balance: <span className="text-blue-600">₹35,000</span>
        </span>
        <button className="bg-red-600 p-2 text-white border border-red-300 rounded-lg font-semibold">
         Withdrawal
        </button>
        </div>
      </div>

      {/* Transaction List (Filtered for Credit Transactions) */}
      <div className="mt-4 space-y-4">
        {transactions
          .filter(transaction => transaction.type === "credit") // Filter only credit transactions
          .map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between border border-[#E1E6EF] p-4 rounded-lg shadow-sm">
              {/* Left Side */}
              <div>
                <h3 className="text-gray-800 font-semibold">{transaction.name}</h3>
                <p className="text-gray-500 text-sm">{transaction.number} • Duration: {transaction.duration}</p>
              </div>

              {/* Right Side */}
              <div className="text-right">
                <span className="text-sm font-semibold text-green-500">
                  + ₹{transaction.amount}.0
                </span>
                <p className="text-gray-500 text-xs">{transaction.date} • {transaction.time}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WithdrawalRequest;
