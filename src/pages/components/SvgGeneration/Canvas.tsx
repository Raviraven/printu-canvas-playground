import { useSelector } from 'react-redux';
import { RootState, SliceLoadingState } from 'redux-stuff';
import { ValidateSvgData } from '../Utils';
import { SingleFigure } from './SingleFigure';

export const Canvas = () => {
  const { Project, Status, Error } = useSelector(
    (state: RootState) => state.projectDetails,
  );

  if (Status === SliceLoadingState.rejected) {
    return <>Error occured.</>;
  }

  if (Project?.project) {
    const validationErrors = ValidateSvgData(Project.project.items);

    if (validationErrors.length > 0) {
      return (
        <section>
          <ul>
            {validationErrors.map((n) => {
              return <li className={'validation-error'}>{n}</li>;
            })}
          </ul>
        </section>
      );
    }
  }

  return Status === SliceLoadingState.pending ? (
    <>Loading</>
  ) : !Project?.project ? (
    <>Invalid data.</>
  ) : (
    <>
      <svg
        viewBox={`0 0 ${Project.project.width} ${Project.project.height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {Project.project.items.map((n) => {
          return <SingleFigure key={`figure-${n.id}`} figureData={n} />;
        })}
      </svg>
    </>
  );
};
