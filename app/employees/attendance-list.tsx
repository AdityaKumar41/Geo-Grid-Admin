"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  avatar: string;
}

const hardcodedEmployees: Employee[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    department: "Engineering",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    department: "Marketing",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    department: "Sales",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    department: "HR",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    name: "Charlie Davis",
    email: "charlie@example.com",
    department: "Engineering",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 6,
    name: "Eva White",
    email: "eva@example.com",
    department: "Finance",
    avatar: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: 7,
    name: "Frank Miller",
    email: "frank@example.com",
    department: "Sales",
    avatar: "https://i.pravatar.cc/150?img=7",
  },
  {
    id: 8,
    name: "Grace Lee",
    email: "grace@example.com",
    department: "Marketing",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: 9,
    name: "Henry Wilson",
    email: "henry@example.com",
    department: "Engineering",
    avatar: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: 10,
    name: "Ivy Chen",
    email: "ivy@example.com",
    department: "HR",
    avatar: "https://i.pravatar.cc/150?img=10",
  },
  {
    id: 11,
    name: "Jack Taylor",
    email: "jack@example.com",
    department: "Finance",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 12,
    name: "Karen Moore",
    email: "karen@example.com",
    department: "Sales",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
];

export default function AttendanceList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [employees, setEmployees] = useState<Employee[]>(hardcodedEmployees);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page") || "1");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("query");
    router.push(`/attendance?query=${query}`);
  };

  const handlePageChange = (newPage: number) => {
    router.push(`/attendance?query=${query}&page=${newPage}`);
  };

  return (
    <>
      <div className="h-full overflow-hidden">
        <form onSubmit={handleSearch} className="mb-4">
          <div className="flex gap-2">
            <Input
              type="text"
              name="query"
              placeholder="Search by name or department"
              defaultValue={query}
              className="flex-grow"
            />
            <Button type="submit">Search</Button>
          </div>
        </form>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-scroll h-full webkit">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Avatar</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Department</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <img
                        src={employee.avatar}
                        alt={employee.name}
                        className="w-10 h-10 rounded-full"
                      />
                    </TableCell>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>
    </>
  );
}
