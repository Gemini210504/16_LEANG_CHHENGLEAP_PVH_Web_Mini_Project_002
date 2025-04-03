"use client";

import CardComponent from "./card";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SquarePlus, Star } from "lucide-react";
import { useActionState } from "react";
import { taskAction } from "@/actions/task-action";

export default function TodoComponent({ taskList }) {
  const [state, formAction, isPending] = useActionState(taskAction, null);
  console.log("Fetched Tasks:", taskList);

  // Organize tasks by status
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
    <div className="min-h-screen">
      <div>
        <div className=" flex flex-row justify-between mx-10 bg-amber-200 items-center p-6 rounded-2xl">
          <p className="text-3xl font-medium">
            {/* {workspace?.payload?.workspaceName || "No workspace available"} */}
            HRD
          </p>
          <span>
            <Star />
          </span>
        </div>
        <main className="flex-grow space-y-7 p-6">
          <div className="grid grid-cols-3 gap-4 text-center text-2xl">
            {Object.entries(tasksByStatus).map(([status, tasks]) => (
              <div key={status} className="text-center">
                <h2 className="font-bold">{status.replace("_", " ")}</h2>
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <CardComponent key={task.taskId} task={task} />
                  ))
                ) : (
                  <p className="text-gray-500">No tasks</p>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
      <div className="fixed bottom-6 right-6 z-50">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <SquarePlus className="mr-2" />
              Add Task
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add new task</DialogTitle>
            </DialogHeader>

            <form action={formAction}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Task Title
                  </Label>
                  <Input
                    id="name"
                    name="taskTitle"
                    className="col-span-3"
                    placeholder="Enter task name"
                    required
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Task Details
                  </Label>
                  <Input
                    id="name"
                    name="taskDetails"
                    className="col-span-3"
                    placeholder="Enter task name"
                    required
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Tag
                  </Label>
                  <Input
                    id="name"
                    name="tag"
                    className="col-span-3"
                    placeholder="Enter task name"
                    required
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    End date
                  </Label>
                  <Input
                    id="name"
                    name="endDate"
                    className="col-span-3"
                    placeholder="Enter task name"
                    required
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="submit">
                  {isPending ? "Loading..." : "Submit"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
