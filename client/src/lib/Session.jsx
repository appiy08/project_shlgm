import { SignJWT, jwtVerify } from "jose";
import { get } from "lodash";
import { Cookies } from "react-cookie";
// End Imports
const secretKey = "secret";

const key = new TextEncoder().encode(secretKey);

const cookies = new Cookies();

export async function encrypt(payload) {
  const result = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key);

  return result;
}

export async function decrypt(input) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export const createCookie = async (name, data, expireTime) => {
  const expires = expireTime ?? new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt({ data, expires });
  cookies.set(name, session, { expires, path: "/" });
};

export const getCookie = async (name) => {
  const session = cookies.get(name);
  if (!session) {
    return null;
  }

  try {
    const result = await decrypt(session);
    return get(result, "data", {}); // Assuming get is a function to retrieve nested properties
  } catch (err) {
    console.error("Error decrypting session:", err);
    throw err; // Rethrow the error to ensure the calling code can handle it
  }
};


export const updateSession = (name, request, expireTime) => {
  return new Promise((resolve, reject) => {
    try {
      const session = request.cookies.get(name);
      if (!session) return;
      // Refresh the session so it doesn't expire
      const parsed = decrypt(session.toString());
      parsed.expires = expireTime ?? new Date(Date.now() + 24 * 60 * 60 * 1000);
      cookies.set(name, encrypt(parsed), {
        expires: parsed.expires,
        path: "/",
      });
      resolve(encrypt(parsed));
    } catch (error) {
      console.error("Error updating session:", error);
      reject(error);
    }
  });
};
