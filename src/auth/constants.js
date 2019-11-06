export const TOKENS_KEY = '616161';
export const TOKEN_CLAIMS = {
  iss: 'http://localhost',
  aud: 'http://localhost/user',
};
export const TOKEN_CLAIMS_VERIF = Object.entries(TOKEN_CLAIMS).reduce(
  (a, [k, v]) => ({ [k]: [v], ...a }),
  {}
);
