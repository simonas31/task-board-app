import useSWR, { mutate as globalMutate } from "swr";
import { api } from "@/lib/axios";

type SidebarProjectType = {
  id: number;
  name: string;
};

export const SIDEBAR_PROJECTS_KEY = "/sidebar/projects";

const projectsFetcher = (url: string) =>
  api.get<SidebarProjectType[]>(url).then((res) => res.data);

export function useSidebarProjects() {
  return useSWR(SIDEBAR_PROJECTS_KEY, projectsFetcher);
}

export function validateSidebarProjects() {
  return globalMutate(SIDEBAR_PROJECTS_KEY);
}
