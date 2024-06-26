import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import ChatApi from "@/api/chat-api";
import { ChatMakeRequest } from "@/api/types/chat-type";

export const usePostMakeChat = () => {
  return useMutation({
    mutationFn: (data: ChatMakeRequest) => ChatApi.postChatMake(data),
  });
};
