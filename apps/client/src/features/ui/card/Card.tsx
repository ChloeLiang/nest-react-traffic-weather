import './Card.scss';

interface IProps {
  title: string;
  desc: string;
  imageUrl: string;
  imageDesc?: string;
}

const Card = (props: IProps) => {
  const { title, desc, imageUrl, imageDesc } = props;

  return (
    <div className="card">
      <p className="card__title">{title}</p>
      <p className="card__desc">{desc}</p>
      <img className="card__img" src={imageUrl} alt={imageDesc || title} />
    </div>
  );
};

export default Card;
