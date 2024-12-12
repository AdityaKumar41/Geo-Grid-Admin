"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { graphqlClient } from "@/client/app";
import { GetSignedURL } from "@/graphql/user";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateEmployee } from "@/hooks/useEmployee";

// Define form schema
const employeeFormSchema = z.object({
  profilePicture: z.union([z.string(), z.instanceof(File)]).optional(),
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email"),
  phoneNo: z.string().min(10, "Phone number must be at least 10 digits"),
  department: z.string().min(1, "Department is required"),
  employeeId: z.string().min(1, "Employee ID is required"),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Gender is required" }),
  }),
  age: z
    .number()
    .min(18, "Age must be at least 18")
    .max(100, "Age must be less than 100"),
});

type EmployeeFormData = z.infer<typeof employeeFormSchema>;

type SignedURLResponse = {
  getSignedUrl: string;
};

interface AddEmployeeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEmployee: (employee: {
    fullName: string;
    email: string;
    phoneNo: string;
    department: string;
    employeeId: string;
    profilePicture: string;
    gender: string;
    age: number;
  }) => void;
}

export function AddEmployeeDialog({
  isOpen,
  onClose,
  onAddEmployee,
}: AddEmployeeDialogProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { mutate } = useCreateEmployee();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      profilePicture: "",
      fullName: "",
      email: "",
      phoneNo: "",
      department: "",
      employeeId: "",
      gender: undefined,
      age: undefined,
    },
  });

  const getSignedURLForUpload = async (file: File) => {
    try {
      const response = await graphqlClient.request<SignedURLResponse>(GetSignedURL, {
        fileName: file.name,
        fileType: file.type,
      });
      return response.getSignedUrl;
    } catch (error) {
      console.error("Failed to get signed URL:", error);
      throw error;
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Set form value
      setValue("profilePicture", file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: EmployeeFormData) => {
    const loadingToast = toast.loading("Adding employee...");

    try {
      let uploadedImageUrl = "";

      // Handle file upload if a new file is selected
      if (data.profilePicture instanceof File) {
        try {
          const signedURL = await getSignedURLForUpload(data.profilePicture);
          if (!signedURL) throw new Error("Failed to get signed URL");

          await axios.put(signedURL, data.profilePicture, {
            headers: {
              "Content-Type": data.profilePicture.type,
            },
          });

          // Extract the base URL without query parameters
          uploadedImageUrl = signedURL.split("?")[0];
        } catch (uploadError) {
          console.error("File upload failed:", uploadError);
          toast.error("Failed to upload profile picture");
          toast.dismiss(loadingToast);
          return;
        }
      }

      console.log(data, uploadedImageUrl)

      // Format the data to match the CreateEmployeeInput type
      const employeeData = {
        input: {
          id: data.employeeId,
          name: data.fullName,
          email: data.email,
          phoneNo: data.phoneNo,
          position: data.department,
          profileImage: uploadedImageUrl || null,
          gender: data.gender,
          age: data.age,
        }
      };

      console.log("Employee data to mutate:", employeeData);

      // Call the mutation
      mutate(employeeData, {
        onSuccess: () => {
          toast.success("Employee added successfully!");
          resetForm();
          onClose();
        },
        onError: (error) => {
          console.error("Mutation error:", error);
          toast.error("Failed to add employee");
        },
      });
    } catch (error) {
      console.error("Failed to add employee:", error);
      toast.error("Failed to add employee");
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const resetForm = () => {
    reset();
    setPreviewImage(null);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        onClose();
        resetForm();
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
          <DialogDescription>
            Enter the details of the new employee here. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="flex justify-center">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={
                      previewImage || (watch("profilePicture") as string) || ""
                    }
                    alt="Profile picture"
                  />
                  <AvatarFallback>Upload</AvatarFallback>
                </Avatar>
                <Label
                  htmlFor="picture"
                  className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer"
                >
                  <Camera className="h-4 w-4" />
                  <Input
                    id="picture"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </Label>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullName" className="text-right">
                Full Name
              </Label>
              <Input
                id="fullName"
                {...register("fullName")}
                className="col-span-3"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm col-span-4">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="col-span-3"
              />
              {errors.email && (
                <p className="text-red-500 text-sm col-span-4">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNo" className="text-right">
                Phone No.
              </Label>
              <Input
                id="phoneNo"
                type="tel"
                {...register("phoneNo")}
                className="col-span-3"
              />
              {errors.phoneNo && (
                <p className="text-red-500 text-sm col-span-4">
                  {errors.phoneNo.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Department
              </Label>
              <Select
                value={watch("department")}
                onValueChange={(value) => setValue("department", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                </SelectContent>
              </Select>
              {errors.department && (
                <p className="text-red-500 text-sm col-span-4">
                  {errors.department.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="employeeId" className="text-right">
                Employee ID
              </Label>
              <Input
                id="employeeId"
                {...register("employeeId")}
                className="col-span-3"
              />
              {errors.employeeId && (
                <p className="text-red-500 text-sm col-span-4">
                  {errors.employeeId.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gender" className="text-right">
                Gender
              </Label>
              <Select
                value={watch("gender")}
                onValueChange={(value) => setValue("gender", value as any)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-red-500 text-sm col-span-4">
                  {errors.gender.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="age" className="text-right">
                Age
              </Label>
              <Input
                id="age"
                type="number"
                {...register("age", {
                  setValueAs: (value) =>
                    value === "" ? undefined : parseInt(value, 10),
                })}
                className="col-span-3"
              />
              {errors.age && (
                <p className="text-red-500 text-sm col-span-4">
                  {errors.age.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Employee</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
