import { jws, b64utoutf8 } from 'jsrsasign';
import { TOKEN_CLAIMS_VERIF, TOKENS_KEY } from './constants';

const verifyToken = token => {
  try {
    return jws.JWS.verifyJWT(token, TOKENS_KEY, {
      alg: ['HS256'],
      ...TOKEN_CLAIMS_VERIF,
    });
  } catch (e) {
    return false;
  }
};

export const getId = token => {
  return jws.JWS.readSafeJSONString(b64utoutf8(token.split('.')[1])).jti;
};

export default verifyToken;
