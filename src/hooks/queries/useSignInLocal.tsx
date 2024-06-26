import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import AuthApi from "@/api/auth-api";

export const useSignInLocal = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      AuthApi.postSignInLocal(data.email, data.password),
    onSuccess: (response) => {
      console.log("로그인 성공", response.accessToken);
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("userId", response.userId.toString());
      localStorage.setItem("role", response.role);
      // if (response.role !== "ROLE_USER") {
      //   navigate("/signup");
      // } else {
      //   navigate("/post");
      // }
      navigate("/post");
    },
  });
};
