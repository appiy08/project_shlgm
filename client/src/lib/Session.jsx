import { SignJWT, jwtVerify } from "jose";
import { Cookies } from "react-cookie";
// End Imports
const secretKey = "secret";
console.log("secret key: " + secretKey);

const key = new TextEncoder().encode(secretKey);
console.log("key: " + key);

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

export async function createCookie(name, data, expireTime) {
  const expires = expireTime ?? new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt({ data, expires });
  cookies.set(name, session, { expires, path: "/" });
}

export async function getCookie(name) {
  try {
    const session = await cookies.get(name);

    if (!session) {
      return null;
    } else {
      const result = await decrypt(session);
      console.log("cookie :>:>:>:>", result);
      return result?.data;
    }
  } catch (error) {
    console.error("Error getting cookie:", error);
    return null;
  }
}

export async function updateSession(name, request, expireTime) {
  try {
    const session = request.cookies.get(name);
    if (!session) return;

    // Refresh the session so it doesn't expire
    const parsed = await decrypt(session.toString());
    parsed.expires = expireTime ?? new Date(Date.now() + 24 * 60 * 60 * 1000);
    cookies.set(name, await encrypt(parsed), {
      expires: parsed.expires,
      path: "/",
    });
  } catch (error) {
    console.error("Error updating session:", error);
  }
}
