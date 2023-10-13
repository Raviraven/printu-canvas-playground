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
