"use server";

import { auth } from "@/auth";

export const workspaceAction = async (_, formData) => {
  const session = await auth();
  const workspaceName = formData.get("workspaceName");


  try {
    const res = await fetch("http://96.9.81.187:8080/api/v1/workspace", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
      body: JSON.stringify({ workspaceName }),
    });

    if (!res.ok) {
      throw new Error("Failed to create workspace");
    }

    const data = await res.json();
    console.log("Workspace created successfully:", data);
    return data;
    
    
  } catch (error) {
    console.error("Error creating workspace:", error);
    return { errorU: error.message };
  }
  
};
