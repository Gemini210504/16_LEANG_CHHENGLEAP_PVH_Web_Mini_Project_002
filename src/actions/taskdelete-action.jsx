import { auth } from "@/auth";

export const deleteAction = async (_, { taskId, workspaceId }) => {
  console.log("TaskId in delete: ", taskId)
  console.log("Workspace in delete: ", workspaceId);
 
  if (!taskId || !workspaceId) {
    return { error: "Missing taskId or workspaceId" };
  }

  const session = await auth();
  console.log("Session in delete: ", session);
  if (!session?.token) {
    return { error: "User not authenticated" };
  }

  const response = await fetch(
    `http://96.9.81.187:8080/api/v1/task/${taskId}/workspace/${workspaceId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
    }
  );

  if (response.ok) {
    return { success: "Task deleted successfully" };
  } else {
    const errorResponse = await response.json();
    return { error: errorResponse?.message || "Failed to delete task" };
  }
};
