import { auth } from "@/auth";


export async function fetchUser() {
  const session = await auth();
  console.log("Session in dashboard: ", session);

  if (!session?.token) {
    return <div>Error: User not authenticated. Please log in.</div>;
  }

  const res = await fetch("http://96.9.81.187:8080/api/v1/user", {
    method: "GET",
    headers: { Authorization: `Bearer ${session.token}` },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }

  const data = await res.json();

  return data;
}



export async function fetchWorkspace() {
    const session = await auth();
    console.log("Session in dashboard: ", session);

    const res = await fetch(
      "http://96.9.81.187:8080/api/v1/workspaces",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${session.token}` },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch workspace data");
    }

    const data = await res.json();

    return data;
  
}

export async function fetchTask(workspaceId) {
  console.log("fetchTask id: ", workspaceId)
  const session = await auth();
  console.log("Session in dashboard: ", session);

  const res = await fetch(`http://96.9.81.187:8080/api/v1/tasks/workspace/${workspaceId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${session.token}` },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch workspace data");
  }

  const data = await res.json();

  return data;
 
}




export async function postTask(taskTitle, taskDetails, tag, status, endDate) {
  const session = await auth();
  const workspaceData = await fetchWorkspace();
  const workspaceId = workspaceData?.payload?.[0]?.workspaceId;

  console.log("Workspace ID in post: ", workspaceId);
  console.log("Session token: ", session?.token);

  if (!workspaceId) {
    console.error("No workspace found");
    return { error: "No workspace found" };
  }

  if (!session?.token) {
    console.error("User not authenticated");
    return { error: "User not authenticated" };
  }

  // Check if endDate is a valid date string
  if (!endDate || isNaN(new Date(endDate).getTime())) {
    console.error("Invalid date:", endDate);
    return { error: "Invalid end date" };
  }

  // Format the endDate to ISO format
  const formattedEndDate = new Date(endDate).toISOString();
  console.log("Formatted EndDate:", formattedEndDate);

  try {
    const res = await fetch(
      `http://96.9.81.187:8080/api/v1/tasks/workspace/${workspaceId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
        body: JSON.stringify({
          taskTitle,
          taskDetails,
          tag,
          status,
          endDate: formattedEndDate,
        }),
      }
    );

    if (!res.ok) {
      const errorResponse = await res.json(); // Get the error message from the response
      throw new Error(
        `Failed to create task: ${res.status} - ${
          errorResponse.message || "Unknown error"
        }`
      );
    }

    const responseData = await res.json();
    console.log("Task created successfully:", responseData);

    return responseData;
  } catch (error) {
    console.error("Error creating task:", error.message);
    return { error: error.message };
  }
}





export async function fetchWorkspaceById(workspaceId) {
  console.log("fetch workspaceid id: ", workspaceId);
  const session = await auth();
  console.log("Session in dashboard: ", session);

  const res = await fetch(
    `http://96.9.81.187:8080/api/v1/workspace/${workspaceId}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${session.token}` },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch workspace data");
  }

  const data = await res.json();

  return data;
}



export const updateWorkspace = async (workspaceId, workspaceName) => {
 
  const response = await fetch(`http://your-backend-api-url/workspaces/${workspaceId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ workspaceName }),
  });

  if (!response.ok) {
    throw new Error("Failed to update workspace");
  }

  return response.json(); 
};



