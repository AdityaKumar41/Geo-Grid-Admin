"use client";

import { useState } from "react";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Search,
  Users,
  Briefcase,
  Mail,
  UserPlus,
  ChevronDown,
  Filter,
} from "lucide-react";
import { AddEmployeeDialog } from "./employee-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetEmployees } from "@/hooks/useEmployee";
import { Employee } from "@/gql/graphql";

const ITEMS_PER_PAGE = 8;
const DEPARTMENTS = [
  "engineering",
  "marketing",
  "sales",
  "hr",
  "finance"
] as const;

export default function EmployeeList() {
  const { data, isLoading, isError } = useGetEmployees();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const employees = data?.employees || [];

  // Filter employees based on search term and department
  const filteredEmployees = employees.filter((employee) => {
    console.log('Employee:', employee);
    console.log('Selected Department:', selectedDepartment);
    
    const matchesSearch =
      !searchTerm ||
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      !selectedDepartment || employee.position.toLowerCase() === selectedDepartment.toLowerCase();

    return matchesSearch && matchesDepartment;
  });

  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  const addEmployee = (newEmployee: Omit<Employee, "id">) => {
    console.log("Adding employee:", newEmployee);
    setIsDialogOpen(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading employees</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Employee Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex w-full md:w-auto space-x-2">
              <div className="relative flex-grow md:flex-grow-0">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-8 pr-4 py-2 w-full md:w-[300px]"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="hidden md:flex">
                    <Filter className="mr-2 h-4 w-4" />
                    {selectedDepartment || "Filter"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by Department</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedDepartment("");
                      setCurrentPage(1);
                    }}
                  >
                    All Departments
                  </DropdownMenuItem>
                  {DEPARTMENTS.map((dept) => (
                    <DropdownMenuItem
                      key={dept}
                      onClick={() => {
                        setSelectedDepartment(dept);
                        setCurrentPage(1);
                      }}
                    >
                      {dept.charAt(0).toUpperCase() + dept.slice(1)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="w-full md:w-auto"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table Component */}
      <div className="rounded-md border bg-white dark:bg-gray-800">
        <div className="relative h-[calc(100vh-400px)] overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-white dark:bg-gray-800 z-10">
              <TableRow>
                <TableHead className="sticky top-0 bg-white dark:bg-gray-800">
                  Employee
                </TableHead>
                <TableHead className="sticky top-0 bg-white dark:bg-gray-800">
                  Email
                </TableHead>
                <TableHead className="sticky top-0 bg-white dark:bg-gray-800">
                  Department
                </TableHead>
                <TableHead className="sticky top-0 bg-white dark:bg-gray-800 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage
                          src={employee.profileImage}
                          alt={employee.name}
                        />
                        <AvatarFallback>
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span>{employee.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-gray-400" />
                      {employee.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Briefcase className="mr-2 h-4 w-4 text-gray-400" />
                      {employee.position}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit details</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
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

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                />
              </PaginationItem>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}

      <AddEmployeeDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAddEmployee={(dialogEmployee) =>
          addEmployee({
            name: dialogEmployee.fullName,
            email: dialogEmployee.email,
            position: dialogEmployee.department,
            profileImage: dialogEmployee.profilePicture,
          })
        }
      />
    </div>
  );
}
