import api from "../utils/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Post } from "@prisma/client";

interface UsePostsPayload {
  page?: number;
  size?: number;
  search?: string;
}

interface PostResponse {
  data: Post[];
  meta: {
    currentPage: number;
    size: number;
    total: number;
    totalPages: number;
  };
}

export const usePosts = (payload?: UsePostsPayload) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", payload],
    queryFn: () => api.get("/posts", { params: payload }),
  });

  return {
    data: data?.data as PostResponse,
    isLoading,
    isError,
  };
};

export const usePost = (id?: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => api.get(`/posts/${id}`),
    enabled: !!id,
  });

  return {
    data: data?.data as Post,
    isLoading,
    isError,
  };
};

export const usePostCreate = () => {
  const client = useQueryClient();
  const mutation = useMutation((data: Post) => api.post("/posts", data), {
    onSuccess: () => {
      client.invalidateQueries("posts");
    },
  });

  return mutation;
};

export const usePostUpdate = () => {
  const client = useQueryClient();
  const mutation = useMutation(({ id, ...data }: Post) => api.put(`/posts/${id}`, data), {
    onSuccess: () => {
      client.invalidateQueries("posts");
    },
  });

  return mutation;
};

export const usePostDelete = () => {
  const client = useQueryClient();
  const mutation = useMutation((id: string) => api.delete(`/posts/${id}`), {
    onSuccess: () => {
      client.invalidateQueries("posts");
    },
  });

  return mutation;
};
