import { Label } from '..';

import './Select.scss';

interface IProps {
  name: string;
  label: string;
  options: string[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = (props: IProps) => {
  const { name, label, options, onChange } = props;
  return (
    <div>
      <Label id={name}>{label}</Label>
      <select className="select" name={name} id={name} onChange={onChange}>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
