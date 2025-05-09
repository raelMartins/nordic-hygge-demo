import {SignJWT, jwtVerify} from 'jose';
import {deleteCookie, getCookie, setCookie} from 'cookies-next';

const secretKey = 'existence';
// process.env.NEXT_PUBLIC_JWT_KEY;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime(payload.expires)
    .sign(key);
}

export async function decrypt(input) {
  const {payload} = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  });

  return payload;
}

export async function setSession(info, key, expires) {
  const session = await encrypt({info, expires});

  setCookie(key, session, {
    path: '/',
    expires,
  });
}

export function deleteCookies(key) {
  if (Array.isArray(key)) {
    for (let index = 0; index < key.length; index++) {
      const cookieKey = key[index];
      deleteCookie(cookieKey);
    }
  } else {
    return deleteCookie(key);
  }
}

export async function getSession(key) {
  const session = getCookie(key);
  if (!session) return null;
  const decrypted = await decrypt(session);
  return decrypted.info;
}

export async function getServersideCookie(cookie) {
  const decrypted = await decrypt(cookie);
  return decrypted.info;
}
