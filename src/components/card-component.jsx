
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, Ellipsis } from "lucide-react";
import React from "react";
import { EllipsisDelete } from "./cardEllipsis-component";

export default function CardComponent({ task, workspaceId }) {
  // Dynamically set status color
  const statusColors = {
    NOT_STARTED: "bg-[#F96666]",
    IN_PROGRESS: "bg-[#4379F2]",
    FINISHED: "bg-[#009990]",
  };

  
  const formattedDate = new Date(task.startDate).toLocaleDateString("en-US", {
    
    year: "numeric",
    month: "long", 
    day: "numeric",
  });

  console.log("In Card component task: ", task?.taskId);
  console.log("In Card component workspaceID: ", workspaceId);

  return (
    <div className="border border-gray-300 rounded-xl mt-8">
      <div className="p-5">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold capitalize">{task.taskTitle}</h2>
          <EllipsisDelete task={task?.taskId} workspaceId={workspaceId} />
        </div>

        {/* task detials */}
        <p className="line-clamp-2 text-light-steel-blue my-2 h-12">
          {/* Description */}
          {task.taskDetails}
        </p>

        <div className="flex justify-between items-center mt-4">
          {/* tag */}
          <p className="bg-purple-100 text-purple-500 py-1.5 px-3 rounded-lg">
            {/* DESIGN */}
            {task.tag}
          </p>

          {/* status */}
          <div className={`rounded-full w-8 h-8 bg-watermelon-red`}>
            {/* {task.status} */}
          </div>
        </div>
      </div>

      {/* progress */}
      <div className="flex justify-between items-center border-t border-t-gray-300 p-5">
        <Select>
          <SelectTrigger
            className={`w-36 truncate border-watermelon-red text-watermelon-red`}
          >
            <SelectValue placeholder="NOT_STARTED" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="NOT_STARTED">NOT_STARTED</SelectItem>
            <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
            <SelectItem value="FINISHED">FINISHED</SelectItem>
          </SelectContent>
        </Select>

        {/* date */}
        <p className="flex gap-3 text-light-steel-blue">
          <Clock size={22} /> {formattedDate}
        </p>
      </div>
    </div>
  );
}
