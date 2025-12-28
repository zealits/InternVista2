import { useQuery, useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";
import { Internship, InternshipApplication } from "./internships";

export const fetchAdminInternships = async (activeOnly: boolean = true): Promise<Internship[]> => {
  const response = await axios.get<Internship[], AxiosResponse<Internship[]>>(
    `/admin/internships?activeOnly=${activeOnly}`,
  );
  return response.data;
};

export const useAdminInternships = (activeOnly: boolean = true) => {
  return useQuery({
    queryKey: ["admin", "internships", activeOnly],
    queryFn: () => fetchAdminInternships(activeOnly),
  });
};

export const fetchInternshipApplications = async (
  internshipId: string,
): Promise<InternshipApplication[]> => {
  const response = await axios.get<InternshipApplication[], AxiosResponse<InternshipApplication[]>>(
    `/admin/internships/${internshipId}/applications`,
  );
  return response.data;
};

export const useInternshipApplications = (internshipId: string) => {
  return useQuery({
    queryKey: ["admin", "internship", internshipId, "applications"],
    queryFn: () => fetchInternshipApplications(internshipId),
    enabled: !!internshipId,
  });
};

export const fetchAllApplications = async (): Promise<InternshipApplication[]> => {
  const response = await axios.get<InternshipApplication[], AxiosResponse<InternshipApplication[]>>(
    "/admin/applications",
  );
  return response.data;
};

export const useAllApplications = () => {
  return useQuery({
    queryKey: ["admin", "applications"],
    queryFn: fetchAllApplications,
  });
};

export const updateApplicationStatus = async (
  applicationId: string,
  status: "pending" | "accepted" | "rejected",
): Promise<InternshipApplication> => {
  const response = await axios.patch<InternshipApplication, AxiosResponse<InternshipApplication>>(
    `/admin/applications/${applicationId}/status`,
    { status },
  );
  return response.data;
};

export const useUpdateApplicationStatus = () => {
  return useMutation({
    mutationFn: ({ applicationId, status }: { applicationId: string; status: "pending" | "accepted" | "rejected" }) =>
      updateApplicationStatus(applicationId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "applications"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "internship"] });
    },
  });
};

