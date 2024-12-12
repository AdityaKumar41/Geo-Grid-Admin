"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { graphqlClient } from "@/client/app";
import { verifyAdminQuery } from "@/graphql/user";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

type VerifyAdminResponse = {
  VerifyAdmin: string;
};

export default function AdminLoginForm() {
  const queryClient = useQueryClient();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async(e:React.FormEvent)=>{
    e.preventDefault();
    if(!username || !password){
      toast.error("Please enter both username and password.");
      return;
    }

    try {

      console.log(username,password);
      setIsLoading(true);
      const response = await graphqlClient.request<VerifyAdminResponse>(verifyAdminQuery, {
        email: username,
        password: password
      });

      console.log(response);
      if (response) {
        toast.success("Login successful!");
        // store in session storage
        sessionStorage.setItem("token", response.VerifyAdmin);

        // Add your navigation or success logic here
      } else {
        toast.error("Invalid username or password.");
      }
    } catch (error) {
      toast.error("An error occurred during login.");
    } finally {
      await queryClient.invalidateQueries({ queryKey: ['admin'] });
      setIsLoading(false);
    }
  },[username,password])

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Loading..." : "Login"}
      </Button>
    </form>
  );
}
