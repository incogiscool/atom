import { cookies } from "next/headers";
import { cache } from "react";

import type { Session, User } from "lucia";
import { lucia } from "../init";
import { connectToDatabase } from "../../mongo/init";

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    await connectToDatabase();

    console.log("validating request");

    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    console.log("got cookies session id, sessionId: ", sessionId);
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    console.log("validating session");
    const result = await lucia.validateSession(sessionId);

    console.log("validated session");

    // next.js throws when you attempt to set cookie when rendering page
    try {
      console.log("setting session cookie");
      console.log(result.session, result.session?.userId);
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }

      if (!result.session) {
        console.log("creating new blank session");
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
    } catch (err: any) {
      console.error(err);
    }
    return result;
  }
);
