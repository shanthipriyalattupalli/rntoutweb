"use client"

import Subscription from '@/Components/Home/Subscription'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";
import { FaRegCheckCircle } from "react-icons/fa";




const page = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
      const [isSubscription, setIsSubscription] = useState(false);
        const [subscriptionPlans, setSubscriptionPlans] = useState([]);
          const [userPlans, setUserPlans] = useState([]);
        
        const userId = Cookies.get("userId");
        const token = Cookies.get("userToken") || null;

        const fetchSubscriptionPlans = async () => {
          try {
            const response = await axios.get(`${BASE_URL}/subscription-plans/plans`);
            setSubscriptionPlans(response.data.data);
            console.log(response.data.data, "subscription plans");
          } catch (error) {
            console.log(error, "error")
      
      
          }
        }
      
        useEffect(() => {
          fetchSubscriptionPlans()
        }, []);



          const fetchUserSubscriptionPlans = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/subscription-plans/user-plans`, {
        headers: { Authorization: `Bearer ${token}` },
      });


      const activePlan = response.data.data.find(plan => plan.isActive === true);

      if (activePlan) {
        setUserPlans(activePlan);
        Cookies.set("planId", activePlan.planId, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });
      } else {
        console.warn("No active subscription plan found.");
      }

    } catch (error) {
      console.log(error, "error");
    }
  };


  useEffect(() => {
    fetchUserSubscriptionPlans()

  }, [])
    
    return (
        <>
        
        

                      
                        <Subscription setIsSubscription={setIsSubscription} plans={subscriptionPlans} userPlans={userPlans} />
           
              
        </>
    )
}

export default page