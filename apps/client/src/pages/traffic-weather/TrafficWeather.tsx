import { useState, FormEvent } from 'react';

import { fetchTrafficWeather } from '@/features/traffic-weather/apis';
import { ITrafficWeather } from '@/features/traffic-weather/apis/types';

import SearchForm from '@/features/traffic-weather/search-form';
import TrafficList from '@/features/traffic-weather/traffic-list';

import './TrafficWeather.scss';

const Home = () => {
  const [trafficWeatherData, setTrafficWeatherData] = useState<
    ITrafficWeather[]
  >([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const date = formData.get('date');
    const time = formData.get('time');
    const res = await fetchTrafficWeather(String(date), String(time));
    setTrafficWeatherData(res);
  };

  return (
    <div className="traffic-weather">
      <SearchForm onSubmit={handleSubmit} />
      <TrafficList items={trafficWeatherData} />
    </div>
  );
};

export default Home;
