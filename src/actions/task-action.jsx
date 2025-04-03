"use server";

import { auth } from "@/auth";
import { fetchWorkspace } from "@/service/dashboard-service";

export const taskAction = async (_, formData) => {
  const session = await auth();
  const taskTitle = formData.get("taskTitle");
  const taskDetails = formData.get("taskDetails");
  const tag = formData.get("tag");
  const endDate = formData.get("endDate");
  const workspaceId = await fetchWorkspace();
  console.log ("Wordspace id : ", workspaceId?.workspaceId)
  try {
    const res = await fetch(
      `http://96.9.81.187:8080/api/v1/tasks/workspace/238c65d4-9dab-425e-b16d-22b3750a439a`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`,
        },
        body: JSON.stringify({ taskTitle, taskDetails, tag, endDate }),
      }
    );


    if (!res.ok) {
      throw new Error("Failed to create task");
    }

    const data = await res.json();
    console.log("Task created successfully:", res);
    return res;
    
    
  } catch (error) {
    console.error("Error creating Task:", error);
    return { errorU: error.message };
  }
  
};
