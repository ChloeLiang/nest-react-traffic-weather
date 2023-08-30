import { useState, useEffect } from 'react';

import { fetchTrafficWeather } from '@/features/traffic-weather/apis';
import { ITrafficWeather } from '@/features/traffic-weather/apis/types';

import SearchForm from '@/features/traffic-weather/search-form';
import TrafficList from '@/features/traffic-weather/traffic-list';
import { Select } from '@/features/form';

import './TrafficWeather.scss';

const Home = () => {
  const [location, setLocation] = useState('');
  const [trafficWeatherData, setTrafficWeatherData] =
    useState<ITrafficWeather | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const filteredTrafficData =
    trafficWeatherData?.traffic.filter((item) => item.area === location) || [];

  const locationOptions = [
    ...new Set(trafficWeatherData?.traffic.map((item) => item.area) || []),
  ];
  const weather = trafficWeatherData?.weather[location];

  useEffect(() => {
    fetchTrafficWeather().then((res) => {
      setTrafficWeatherData(res);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (
      trafficWeatherData?.traffic &&
      trafficWeatherData.traffic.length > 0 &&
      !location
    ) {
      setLocation(trafficWeatherData.traffic[0].area);
    }
  }, [trafficWeatherData, location]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const date = formData.get('date');
    const time = formData.get('time');
    try {
      setIsLoading(true);
      const res = await fetchTrafficWeather(String(date), String(time));
      setTrafficWeatherData(res);
      setIsLoading(false);
    } catch (e) {
      setTrafficWeatherData({ traffic: [], weather: {} });
      setIsLoading(false);
    }
  };

  return (
    <div className="traffic-weather">
      <SearchForm onSubmit={handleSubmit} />
      <div className="traffic-weather__filter">
        {!isLoading ? (
          <>
            <Select
              name="location"
              label="Location"
              options={locationOptions}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
            <div className="traffic-weather__weather">
              <strong>{weather}</strong>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <TrafficList items={filteredTrafficData} />
    </div>
  );
};

export default Home;
