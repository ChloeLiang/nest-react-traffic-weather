import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, catchError } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getTraffic(dateTime: string) {
    const { data } = await firstValueFrom(
      this.httpService
        .get('https://api.data.gov.sg/v1/transport/traffic-images', {
          params: {
            date_time: dateTime,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw new Error(error.message);
          }),
        ),
    );

    return data?.items[0]?.cameras || [];
  }

  async getWeather(dateTime: string) {
    const { data } = await firstValueFrom(
      this.httpService
        .get('https://api.data.gov.sg/v1/environment/2-hour-weather-forecast', {
          params: {
            date_time: dateTime,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw new Error(error.message);
          }),
        ),
    );

    // { 'Ang Mo Kio': 'Cloudy' }
    const forecasts = {};
    data.items[0].forecasts.forEach((item) => {
      forecasts[item.area] = item.forecast;
    });

    return {
      areaMetaData: data.area_metadata.map((area) => ({
        name: area.name,
        latitude: area.label_location.latitude,
        longitude: area.label_location.longitude,
      })),
      forecasts,
    };
  }

  async getTrafficAndWeather(dateTime: string) {
    const [trafficData, weatherData] = await Promise.all([
      this.getTraffic(dateTime),
      this.getWeather(dateTime),
    ]);

    return {
      traffic: trafficData
        .map((camera) => {
          const area = this.findLocationName(
            weatherData.areaMetaData,
            camera.location.latitude,
            camera.location.longitude,
          );

          return {
            ...camera,
            area,
          };
        })
        .sort((a, b) => (a.area > b.area ? 1 : b.area > a.area ? -1 : 0)),
      weather: weatherData.forecasts,
    };
  }

  findLocationName(
    locations: {
      name: string;
      latitude: number;
      longitude: number;
    }[],
    latitude: number,
    longitude: number,
  ) {
    const distances = locations.map((loc) =>
      this.distance(loc.latitude, loc.longitude, latitude, longitude),
    );
    const index = distances.findIndex((d) => d === Math.min(...distances));
    return locations[index].name;
  }

  // https://www.geodatasource.com/developers/javascript
  distance(lat1, lon1, lat2, lon2) {
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    } else {
      const radlat1 = (Math.PI * lat1) / 180;
      const radlat2 = (Math.PI * lat2) / 180;
      const theta = lon1 - lon2;
      const radtheta = (Math.PI * theta) / 180;
      let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      return dist;
    }
  }
}
