"use client";

import { useState, startTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { useActionState } from "react";
import { deleteAction } from "@/actions/taskdelete-action";

export function EllipsisDelete({ taskId, workspaceId }) {
  // console.log("Received taskId11:", taskId, "Received workspaceId111:", workspaceId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(deleteAction,null);

  const handleDelete = () => {
    startTransition(() => {
      formAction( taskId, workspaceId );
    });
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
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <p>Are you sure you want to delete this task?</p>
          </div>

          <DialogFooter>
            <Button
              onClick={() => setIsDialogOpen(false)}
              className="mr-2"
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-red-500 text-white"
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
