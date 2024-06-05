import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";
import { decrypt } from "./Session";
import { redirect } from "next/navigation";
import { getUserData } from "./actions/user";
import _ from "lodash";
//  End Imports
export const verifySession = cache(async () => {
  const cookie = cookies().get("auth_credentials")?.value;
  const session = await decrypt(cookie?.toString() ?? "");

  if (!session?._id) {
    redirect("/auth/signin");
  }

  return { isAuth: true, userId: session._id };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const result = await getUserData(session.userId);

    if (_.get(result, "status") === 200) {
      const user = _.get(result, "data.data");
      return user;
    }
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
});
