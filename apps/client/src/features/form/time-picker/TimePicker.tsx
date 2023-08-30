import classNames from 'classnames';
import { Label, Input } from '..';

interface IProps {
  label: string;
  name: string;
  className?: string;
}

const TimePicker = (props: IProps) => {
  const { label, name, className } = props;

  return (
    <div className={classNames(className)}>
      <Label id={name}>{label}</Label>
      <Input type="time" name={name} id={name} step="1" />
    </div>
  );
};

export default TimePicker;
