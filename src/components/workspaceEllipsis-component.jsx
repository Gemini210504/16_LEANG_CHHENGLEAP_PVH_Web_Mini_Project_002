"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { updateWorkspace } from "@/service/dashboard-service";

export function WorkspaceEllipsis({ workspaceId, currentWorkspaceName }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [workspaceName, setWorkspaceName] = useState(currentWorkspaceName);

  const handleSubmit = async () => {
    try {
      // Call the updateWorkspace function with workspaceId and updated workspaceName
      const update = await updateWorkspace(workspaceId, workspaceName);

      // Close the dialog after successful update
      setIsDialogOpen(false);

      // Optionally, you can update the state here or refetch data to reflect the changes
      console.log("Workspace updated successfully");
    } catch (error) {
      console.error("Error updating workspace:", error.message);
    }
  };

  return (
    <>
      <span
        className="text-xl cursor-pointer"
        onClick={() => setIsDialogOpen(true)}
      >
        <Ellipsis />
      </span>

      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => setIsDialogOpen(open)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Workspace</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="workspaceName" className="text-right">
                Workspace Name
              </label>
              <Input
                id="workspaceName"
                name="workspaceName"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="col-span-3"
                placeholder="Enter new workspace name"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleSubmit}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
