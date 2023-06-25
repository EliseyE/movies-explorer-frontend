// MOVIES EXPLORER API

import { MOVIES_EXPLORER_BASE_URL_API } from "../appConfig";

export let lastResponse = {};

async function responceProcessing(res) {
  const resData = await res.json();
  lastResponse = { resOk: res.ok, resStatus: res.status , resMessage: resData.message };

  if(res.ok)
    return {resValues: res, resData: resData};

  return Promise.reject({resValues: res, resData: resData});
};

async function makeRequset(url, method, data, token) {

  const headers = {
    "Content-Type": "application/json",
  };

  if(token !== undefined)
    headers['Authorization'] = `Bearer ${token}`;

  const config = {
    method,
    credentials: 'include',
    headers
  };

  if(data !== undefined)
    config.body = JSON.stringify(data);

  try {
    const res = await fetch(`${MOVIES_EXPLORER_BASE_URL_API}${url}`, config);
    const resData = responceProcessing(res);
    return resData;
  } catch (err) {
    return err;
  }
};

// USER

export const register = (data) => {
  return makeRequset('/signup', 'POST', data, undefined);
};

export const authorize = (data) => {
  return makeRequset('/signin', 'POST', data, undefined);
};

export const logout = () => {
  return makeRequset('/logout', 'POST', undefined, undefined);
};

// opened token
// export const getUserInfo = (token) => {
//   return makeRequset('/users/me', 'GET', undefined, token);
// };

// cookie token
export const getUserInfo = () => {
  return makeRequset('/users/me', 'GET', undefined, undefined);
};

export const checkTokenAPI = () => {
  return makeRequset('/jwtcheck', 'POST', undefined, undefined);
};

// MOVIES

export const getSavedMovies = () => {
  return makeRequset('/movies', 'GET', undefined, undefined);
};

export const saveMovie = (movie) => {
  return makeRequset('/movies', 'POST', movie, undefined);
};

export const deleteSavedMovie = (id) => {
  return makeRequset(`/movies/${id}`, 'DELETE', undefined, undefined);
};

export const updateUserInfo = (userData) => {
  return makeRequset(`/users/me`, 'PATCH', userData, undefined);
};
