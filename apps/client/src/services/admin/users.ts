import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  username: string;
  picture: string | null;
  provider: string;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  createdAt: string;
  updatedAt: string;
  _count: {
    resumes: number;
  };
}

interface UsersResponse {
  users: AdminUser[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const fetchAllUsers = async (skip: number = 0, take: number = 50) => {
  const response = await axios.get<UsersResponse, AxiosResponse<UsersResponse>>(
    "/admin/users",
    {
      params: { skip, take },
    },
  );

  return response.data;
};

export const useAllUsers = (skip: number = 0, take: number = 50) => {
  return useQuery({
    queryKey: ["admin", "users", skip, take],
    queryFn: () => fetchAllUsers(skip, take),
  });
};

export const fetchUsersByEmailVerified = async (
  verified: boolean,
  skip: number = 0,
  take: number = 50,
) => {
  const response = await axios.get<UsersResponse, AxiosResponse<UsersResponse>>(
    "/admin/users/email-verified",
    {
      params: { verified: verified.toString(), skip, take },
    },
  );

  return response.data;
};

export const useUsersByEmailVerified = (
  verified: boolean,
  skip: number = 0,
  take: number = 50,
) => {
  return useQuery({
    queryKey: ["admin", "users", "email-verified", verified, skip, take],
    queryFn: () => fetchUsersByEmailVerified(verified, skip, take),
  });
};

export const fetchUsersByTwoFactor = async (
  enabled: boolean,
  skip: number = 0,
  take: number = 50,
) => {
  const response = await axios.get<UsersResponse, AxiosResponse<UsersResponse>>(
    "/admin/users/two-factor",
    {
      params: { enabled: enabled.toString(), skip, take },
    },
  );

  return response.data;
};

export const useUsersByTwoFactor = (enabled: boolean, skip: number = 0, take: number = 50) => {
  return useQuery({
    queryKey: ["admin", "users", "two-factor", enabled, skip, take],
    queryFn: () => fetchUsersByTwoFactor(enabled, skip, take),
  });
};

export const fetchUsersByProvider = async (
  provider: string,
  skip: number = 0,
  take: number = 50,
) => {
  const response = await axios.get<UsersResponse, AxiosResponse<UsersResponse>>(
    `/admin/users/provider/${provider}`,
    {
      params: { skip, take },
    },
  );

  return response.data;
};

export const useUsersByProvider = (
  provider: string,
  skip: number = 0,
  take: number = 50,
) => {
  return useQuery({
    queryKey: ["admin", "users", "provider", provider, skip, take],
    queryFn: () => fetchUsersByProvider(provider, skip, take),
  });
};

