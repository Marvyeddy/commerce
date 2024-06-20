import axios from 'axios';

const ApiKey = process.env.NEXT_PUBLIC_REST_API_KEY;
const ApiUrl = process.env.NEXT_PUBLIC_REST_API_URL;

const axiosClient = axios.create({
  baseURL: ApiUrl,
  headers: {
    Authorization: `Bearer ${ApiKey}`,
  },
});

const getProducts = () =>
  axiosClient.get('/products?populate=*').then((resp) => {
    return resp.data.data;
  });

const getCategories = () =>
  axiosClient.get('/categories?populate=*').then((resp) => {
    return resp.data.data;
  });

export default {
  getProducts,
  getCategories,
};
