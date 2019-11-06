import { jws } from 'jsrsasign';
import { TOKEN_CLAIMS, TOKENS_KEY } from './constants';

const createToken = user => {
  // Header
  const oHeader = { alg: 'HS256', typ: 'JWT' };
  // Payload
  const oPayload = { ...TOKEN_CLAIMS };
  oPayload.nbf = jws.IntDate.get('now');
  oPayload.iat = jws.IntDate.get('now');
  oPayload.exp = jws.IntDate.get('now + 1day');
  oPayload.jti = user._id;
  // Sign JWT, password=616161
  const sHeader = JSON.stringify(oHeader);
  const sPayload = JSON.stringify(oPayload);
  return jws.JWS.sign('HS256', sHeader, sPayload, TOKENS_KEY);
};

export default createToken;
