import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, SliceLoadingState } from 'redux-stuff';
import { ValidateSvgData } from '../Utils';
import { SingleFigure } from './SingleFigure';

import './Canvas.scss';

export const Canvas = () => {
  const { Project, Status } = useSelector(
    (state: RootState) => state.projectDetails,
  );
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  useEffect(() => {
    if (Project?.project) {
      setValidationErrors(ValidateSvgData(Project.project.items));
    }
  }, [Project?.project]);

  if (Status === SliceLoadingState.idle) {
    return <></>;
  }

  if (Status === SliceLoadingState.rejected) {
    return <p className={'error'}>Error occured.</p>;
  }

  if (validationErrors.length > 0) {
    return (
      <section className={'validation-errors'}>
        <ul>
          {validationErrors.map((n) => {
            return <li className={'validation-error'}>{n}</li>;
          })}
        </ul>
      </section>
    );
  }

  return Status === SliceLoadingState.pending ? (
    <>Loading</>
  ) : !Project?.project ? (
    <>Invalid data.</>
  ) : (
    <section className={'svg-canvas'}>
      <svg
        viewBox={`0 0 ${Project.project.width} ${Project.project.height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {Project.project.items.map((n) => {
          return <SingleFigure key={`figure-${n.id}`} figureData={n} />;
        })}
      </svg>
    </section>
  );
};
