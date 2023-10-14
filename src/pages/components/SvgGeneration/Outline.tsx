import { ProjectItem } from 'api';

export const Outline = ({ data }: { data: ProjectItem }) => {
  // extract math calc to separate file - Utils.ts?
  const radians = (data.rotation * Math.PI) / 180;
  const halfWidth = data.width / 2;
  const halfHeight = data.height / 2;

  const rotx1 =
    data.x - halfWidth * Math.cos(radians) - halfHeight * Math.sin(radians);
  const roty1 =
    data.y - halfWidth * Math.sin(radians) + halfHeight * Math.cos(radians);

  const rotx2 =
    data.x + halfWidth * Math.cos(radians) - halfHeight * Math.sin(radians);
  const roty2 =
    data.y + halfWidth * Math.sin(radians) + halfHeight * Math.cos(radians);

  const rotx3 =
    data.x + halfWidth * Math.cos(radians) + halfHeight * Math.sin(radians);
  const roty3 =
    data.y + halfWidth * Math.sin(radians) - halfHeight * Math.cos(radians);

  const rotx4 =
    data.x - halfWidth * Math.cos(radians) + halfHeight * Math.sin(radians);
  const roty4 =
    data.y - halfWidth * Math.sin(radians) - halfHeight * Math.cos(radians);

  const rotatedXs = [rotx1, rotx2, rotx3, rotx4];
  const rotatedYs = [roty1, roty2, roty3, roty4];

  const newWidth =
    Math.abs(Math.ceil(Math.max(...rotatedXs))) -
    Math.abs(Math.ceil(Math.min(...rotatedXs)));
  const newHeight =
    Math.abs(Math.ceil(Math.max(...rotatedYs))) -
    Math.abs(Math.ceil(Math.min(...rotatedYs)));

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
