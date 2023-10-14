import { Canvas, CanvasWrapper, FetchProjectForm } from './components';

export const CanvasDisplayPage = () => {
  return (
    <>
      <FetchProjectForm />
      <CanvasWrapper>
        <Canvas />
      </CanvasWrapper>
    </>
  );
};
