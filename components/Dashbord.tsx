import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, UserMinus, Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Dashboard = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const cardsData = [
    {
      header: "Total Employees",
      content: "150",
      icon: Users,
      color: "text-blue-500",
    },
    {
      header: "Present Today",
      content: "120",
      icon: UserCheck,
      color: "text-green-500",
    },
    {
      header: "Absent Today",
      content: "30",
      icon: UserMinus,
      color: "text-red-500",
    },
    { header: "On Leave", content: "5", icon: Clock, color: "text-yellow-500" },
  ];

  // Sample attendance data
  const attendanceList = [
    {
      id: 1,
      name: "John Doe",
      department: "IT",
      checkIn: "09:00 AM",
      checkOut: "05:30 PM",
      status: "Present",
    },
    {
      id: 2,
      name: "Jane Smith",
      department: "HR",
      checkIn: "08:45 AM",
      checkOut: "05:15 PM",
      status: "Present",
    },
    {
      id: 3,
      name: "Mike Johnson",
      department: "Finance",
      checkIn: "09:15 AM",
      checkOut: "-",
      status: "Present",
    },
    {
      id: 4,
      name: "Emily Brown",
      department: "Marketing",
      checkIn: "-",
      checkOut: "-",
      status: "Absent",
    },
    {
      id: 5,
      name: "Chris Wilson",
      department: "Sales",
      checkIn: "-",
      checkOut: "-",
      status: "On Leave",
    },
  ];

  return (
    <div className="flex flex-1 p-4">
      <div className="p-6 md:p-10 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-6 flex-1 w-full h-full shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
            Active Attendance Dashboard
          </h1>
          <div className="text-neutral-600 dark:text-neutral-400 font-medium">
            Today: {currentDate}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardsData.map((card, index) => (
            <Card
              key={index}
              className="overflow-hidden transition-all hover:shadow-md"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.header}
                </CardTitle>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.content}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-neutral-100">
            Today's Attendance List
          </h2>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceList.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">
                      {employee.name}
                    </TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.checkIn}</TableCell>
                    <TableCell>{employee.checkOut}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${
                          employee.status === "Present"
                            ? "bg-green-100 text-green-800"
                            : employee.status === "Absent"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {employee.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
