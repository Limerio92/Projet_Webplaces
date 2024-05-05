import axios from "axios";

export const client = axios.create({
  baseURL: "/api",
});

export default function apiRequest(
  method: string,
  path = "",
  payload = {},
  headers = {},
) {
  const options = {
    method,
    withCredentials: true,
    url: path,
    data: payload,
    headers: headers,
    json: true,
  };

  return client(options);
}
