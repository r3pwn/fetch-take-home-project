import { redirect } from "next/navigation";

/**
 * An auth cookie, `fetch-access-token`, will be included in the response headers. This will expire in 1 hour.
 * @param name - the user's name
 * @param email - the user's email
 */
export const login = async (name: string, email: string) => {
  await fetch(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ name, email }),
  });
};

/**
 * Securely ends the current user’s session. This will invalidate the auth cookie.
 */
export const logout = async () => {
  await fetch(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
};

export const authWrapper = async (apiCall: Promise<Response>) => {
  const result = await apiCall;

  if (result.status === 401) {
    redirect("/login");
  }

  return result;
};
