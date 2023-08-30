export interface ITrafficWeather {
  area: string;
  camera_id: string;
  image: string;
  image_metadata: {
    height: number;
    md5: string;
    width: number;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  timestamp: string;
  weatherForecast: string;
}
