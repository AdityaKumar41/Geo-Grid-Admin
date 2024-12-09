import { graphqlClient } from "@/client/app";
import { Employee, MutationCreateEmployeeArgs } from "@/gql/graphql";
import { createEmployeeTypes } from "@/graphql/mutation";
import { GetSignedURL } from "@/graphql/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// useCreateEmployee
export const useCreateEmployee = (employeeData: {
  fullName: string;
  email: string;
  phoneNo: string;
  department: string;
  employeeId: string;
  profilePicture: string | null;
}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (employeeData: Omit<Employee, "id" | "password">) =>
      graphqlClient.request(createEmployeeTypes as any, {
        input: {
          name: employeeData.name,
          email: employeeData.email,
          position: employeeData.position,
          age: employeeData.age,
          phoneNo: employeeData.phoneNo,
          gender: employeeData.gender,
          profileImage: employeeData.profileImage,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee"] });
    },
  });

  return mutation;
};
