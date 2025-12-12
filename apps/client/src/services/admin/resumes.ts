import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";

export interface AdminResume {
  id: string;
  title: string;
  slug: string;
  visibility: string;
  locked: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    username: string;
  };
}

interface ResumesResponse {
  resumes: AdminResume[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const fetchAllResumes = async (skip: number = 0, take: number = 50) => {
  const response = await axios.get<ResumesResponse, AxiosResponse<ResumesResponse>>(
    "/admin/resumes",
    {
      params: { skip, take },
    },
  );

  return response.data;
};

export const useAllResumes = (skip: number = 0, take: number = 50) => {
  return useQuery({
    queryKey: ["admin", "resumes", skip, take],
    queryFn: () => fetchAllResumes(skip, take),
  });
};

