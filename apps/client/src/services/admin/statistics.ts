import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";

interface StatisticsResponse {
  candidates: number;
  resumes: number;
  emailVerified: number;
  twoFactorEnabled: number;
  usersByProvider: Array<{
    provider: string;
    count: number;
  }>;
}

export const fetchStatistics = async () => {
  const response = await axios.get<StatisticsResponse, AxiosResponse<StatisticsResponse>>(
    "/admin/statistics",
  );

  return response.data;
};

export const useStatistics = () => {
  return useQuery({
    queryKey: ["admin", "statistics"],
    queryFn: fetchStatistics,
  });
};


