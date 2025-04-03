"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // Assuming Dialog components are set up correctly
import { Button } from "@/components/ui/button"; // Assuming Button component is correctly set up
import { Ellipsis } from "lucide-react"; // Import Ellipsis icon
import { useActionState } from "react"; // Assuming useActionState is imported from your custom hook package
import { deleteAction } from "@/actions/taskdelete-action"; // Assuming deleteAction is your deletion function

export function EllipsisDelete({ task, workspaceId }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(deleteAction); // Using useActionState to track action state

  const handleDelete = async () => {
    // Call delete action with task and workspaceId
    await formAction({ taskId: task, workspaceId });
  };

  return (
    <>
      {/* Ellipsis icon that triggers the dialog */}
      <span
        className="text-xl cursor-pointer"
        onClick={() => setIsDialogOpen(true)} // Open the dialog when clicked
      >
        <Ellipsis />
      </span>

      {/* Confirmation Dialog */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => setIsDialogOpen(open)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <p>Are you sure you want to delete this task?</p>
          </div>

          <DialogFooter>
            <Button
              onClick={() => setIsDialogOpen(false)} // Close the dialog without deletion
              className="mr-2"
              disabled={isPending} // Disable cancel button if deletion is in progress
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete} // Trigger the delete action on button click
              className="bg-red-500 text-white"
              disabled={isPending} // Disable delete button if deletion is in progress
            >
              {isPending ? "Deleting..." : "Delete"}{" "}
              {/* Show loading text when pending */}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
