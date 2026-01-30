import type { Product } from "./types.mts";

const BASE_URL = import.meta.env.PUBLIC_SERVER_URL;

function convertToJson(res: Response) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getData(category = "tents") {
  return fetch(`../json/${category}.json`)
    .then(convertToJson)
    .then((data) => data);
}

export async function findProductById(id: string) {
  // const products = await getData();
  // return products.find((item: Product) => item.id === id);
  const res = await fetch(`${BASE_URL}products/${id}`);
  const data = (await res.json()) as Product;
  return data;
}
