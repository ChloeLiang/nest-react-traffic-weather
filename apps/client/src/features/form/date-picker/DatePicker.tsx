import classNames from 'classnames';
import { Label, Input } from '..';

interface IProps {
  label: string;
  name: string;
  className?: string;
}

const DatePicker = (props: IProps) => {
  const { label, name, className } = props;

  return (
    <div className={classNames(className)}>
      <Label id={name}>{label}</Label>
      <Input type="date" name={name} id={name} />
    </div>
  );
};

export default DatePicker;
