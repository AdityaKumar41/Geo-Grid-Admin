import { graphqlClient } from "@/client/app";
import { Admin, Employee } from "@/gql/graphql";
import { useQuery } from "@tanstack/react-query";
import { getAdmin, verifyAdminQuery } from "@/graphql/user";

// useAdmin
interface AdminResponse {
  useAdminData: Admin;
}

export const useAdmin = () => {
  const query = useQuery<AdminResponse>({
    queryKey: ['admin'],
    queryFn: () => graphqlClient.request(getAdmin),
  });
  return {...query, data: query.data?.useAdminData};
};


// Define the verification queries




// Type for the verification response
interface VerifyEmployeeResponse {
  VerifyEmployee: Employee;
}

interface VerifyAdminResponse {
  VerifyAdmin: Admin;
}



// Hook for admin verification
export const useVerifyAdmin = (email: string, password: string) => {
  return useQuery<VerifyAdminResponse>({
    queryKey: ['verifyAdmin', email, password],
    queryFn: () => 
      graphqlClient.request(verifyAdminQuery, {
        email,
        password,
      }),
    enabled: Boolean(email && password),
    retry: false,
    staleTime: Infinity,
  });
};

