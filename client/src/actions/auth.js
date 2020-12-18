import axios from 'axios';

export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('refresh', data.refresh);
    localStorage.setItem('token', JSON.stringify(data));
    next();
  }
};

export const authenticate_access = (data, next) => {
  localStorage.setItem('token', JSON.stringify(data));
  next();
};

export const logout = (next) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    next();
    return axios
      .get(`/pb/auth/logout`)
      .then((res) => {
        'signout', res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export const isAuthenticated = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  if (localStorage.getItem('token')) {
    return JSON.parse(localStorage.getItem('token'));
  } else {
    return false;
  }
};

export const getNewAccessToken = () => {
  if (localStorage.getItem('refresh')) {
    const refresh = localStorage.getItem('refresh');
    return axios
      .post(`/pb/auth/token`, {
        token: refresh,
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }
};
