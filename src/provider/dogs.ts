import { authWrapper } from "./auth";

export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface DogSearchParams {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: number;
  sort?: string;
}

/**
 * @returns an array of all possible breed names.
 */
export const getBreeds = async (): Promise<string[]> => {
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
  const res = await authWrapper(
    fetch(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/dogs`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      credentials: "include",
      body: JSON.stringify(ids),
    })
  );
  return await res.json();
};

/**
 * @param ids - an array of (no more than 100) dog IDs
 * @returns Returns a match
 */
export const getDogMatch = async (ids: string[]): Promise<string> => {
  const res = await authWrapper(
    fetch(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/dogs/match`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      credentials: "include",
      body: JSON.stringify(ids),
    })
  );
  const matchResult = (await res.json()) as { match: string };
  return matchResult.match;
};

/**
 * Searches for dogs based on the provided query parameters.
 *
 * @param {Object} params - The search parameters.
 * @param {string[]} [params.breeds] - An array of breeds to filter on
 * @param {string[]} [params.zipCodes] - An array of zip codes to filter on
 * @param {number} [params.ageMin] - The minimum age to filter on
 * @param {number} [params.ageMax] - The maximum age to filter on
 * @param {number} [params.size] - The number of results to return (defaults to 25)
 * @param {number} [params.from] - A cursor to be used when paginating results (optional).
 * @param {string} [params.sort] - The field by which to sort results, and the direction of the sort; in the format `sort=field:[asc|desc]`.
 * @returns {Promise<Object>} Returns an object with the following properties:
 * - resultIds: An array of dog IDs matching your query.
 * - total: The total number of results for the query (not just the current page).
 * - next: A query to request the next page of results (if one exists).
 * - prev: A query to request the previous page of results (if one exists).
 */
export const searchDogs = async (
  params: DogSearchParams
): Promise<{
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
}> => {
  const query = new URLSearchParams();

  if (params.breeds) {
    for (const breed of params.breeds) {
      query.append("breeds", breed);
    }
  }
  if (params.zipCodes) {
    for (const zipCode of params.zipCodes) {
      query.append("zipCodes", zipCode);
    }
  }
  if (params.ageMin !== undefined) {
    query.append("ageMin", params.ageMin.toString());
  }
  if (params.ageMax !== undefined) {
    query.append("ageMax", params.ageMax.toString());
  }
  if (params.size !== undefined) {
    query.append("size", params.size.toString());
  }
  if (params.from) {
    query.append("from", params.from.toString());
  }
  if (params.sort) {
    query.append("sort", params.sort);
  }

  const apiQuery = query.size > 0 ? `?${query.toString()}` : "";
  const res = await authWrapper(
    fetch(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/dogs/search${apiQuery}`, {
      credentials: "include",
    })
  );

  return await res.json();
};
