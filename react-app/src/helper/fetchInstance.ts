import { toast } from "sonner";

async function getRefreshToken() {
  const response = await fetch("http://localhost:5000/api/refresh-token", {
    headers: {
      Authorization: `Bearer ${localStorage.refreshToken}`,
      "Content-Type": "application/json",
    },
  });
  const fetchData = await response.json();
  localStorage.accessToken = fetchData.data.accessToken;
  localStorage.refreshToken = fetchData.data.refreshToken;
  return fetchData;
}

async function originalRequest(url: string, config: any = {}) {
  const response = await fetch(url, config);
  const data = await response.json();
  if (response.status >= 400 && response.status !== 401) {
    toast.error(data.message);
  }
  if (response.status >= 200 && response.status < 300 && data.message) {
    toast.success(data.message);
  }
  return { response, data };
}

export async function customFetcher(
  url: string,
  config: any = {},
  contentTypeJson: boolean = true,
) {
  if (contentTypeJson) {
    config["headers"] = {
      Authorization: `Bearer ${localStorage.accessToken}`,
      "Content-Type": "application/json",
    };
  } else {
    config["headers"] = {
      Authorization: `Bearer ${localStorage.accessToken}`,
    };
  }

  let { response, data }: any = await originalRequest(url, config);

  if (response.status === 401) {
    await getRefreshToken();

    if (contentTypeJson) {
      config["headers"] = {
        Authorization: `Bearer ${localStorage.accessToken}`,
        "Content-Type": "application/json",
      };
    } else {
      config["headers"] = {
        Authorization: `Bearer ${localStorage.accessToken}`,
      };
    }

    const newResponse = await originalRequest(url, config);
    response = newResponse.response;
    data = newResponse.data;
    if (response.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.replace("/");
      toast.error(data.message);
    }
  }
  return { response, data };
}
