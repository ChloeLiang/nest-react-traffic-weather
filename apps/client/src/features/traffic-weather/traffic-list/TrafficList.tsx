import { Card } from '@/features/ui';
import { ITrafficWeather } from '../apis/types';
import './TrafficList.scss';

interface IProps {
  items: ITrafficWeather[];
}

const TrafficList = (props: IProps) => {
  const { items } = props;

  return (
    <div className="traffic-weather-traffic-list">
      {items.map((item) => (
        <Card
          key={item.camera_id}
          title={`${item.area} #${item.camera_id}`}
          desc={item.timestamp}
          imageUrl={item.image}
        />
      ))}
    </div>
  );
};

export default TrafficList;
