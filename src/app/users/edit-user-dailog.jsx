import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

export const EditUserDialog = ({ open, onClose, onUserUpdated, user }) => {
  const [updatedUser, setUpdatedUser] = useState(user);

  useEffect(() => {
    if (user) {
      setUpdatedUser(user);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUserUpdated(updatedUser);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit user</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="firstname">Firstname</Label>
              <Input
                id="firstname"
                name="firstname"
                placeholder="Enter firstname"
                value={updatedUser.firstname}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, firstname: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastname">Lastname</Label>
              <Input
                id="lastname"
                name="lastname"
                placeholder="Enter lastname"
                value={updatedUser.lastname}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, lastname: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="Enter email"
                value={updatedUser.email}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, email: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={onClose} variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
