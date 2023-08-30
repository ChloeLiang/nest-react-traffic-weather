import { FormEvent } from 'react';
import { DatePicker, TimePicker } from '@/features/form';
import { Button } from '@/features/ui';
import './SearchForm.scss';

interface IProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const SearchForm = (props: IProps) => {
  const { onSubmit } = props;

  return (
    <form className="traffic-weather-search-form" onSubmit={onSubmit}>
      <DatePicker
        className="traffic-weather-form-item"
        name="date"
        label="Date"
      />
      <TimePicker
        className="traffic-weather-form-item"
        name="time"
        label="Time"
      />
      <Button type="submit">Search</Button>
    </form>
  );
};

export default SearchForm;
