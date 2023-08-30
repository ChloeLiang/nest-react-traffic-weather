import { DatePicker, TimePicker } from '@/features/form';
import { Button } from '@/features/ui';
import './SearchForm.scss';

const SearchForm = () => {
  return (
    <form
      className="traffic-weather-search-form"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const date = formData.get('date');
        const time = formData.get('time');
        console.log('date', date);
        console.log('time', time);
      }}
    >
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
