import { authWrapper } from "./auth";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

/**
 * @returns an array of all possible breed names.
 */
export const getBreeds = async (): Promise<string[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVICE_HOST}/dogs/breeds`,
    {
      credentials: "include",
    }
  );
  return await res.json();
};

/**
 * @returns an array of all possible breed names.
 */
export const getBreeds2 = async (): Promise<string[]> => {
  const res = await authWrapper(
    fetch(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/dogs/breeds`, {
      credentials: "include",
    })
  );
  return await res.json();
};

/**
 * @param ids - an array of (no more than 100) dog IDs
 * @returns Returns an array of dog objects
 */
export const getDogs = async (ids: string[]): Promise<Dog[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/dogs`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(ids),
  });
  return await res.json();
};
