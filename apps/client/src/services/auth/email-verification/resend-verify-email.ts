import { MessageDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";

export const resendVerificationEmail = async (email?: string) => {
  const response = await axios.post<MessageDto, AxiosResponse<MessageDto>>(
    "/auth/resend-verification",
    email ? { email } : undefined,
  );

  return response.data;
};

export const useResendVerificationEmail = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: resendVerificationEmailFn,
  } = useMutation({
    mutationFn: resendVerificationEmail,
  });

  return { resendVerificationEmail: resendVerificationEmailFn, loading, error };
};
