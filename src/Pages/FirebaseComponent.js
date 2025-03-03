"use client"; 

import React, { useEffect } from "react";
import { requestPermission } from "../utils/firebase";

const FirebaseComponent = () => {
  useEffect(() => {
    requestPermission();
  }, []);

  return <div></div>;
};

export default FirebaseComponent;
