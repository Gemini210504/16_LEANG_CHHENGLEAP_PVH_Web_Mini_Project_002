
"use client";
import { workspaceAction } from "@/actions/workspace-action";
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
import { SquarePlus } from "lucide-react";

import { useActionState } from "react";



export default  function DialogComponent() {
 const [state, formAction, isPending] = useActionState(workspaceAction, null);

  return (
    <>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <span><SquarePlus/></span>Add new
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add new workspace</DialogTitle>
            </DialogHeader>

            <form action={formAction}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="workspaceName"
                    className="col-span-3"
                    placeholder="Enter workspace name"
                    required
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="submit">
                  {isPending ? "Loading..." : "Save"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
