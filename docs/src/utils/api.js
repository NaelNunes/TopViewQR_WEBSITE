export const baseURL =
  "https://musical-doodle-v9pgwq5w7v5hxv9-8080.app.github.dev/api";

// export const baseURL = "https://caixadoisdb.azurewebsites.net";
//export const baseURL = "http://localhost:8080";

export const api = (page, option = {}) => {
  const token = localStorage.getItem("@topViewQRdb:token") || "";
  // console.log(token);
  if (!option?.headers) option.headers = { Authorization: `Bearer ${token}` };
  else option.headers = { ...option.headers, Authorization: `Bearer ${token}` };

  return fetch(`${baseURL}${page}`, option);
};

// export default api;
