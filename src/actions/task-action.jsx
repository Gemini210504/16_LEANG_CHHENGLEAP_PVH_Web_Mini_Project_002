"use server";

import { auth } from "@/auth";
import {  postTask } from "@/service/dashboard-service";

export const taskAction = async (_, formData) => {
  
    const session = await auth();
    const taskTitle = formData.get("taskTitle");
    const taskDetails = formData.get("taskDetails");
    const tag = formData.get("tag");
    const endDate = formData.get("endDate");

    if (!session?.token) {
      console.error("Authentication failed: No session token found");
      return { error: "User not authenticated" };
    }

    console.log("taskTitle:", taskTitle);
    console.log("taskDetails:", taskDetails);
    console.log("tag:", tag);
    console.log("endDate:", endDate);

    await postTask(taskTitle, taskDetails, tag, endDate);

    
};
