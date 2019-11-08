export const TOKEN_KEY = '_organizrJwt';

const auth = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },
  setToken(token) {
    return localStorage.setItem(TOKEN_KEY, token);
  },
  deleteToken() {
    return localStorage.removeItem(TOKEN_KEY);
  },
};

export default auth;
