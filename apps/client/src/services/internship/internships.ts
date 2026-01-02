import { useQuery, useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";

export interface Internship {
  id: string;
  title: string;
  company: string;
  description: string;
  location?: string;
  type?: string;
  duration?: string;
  stipend?: string;
  requirements?: string;
  skills?: string[];
  postedBy: string;
  isActive: boolean;
  deadline?: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    applications: number;
  };
}

export interface InternshipApplication {
  id: string;
  internshipId: string;
  userId: string;
  status: "pending" | "accepted" | "rejected";
  coverLetter?: string;
  resumeId?: string;
  createdAt: string;
  updatedAt: string;
  internship?: Internship;
  user?: {
    id: string;
    name: string;
    email: string;
    username: string;
    picture?: string;
  };
}

export interface CreateInternshipDto {
  title: string;
  company: string;
  description: string;
  location?: string;
  type?: string;
  duration?: string;
  stipend?: string;
  requirements?: string;
  skills?: string[];
  deadline?: string;
}

export interface ApplyToInternshipDto {
  coverLetter?: string;
  resumeId?: string;
}

export const fetchInternships = async (activeOnly: boolean = true): Promise<Internship[]> => {
  const response = await axios.get<Internship[], AxiosResponse<Internship[]>>(
    `/internship?activeOnly=${activeOnly}`,
  );
  return response.data;
};

export const useInternships = (activeOnly: boolean = true) => {
  return useQuery({
    queryKey: ["internships", activeOnly],
    queryFn: () => fetchInternships(activeOnly),
  });
};

export const fetchInternshipById = async (id: string): Promise<Internship> => {
  const response = await axios.get<Internship, AxiosResponse<Internship>>(`/internship/${id}`);
  return response.data;
};

export const useInternship = (id: string) => {
  return useQuery({
    queryKey: ["internship", id],
    queryFn: () => fetchInternshipById(id),
    enabled: !!id,
  });
};

export const createInternship = async (data: CreateInternshipDto): Promise<Internship> => {
  const response = await axios.post<Internship, AxiosResponse<Internship>, CreateInternshipDto>(
    "/internship",
    data,
  );
  return response.data;
};

export const useCreateInternship = () => {
  return useMutation({
    mutationFn: createInternship,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internships"] });
    },
  });
};

export const updateInternship = async (
  id: string,
  data: Partial<CreateInternshipDto & { isActive?: boolean }>,
): Promise<Internship> => {
  const response = await axios.patch<Internship, AxiosResponse<Internship>>(
    `/internship/${id}`,
    data,
  );
  return response.data;
};

export const useUpdateInternship = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateInternshipDto & { isActive?: boolean }> }) =>
      updateInternship(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internships"] });
    },
  });
};

export const deleteInternship = async (id: string): Promise<void> => {
  await axios.delete(`/internship/${id}`);
};

export const useDeleteInternship = () => {
  return useMutation({
    mutationFn: deleteInternship,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internships"] });
    },
  });
};

export const applyToInternship = async (
  internshipId: string,
  data: ApplyToInternshipDto,
): Promise<InternshipApplication> => {
  const response = await axios.post<
    InternshipApplication,
    AxiosResponse<InternshipApplication>,
    ApplyToInternshipDto
  >(`/internship/${internshipId}/apply`, data);
  return response.data;
};

export const useApplyToInternship = () => {
  return useMutation({
    mutationFn: ({ internshipId, data }: { internshipId: string; data: ApplyToInternshipDto }) =>
      applyToInternship(internshipId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internships"] });
      queryClient.invalidateQueries({ queryKey: ["my-applications"] });
    },
  });
};

export const fetchMyApplications = async (): Promise<InternshipApplication[]> => {
  const response = await axios.get<InternshipApplication[], AxiosResponse<InternshipApplication[]>>(
    "/internship/applications/my",
  );
  return response.data;
};

export const useMyApplications = () => {
  return useQuery({
    queryKey: ["my-applications"],
    queryFn: fetchMyApplications,
  });
};


