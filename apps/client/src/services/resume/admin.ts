import { ResumeDto } from "@reactive-resume/dto";
import { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";

export const findResumeByIdAsAdmin = async (id: string): Promise<ResumeDto> => {
  const response = await axios.get<ResumeDto, AxiosResponse<ResumeDto>>(`/admin/resumes/${id}`);
  return response.data;
};


