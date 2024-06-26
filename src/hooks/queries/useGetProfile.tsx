import { useQuery } from "@tanstack/react-query";

import ProfileApi from "@/api/profile-api";

export const useGetProfile = (userId?: number) => {
  if (userId) {
    console.log("Other Profile");
    return useQuery({
      queryKey: ["userProfile", userId],
      queryFn: () => ProfileApi.getProfile(userId),
    });
  } else {
    return useQuery({
      queryKey: ["myProfile"],
      queryFn: () => ProfileApi.getProfile(),
    });
  }
};
