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

const categoryFilter = (category: any) =>
  axiosClient
    .get(`/products?filters[categories][name][$in]=${category}&populate=*`)
    .then((resp) => {
      return resp.data.data;
    });

const addToCart = (data: object, jwt: any) =>
  axios.post(
    'https://e-commerce-backend-n7j5.onrender.com/api/user-carts',
    data,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

const registerUser = (username: any, email: any, password: any) =>
  axiosClient.post('/auth/local/register', {
    username: username,
    email: email,
    password: password,
  });

const signInUser = (email: any, password: any) =>
  axios.post('https://e-commerce-backend-n7j5.onrender.com/api/auth/local', {
    identifier: email,
    password: password,
  });

const getCartItems = (userId: any, jwt: any) =>
  axios
    .get(
      `https://e-commerce-backend-n7j5.onrender.com/api/user-carts?filters[userId][$eq]=${userId}&[populate][products][populate][image][populate][0]=url`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
    .then((resp) => {
      return resp.data.data;
    });

const deleteCartItem = (id: number, jwt: any) =>
  axios.delete(
    `https://e-commerce-backend-n7j5.onrender.com/api/user-carts/${id}`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

export default {
  getProducts,
  getCategories,
  categoryFilter,
  addToCart,
  registerUser,
  signInUser,
  getCartItems,
  deleteCartItem,
};
