"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; 
import { SquarePlus } from "lucide-react";
import { useActionState } from "react";
import { taskAction } from "@/actions/task-action";

export default function AddTaskComponent() {
  const [state, formAction, isPending] = useActionState(taskAction, null);

  return (
    <div className="min-h-screen">
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
                {/* Task Title */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="taskTitle" className="text-right">
                    Task Title
                  </Label>
                  <Input
                    id="taskTitle"
                    name="taskTitle"
                    className="col-span-3"
                    placeholder="Enter task name"
                    required
                  />
                </div>

                {/* Task Details */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="taskDetails" className="text-right">
                    Task Details
                  </Label>
                  <Input
                    id="taskDetails"
                    name="taskDetails"
                    className="col-span-3"
                    placeholder="Enter task details"
                    required
                  />
                </div>

                {/* Tag Dropdown */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tag" className="text-right">
                    Tag
                  </Label>
                  <Select id="tag" name="tag" className="col-span-3" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tag" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DESIGN">Design</SelectItem>
                      <SelectItem value="HOMEWORK">Homework</SelectItem>
                      <SelectItem value="ASSIGNMENT">Assignment</SelectItem>
                      <SelectItem value="DEPLOYMENT">Deployment</SelectItem>
                      <SelectItem value="GIT">Git</SelectItem>
                      <SelectItem value="DATABASE">Database</SelectItem>
                      <SelectItem value="MINI_PROJECT">Mini Project</SelectItem>
                      <SelectItem value="DOCUMENTATION">
                        Documentation
                      </SelectItem>
                      <SelectItem value="FEATURE">Feature</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* End Date */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="endDate" className="text-right">
                    End date
                  </Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="datetime-local"
                    className="col-span-3"
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
