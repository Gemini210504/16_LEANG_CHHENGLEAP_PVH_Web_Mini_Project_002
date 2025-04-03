import { fetchWorkspace } from "@/service/dashboard-service";
import { Ellipsis } from "lucide-react";
import Link from "next/link";

export default async function WorkspaceData() {
  const data = await fetchWorkspace();

  const getRandomColor = () => {
    const colors = [
      "#F96666",
      "#4379F2",
      "#009990",
      "#FF5733",
      "#8A2BE2",
      "#32CD32",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <>
      <div className="flex flex-col">
        {data?.payload && Array.isArray(data?.payload) ? (
          data.payload.map((ws) => {
        
            if (!ws?.workspaceId) {
              console.warn("Missing workspaceId for workspace:", ws);
              return null;
            }

            return (
              <Link
                key={ws.workspaceId}
                href={`/todoPage/${ws.workspaceId}`} 
              >
                <div className="flex flex-row justify-between space-y-4 items-center">
                  <span
                    className="rounded-full w-4 h-4"
                    style={{ backgroundColor: getRandomColor() }}
                  ></span>
                  <p className="text-[18px]">{ws.workspaceName}</p>
                  <span>
                    <Ellipsis />
                  </span>
                </div>
              </Link>
            );
          })
        ) : (
          <p>No workspaces available.</p> 
        )}
      </div>
    </>
  );
}
