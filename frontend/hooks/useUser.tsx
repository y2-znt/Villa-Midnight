import { getToken } from "@/config/config";
import { fetchAllUsers } from "@/lib/api/userApi";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
  const token = getToken();

  return useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
    enabled: !!token,
  });
};
