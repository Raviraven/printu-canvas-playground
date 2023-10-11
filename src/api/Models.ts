export interface ProjectContainer {
  id: string;
  project: Project;
}

export interface Project {
  id: string;
  name: string;
  width: number;
  height: number;
  items: ProjectItem[];
}

export interface ProjectItem {
  id: string;
  type: ProjectItemType;
  color: string;
  rotation: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export type ProjectItemType = 'rectangle' | 'ellipse';

export interface GeneralProjectInfo {
  id: string;
  name: string;
  modified: number;
}
