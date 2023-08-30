import { HTMLProps } from 'react';
import './Input.scss';

const Input = (props: HTMLProps<HTMLInputElement>) => {
  return <input className="form-input" {...props} />;
};

export default Input;
