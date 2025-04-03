import AddTaskComponent from "@/components/addTask-component";
import CardComponent from "@/components/card-component";
import { WorkspaceHeader } from "@/components/workspaceheader-component";
import {
  fetchTask,
  fetchWorkspace,
  fetchWorkspaceById,
} from "@/service/dashboard-service";
import { Star } from "lucide-react";

export default async function TodoDetail({ params }) {
  const workspaceId = (await params).todoId;
  const workspaceName = await fetchWorkspaceById(workspaceId);
  const isFavorite = await fetchWorkspaceById (workspaceId);
  console.log("workspaceName: ", workspaceName);
  console.log("Log workspace: ", workspaceId);
  const taskList = await fetchTask(workspaceId);
  console.log("Task : ", taskList);

  const tasksByStatus = {
    NOT_STARTED: [],
    IN_PROGRESS: [],
    FINISHED: [],
  };

  taskList.payload.forEach((task) => {
    if (tasksByStatus[task.status]) {
      tasksByStatus[task.status].push(task);
    }
  });
  return (
    <>
      <div className="min-h-screen">
        <div className=" flex flex-row justify-between mx-10 bg-amber-200 items-center p-6 rounded-2xl">
          <p className="text-3xl font-medium">
              {workspaceName?.payload?.workspaceName ||
                "No workspace available"}
              HRD
            </p>
            <span>
              <Star />
            </span>
          {/* <WorkspaceHeader
            workspaceId={workspaceId}
            workspaceName={workspaceName}
            isFavorite={isFavorite.isFavorite}
          /> */}
        </div>
        <main className="flex-grow space-y-7 p-6  ">
          <div className="grid grid-cols-3 gap-4 text-center text-2xl h-[700px] overflow-y-auto shadow-[10px]">
            {Object.entries(tasksByStatus).map(([status, tasks]) => (
              <div key={status} className="text-center ">
                <h2 className="font-bold">{status.replace("_", " ")}</h2>
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <CardComponent
                      key={task.taskId}
                      task={task}
                      workspaceId={workspaceId}
                    />
                  ))
                ) : (
                  <p className="text-gray-500">No tasks</p>
                )}
              </div>
            ))}
          </div>
        </main>
        <AddTaskComponent />
      </div>
    </>
  );
}
