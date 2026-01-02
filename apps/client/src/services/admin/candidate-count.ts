import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";

interface CandidateCountResponse {
  count: number;
}

export const fetchCandidateCount = async () => {
  const response = await axios.get<CandidateCountResponse, AxiosResponse<CandidateCountResponse>>(
    "/admin/candidates/count",
  );

  return response.data;
};

export const useCandidateCount = () => {
  return useQuery({
    queryKey: ["admin", "candidates", "count"],
    queryFn: fetchCandidateCount,
  });
};


