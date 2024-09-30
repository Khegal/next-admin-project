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
import { useState } from "react";

export const UserCreateDialog = ({ open, onClose, onUserCreated }) => {
  const [newUser, setNewUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    imageUrl: "http://dummyimage.com/192x159.png/dddddd/000000",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUserCreated(newUser);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create user</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="firstname">firstname</Label>
              <Input
                id="firstname"
                name="firstname"
                placeholder="Enter firstname"
                value={newUser.firstname}
                onChange={(e) =>
                  setNewUser({ ...newUser, firstname: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastname">Lastname</Label>
              <Input
                id="lastname"
                name="lastname"
                placeholder="Enter lastname"
                value={newUser.lastname}
                onChange={(e) =>
                  setNewUser({ ...newUser, lastname: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="Enter email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
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
