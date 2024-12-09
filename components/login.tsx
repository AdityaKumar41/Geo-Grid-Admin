import AdminLoginForm from "@/components/ui/AdminLoginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Admin Login
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdminLoginForm />
          </CardContent>
        </Card>
      </div>
      <div className="absolute top-4 left-4 w-24 h-24">
        <svg viewBox="0 0 100 100" className="text-indigo-500 opacity-20">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
          />
          <path
            d="M50 10 L50 90 M10 50 L90 50"
            stroke="currentColor"
            strokeWidth="8"
          />
        </svg>
      </div>
      <div className="absolute bottom-4 right-4 w-24 h-24">
        <svg viewBox="0 0 100 100" className="text-purple-500 opacity-20">
          <rect
            x="10"
            y="10"
            width="80"
            height="80"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
          />
          <line
            x1="10"
            y1="10"
            x2="90"
            y2="90"
            stroke="currentColor"
            strokeWidth="8"
          />
          <line
            x1="90"
            y1="10"
            x2="10"
            y2="90"
            stroke="currentColor"
            strokeWidth="8"
          />
        </svg>
      </div>
    </div>
  );
}
