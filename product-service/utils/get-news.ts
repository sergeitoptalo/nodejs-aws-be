import axios from 'axios';

export const getTechnologyNews = async () => {
  return axios.get(
    'https://newsapi.org/v2/top-headlines?category=technology&pageSize=5&apiKey=1de7e5223cf14337a6dd0e1330b80c7f'
  );
};
