import { ProjectContainer, ProjectItem } from 'api';
import { useEffect, useState } from 'react';
import { Project } from 'api/Models';
import { Outline } from './Outline';

interface CanvasProps {
  data?: ProjectContainer;
}

interface SingleFigureProps {
  figureData: ProjectItem;
}

const SingleFigure = ({ figureData }: SingleFigureProps) => {
  switch (figureData.type) {
    case 'rectangle':
      return (
        <g>
          <rect
            fill={figureData.color}
            x={figureData.x - figureData.width / 2}
            y={figureData.y - figureData.height / 2}
            width={figureData.width}
            height={figureData.height}
            transform={`rotate(${figureData.rotation} ${figureData.x} ${figureData.y})`}
          />
          <Outline data={figureData} />
          <Label data={figureData} />
        </g>
      );
    case 'ellipse':
      return (
        <g>
          <ellipse
            fill={figureData.color}
            cx={figureData.x}
            cy={figureData.y}
            rx={figureData.width / 2}
            ry={figureData.height / 2}
            transform={`rotate(${figureData.rotation} ${figureData.x} ${figureData.y})`}
          />
          <Outline data={figureData} />
          <Label data={figureData} />
        </g>
      );
  }
};

const Label = ({ data }: { data: ProjectItem }) => {
  return (
    <g>
      <circle cx={data.x} cy={data.y} fill={'white'} r={4} />
      <text
        x={data.x + 25} //
        y={data.y - 5}
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {data.rotation}°
      </text>
    </g>
  );
};

export const Canvas = (props: CanvasProps) => {
  const [project, setProject] = useState<Project>();

  useEffect(() => {
    if (!props.data) {
      return;
    }

    setProject(props.data.project);
  }, [props.data]);

  return !project ? (
    <></>
  ) : (
    //<svg width={project.width} height={project.height}>
    //<svg height={'100%'} width={'100%'} xmlns="http://www.w3.org/2000/svg">
    <svg
      viewBox={`0 0 ${project.width} ${project.height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {project.items.map((n) => {
        return <SingleFigure key={`figure-${n.id}`} figureData={n} />;
      })}
    </svg>
    //</svg>
  );
};
