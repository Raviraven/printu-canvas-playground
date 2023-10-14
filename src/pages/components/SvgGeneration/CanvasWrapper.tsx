import { ReactNode } from 'react';

import './CanvasWrapper.scss';

export const CanvasWrapper = ({ children }: { children: ReactNode }) => {
  return <section className={'canvas-wrapper'}>{children}</section>;
};
