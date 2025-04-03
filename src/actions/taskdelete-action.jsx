"use server";

import { auth } from "@/auth"; // Assuming auth is a function that handles user authentication
import { fetchWorkspace } from "@/service/dashboard-service"; // Assuming fetchWorkspace is for fetching workspace info

export const deleteAction = async (_, { taskId, workspaceId }) => {
  try {
    // Step 1: Authenticate the user and fetch necessary details
    const session = await auth();
    const workspaceData = await fetchWorkspace();

    const workspace = workspaceData?.payload?.find(
      (ws) => ws.workspaceId === workspaceId
    );

    if (!workspace) {
      throw new Error("Workspace not found");
    }

    if (!session?.token) {
      throw new Error("User not authenticated");
    }

    const res = await fetch(
      `http://96.9.81.187:8080/api/v1/task/${taskId}/workspace/${workspaceId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
      }
    );

    // Step 3: Handle response
    if (!res.ok) {
      const errorResponse = await res.json();
      throw new Error(errorResponse?.message || "Failed to delete task");
    }

    // Return success response if task is deleted
    return { success: true, message: "Task deleted successfully" };
  } catch (error) {
    console.error("Error deleting task:", error.message);
    return { error: error.message };
  }
};
