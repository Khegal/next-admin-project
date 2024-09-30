"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TypographyH3 } from "@/components/typography/h3";
import { UsersTable } from "./table";
import { UserCreateDialog } from "./user-create-dialog";
import { useEffect, useState } from "react";

const Users = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);

  const gg = data.length < limit;

  const loadMore = () => {
    setLimit((prevLimit) => prevLimit + 10);
  };

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const handleRemoveUser = async (id) => {
    await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });
    setData((prevData) => prevData.filter((user) => user.id !== id));
  };

  const addNewUser = async (newUser) => {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    const addedUser = await res.json();

    setData([...data, addedUser.data]);
  };

  const editUser = async (id) => {
    await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editOfUser),
    });
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <TypographyH3>Хэрэглэгчид</TypographyH3>
            <Button variant="outline" onClick={() => setCreateModalOpen(true)}>
              Шинээр нэмэх
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <UsersTable data={data} limit={limit} onRemove={handleRemoveUser} />
          <div className="flex justify-center p-8">
            {!gg && (
              <Button variant="outline" onClick={loadMore}>
                Load more...
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      <UserCreateDialog
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onUserCreated={addNewUser}
      />
    </div>
  );
};

export default Users;
