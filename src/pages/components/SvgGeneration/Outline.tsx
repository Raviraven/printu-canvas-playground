import { ProjectItem } from 'api';
import { CalculateOutlineValues } from '../Utils';

export const Outline = ({ data }: { data: ProjectItem }) => {
  const { newHeight, newWidth, rotatedXs, rotatedYs } = CalculateOutlineValues(
    data.height,
    data.width,
    data.rotation,
    data.x,
    data.y,
  );

  return (
    <rect
      x={Math.min(...rotatedXs)}
      y={Math.min(...rotatedYs)}
      height={newHeight}
      width={newWidth}
      fill="none"
      stroke="red"
      strokeWidth={1}
    />
  );
};
