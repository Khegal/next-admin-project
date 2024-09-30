"use client";

import * as React from "react";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Settings } from "lucide-react";
import { useState } from "react";
import { EditUserDialog } from "./edit-user-dailog";

export function UsersTable({ data, limit, onRemove }) {
  const [value, setValue] = useState("");
  const searchFilter = (array) => {
    return array.filter((el) =>
      [el.firstname, el.lastname, el.email].some((field) =>
        field?.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const filtered = searchFilter(data).slice(0, limit);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleRemove = (id) => {
    onRemove(id);
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          onChange={handleChange}
          placeholder="Нэр, овог, эсвэл имэйлээр хайх..."
          className="max-w-sm"
        />
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1">#</TableHead>
              <TableHead className="w-1">Зураг</TableHead>
              <TableHead className="w-1">Овог</TableHead>
              <TableHead>Нэр</TableHead>
              <TableHead>И-Мэйл</TableHead>
              <TableHead className="w-1">
                <Settings />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={item.imageUrl} alt={item.firstname} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{item.lastname}</TableCell>
                <TableCell>{item.firstname}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell className="w-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="w-8 h-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() =>
                          navigator.clipboard.writeText(item.email)
                        }
                      >
                        Copy Email
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleRemove(item.id)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
