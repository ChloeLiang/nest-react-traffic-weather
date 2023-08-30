const fetchTrafficWeather = async (date?: string, time?: string) => {
  const now = new Date();
  const finalDate =
    date || now.toLocaleDateString().split('/').reverse().join('-');
  const finalTime = time || now.toLocaleTimeString();
  const dateTime = finalDate + 'T' + finalTime;
  const res = await fetch(`/api/traffic-weather?dateTime=${dateTime}`);
  if (!res.ok) {
    throw new Error('Failed to fetch traffic cam and whether forecast data.');
  }

  return res.json();
};

export default fetchTrafficWeather;
