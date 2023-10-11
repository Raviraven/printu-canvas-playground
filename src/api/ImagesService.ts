import { axiosInstance } from './axios';
import { GraphicalProjectUrls } from './GraphicalProjectUrls';
import { GeneralProjectInfo, ProjectContainer } from './Models';

export const GetRandomProject = async () => {
  const result = await axiosInstance.get<GeneralProjectInfo>(
    GraphicalProjectUrls.Init,
  );
  return result.data;
};

export const GetProjectData = async (Id: string) => {
  const result = await axiosInstance.get<ProjectContainer>(
    GraphicalProjectUrls.Project(Id),
  );
  return result.data;
};
