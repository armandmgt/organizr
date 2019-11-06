export const TOKEN_KEY = '_organizrJwt';

export default {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },
  setToken(token) {
    return localStorage.setItem(TOKEN_KEY, token);
  },
};
