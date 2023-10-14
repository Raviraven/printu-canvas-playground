import { ProjectItem } from 'api';

interface ValidateSvgFigureDataProps {
  height: number;
  width: number;
  x: number;
  y: number;
  rotation: number;
}

export const ValidateSvgData = (items: ProjectItem[]) => {
  const validationErrors: string[] = [];
  items.forEach((i) =>
    validationErrors.push(
      ...ValidateSingleItem({
        width: i.width,
        height: i.height,
        rotation: i.rotation,
        y: i.y,
        x: i.x,
      }),
    ),
  );
  return validationErrors;
};

const ValidateSingleItem = (props: ValidateSvgFigureDataProps) => {
  const { x, y, rotation, height, width } = props;

  var validationResult = [];

  if (isNaN(x) || isNaN(y)) {
    validationResult.push('Invalid x or y.');
  }

  if (rotation < 0 || height <= 0 || width <= 0) {
    validationResult.push('Rotation, height or width < 0');
  }

  if (isNaN(rotation) || isNaN(height) || isNaN(width)) {
    validationResult.push('Invalid rotation / height / width');
  }

  return validationResult;
};

export const CalculateOutlineValues = (
  height: number,
  width: number,
  rotation: number,
  x: number,
  y: number,
) => {
  const radians = (rotation * Math.PI) / 180;
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  const rotx1 =
    x - halfWidth * Math.cos(radians) - halfHeight * Math.sin(radians);
  const roty1 =
    y - halfWidth * Math.sin(radians) + halfHeight * Math.cos(radians);

  const rotx2 =
    x + halfWidth * Math.cos(radians) - halfHeight * Math.sin(radians);
  const roty2 =
    y + halfWidth * Math.sin(radians) + halfHeight * Math.cos(radians);

  const rotx3 =
    x + halfWidth * Math.cos(radians) + halfHeight * Math.sin(radians);
  const roty3 =
    y + halfWidth * Math.sin(radians) - halfHeight * Math.cos(radians);

  const rotx4 =
    x - halfWidth * Math.cos(radians) + halfHeight * Math.sin(radians);
  const roty4 =
    y - halfWidth * Math.sin(radians) - halfHeight * Math.cos(radians);

  const rotatedXs = [rotx1, rotx2, rotx3, rotx4];
  const rotatedYs = [roty1, roty2, roty3, roty4];

  const newWidth =
    Math.abs(Math.ceil(Math.max(...rotatedXs))) -
    Math.abs(Math.ceil(Math.min(...rotatedXs)));
  const newHeight =
    Math.abs(Math.ceil(Math.max(...rotatedYs))) -
    Math.abs(Math.ceil(Math.min(...rotatedYs)));

  return { newHeight, newWidth, rotatedXs, rotatedYs };
};
