export interface ITraffic {
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
}

export interface ITrafficWeather {
  traffic: ITraffic[];
  weather: {
    [key: string]: string;
  };
}
