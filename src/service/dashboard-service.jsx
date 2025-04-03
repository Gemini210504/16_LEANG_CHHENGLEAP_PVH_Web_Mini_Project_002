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

export const updateWorkspace = async (workspaceId, isFavorite) => {
  const session = await auth();
    const response = await fetch(
      `http://96.9.81.187:8080/api/v1/workspace/${workspaceId}/favorite?favorite=${isFavorite}`,
      {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}` ,
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to update workspace status");
      return;
    }

    const data = await response.json();
    console.log("Workspace updated: ", data);
    return data;
  };
