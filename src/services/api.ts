import axios from 'axios';

const YOUR_ACCESS_KEY = 'TK19cVFKHM46yorp5ndTNk1CMLG-TbvdXSEQNs0bYZA';
axios.defaults.baseURL = 'https://api.unsplash.com';

axios.defaults.headers = {
  Authorization: `Client-ID ${YOUR_ACCESS_KEY}`,
  'Accept-Version': 'v1',
};
axios.defaults.params = {
  per_page: 30,
  orientation: 'landscape',
};

export const fetchImages = async (query, page) => {
  const response = await axios.get(`/search/photos`, {
    params: {
      query,
      page,
    },
  });
  return response.data;
};
