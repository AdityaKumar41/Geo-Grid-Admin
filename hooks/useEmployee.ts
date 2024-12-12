import { graphqlClient } from "@/client/app";
import { Employee } from "@/gql/graphql";
import { createEmployeeTypes } from "@/graphql/mutation";
import { getEmployees } from "@/graphql/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Define the input type to match the dialog's employeeData structure
type CreateEmployeeInput = {
  input: {
    id: string;
    name: string;
    email: string;
    position: string;
    age: number;
    phoneNo: string;
    gender: string;
    profileImage: string | null;
  }
};

// useCreateEmployee
export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (employeeData: CreateEmployeeInput) =>
      graphqlClient.request(createEmployeeTypes as any, employeeData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  return mutation;
};

// get employees
export const useGetEmployees = () => {
  const data = useQuery({
    queryKey: ["employees"],
    queryFn: () => graphqlClient.request(getEmployees as any),
  });

  return data;
};
