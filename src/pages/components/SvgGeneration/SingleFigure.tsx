import { ProjectItem } from 'api';
import { Outline } from './Outline';
import { ReactNode } from 'react';

interface SingleFigureProps {
  figureData: ProjectItem;
}

export const SingleFigure = ({ figureData }: SingleFigureProps) => {
  switch (figureData.type) {
    case 'rectangle':
      return (
        <SvgFigureWrapper data={figureData}>
          <rect
            fill={figureData.color}
            x={figureData.x - figureData.width / 2}
            y={figureData.y - figureData.height / 2}
            width={figureData.width}
            height={figureData.height}
            transform={`rotate(${figureData.rotation} ${figureData.x} ${figureData.y})`}
          />
        </SvgFigureWrapper>
      );
    case 'ellipse':
      return (
        <SvgFigureWrapper data={figureData}>
          <ellipse
            fill={figureData.color}
            cx={figureData.x}
            cy={figureData.y}
            rx={figureData.width / 2}
            ry={figureData.height / 2}
            transform={`rotate(${figureData.rotation} ${figureData.x} ${figureData.y})`}
          />
        </SvgFigureWrapper>
      );
    default:
      throw new Error('Passed type not implemented yet.');
  }
};

const SvgFigureWrapper = ({
  children,
  data,
}: {
  children: ReactNode;
  data: ProjectItem;
}) => {
  return (
    <g>
      {children}
      <Outline data={data} />
      <Label data={data} />
    </g>
  );
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
