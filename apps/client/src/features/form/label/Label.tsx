import { ReactNode } from 'react';
import './Label.scss';

interface IProps {
  id: string;
  children: ReactNode;
}

const Label = (props: IProps) => {
  const { id, children } = props;

  return (
    <label className="form-label" htmlFor={id}>
      {children}
    </label>
  );
};

export default Label;
