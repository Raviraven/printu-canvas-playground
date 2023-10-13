import React from 'react';
import './App.scss';
import { CanvasDisplayPage } from './pages/CanvasDisplay.page';
import { ToastContainer } from 'react-toastify';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { useDispatch } from 'react-redux';
import { AppDispatch, resetProjectDetailsData } from './redux-stuff';

const SvgValidationError = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <section>
      <p className={'validation-error'}>{error.message}</p>
      <button onClick={resetErrorBoundary}>
        Try again with different values.
      </button>
    </section>
  );
};

function App() {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <ErrorBoundary
      FallbackComponent={SvgValidationError}
      onReset={() => {
        dispatch(resetProjectDetailsData());
      }}
    >
      <div className="App">
        <CanvasDisplayPage />
        <ToastContainer theme={'colored'} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
