"use client"

import axios from 'axios'
import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { TrendingUp } from 'lucide-react'
import {Input} from "reactstrap"
import Swal from 'sweetalert2'

const Withdraw = ({fetchWalletTransaction}) => {
    const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
    const token = Cookies.get("userToken");
    const [isWithDrawlOpen, setIsWithdrawlOpen] = useState(false);
    const [amount, setAmount] = useState(0);
    console.log(amount,"amount")

    const handleWithDrawRequest = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/wallet/withdraw-requset`, {
                amount: amount
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data, "resposne of wallet")
            if(response.data.success === true){
                
                setIsWithdrawlOpen(false)
                Swal.fire({
                    title: "Done",
                    text: response.data.message,
                    icon: "success",
                    confirmButtonText: "OK"
                  }).then(async() => {
                    setIsWithdrawlOpen(false);
                    await fetchWalletTransaction();
                    window.location.reload()
                  });
                  
             

            }


        } catch (error) {
            console.log(error, "error in wallet")

        }
    }
    return (
        <>
            <button className="bg-red-600 p-2 text-white border border-red-300 rounded-lg font-semibold" onClick={() => setIsWithdrawlOpen(TrendingUp)}>
                Withdrawal
            </button>
            {isWithDrawlOpen && (
                <div className="modal-overlay" onClick={() => setIsWithdrawlOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={() => setIsWithdrawlOpen(false)}>
                            ✕
                        </button>
                        <div className='p-10 flex flex-col gap-3'>
                          <div className='flex flex-col gap-1'>
                                <label className='text-[14px]'>Enter Withdrawl amount</label>
                                <div className='text-[10px]'><span className='font-[500] text-[12px]'>Note:</span> Maxiumum amount should be 100 Rs</div>
                                </div>
                                <Input
                                    type='tel'
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder='enter withdrawl amount'
                                    className='border border-red-600 p-2 rounded-lg'
                                    pattern="[0-9]{10}"
                                    maxLength="10"
                                    required
                                />

<button className="bg-red-600 p-2 text-white border border-red-300 rounded-lg font-semibold" onClick={() => handleWithDrawRequest()}>
                Withdrawal
            </button>
                        </div>
                        {/* <WithdrawlPopup setIsWithdrawlOpen={setIsWithdrawlOpen} /> */}
                    </div>
                </div>
            )}
        </>
    )
}

export default Withdraw