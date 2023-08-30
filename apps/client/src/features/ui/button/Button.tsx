import { ReactNode } from 'react';
import classNames from 'classnames';
import './Button.scss';

interface IProps {
  children: ReactNode;
  type: 'submit' | 'button';
  className?: string;
}

const Button = (props: IProps) => {
  const { children, type, className } = props;

  return (
    <button className={classNames('button', className)} type={type}>
      {children}
    </button>
  );
};

export default Button;
