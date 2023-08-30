import { useState, useEffect } from 'react';

import { fetchTrafficWeather } from '@/features/traffic-weather/apis';
import { ITrafficWeather } from '@/features/traffic-weather/apis/types';

import SearchForm from '@/features/traffic-weather/search-form';
import TrafficList from '@/features/traffic-weather/traffic-list';
import { Select } from '@/features/form';

import './TrafficWeather.scss';

const Home = () => {
  const [location, setLocation] = useState('');
  const [trafficWeatherData, setTrafficWeatherData] = useState<
    ITrafficWeather[]
  >([]);

  const filteredTrafficWeatherData = trafficWeatherData.filter(
    (item) => item.area === location,
  );

  const locationOptions = [
    ...new Set(trafficWeatherData.map((item) => item.area)),
  ];

  useEffect(() => {
    fetchTrafficWeather().then(setTrafficWeatherData);
  }, []);

  useEffect(() => {
    if (trafficWeatherData?.length > 0 && !location) {
      setLocation(trafficWeatherData[0].area);
    }
  }, [trafficWeatherData, location]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      <Select
        name="location"
        label="Location"
        options={locationOptions}
        onChange={(e) => {
          setLocation(e.target.value);
        }}
      />
      <TrafficList items={filteredTrafficWeatherData} />
    </div>
  );
};

export default Home;
