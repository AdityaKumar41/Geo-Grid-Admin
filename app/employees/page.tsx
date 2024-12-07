import EmployeeList from "@/components/employee-list";
import AttendanceList from "./attendance-list";

export default function AttendancePage() {
  return (
    <div className="flex flex-1 p-4">
      <div className="p-6 md:p-10 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-6 flex-1 w-full h-full shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Employee Attendance</h1>
        <EmployeeList />
      </div>
    </div>
  );
}
