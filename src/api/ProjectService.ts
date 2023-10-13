import { axiosInstance } from './axios';
import { ProjectUrls } from './ProjectUrls';
import { GeneralProjectInfo, ProjectContainer } from './ApiModels';

export const GetRandomProject = async () => {
  const result = await axiosInstance.get<GeneralProjectInfo>(ProjectUrls.Init);
  return result.data;
};

export const GetProjectData = async (Id: string) => {
  const result = await axiosInstance.get<ProjectContainer>(
    ProjectUrls.Project(Id),
  );
  return result.data;
};
