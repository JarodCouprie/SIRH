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
  config["headers"] = {
    Authorization: `Bearer ${localStorage.accessToken}`,
    "Content-type": "application/json",
  };
  const response = await fetch(url, config);
  const data = await response.json();
  return { response, data };
}

export async function customFetcher(url: string, config: any = {}) {
  let { response, data }: any = await originalRequest(url, config);

  if (response.status === 401 || response.status !== 200) {
    await getRefreshToken();

    config["headers"] = {
      Authorization: `Bearer ${localStorage.accessToken}`,
      "Content-type": "application/json",
    };

    const newResponse = await originalRequest(url, config);
    response = newResponse.response;
    data = newResponse.data;
    if (response.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.replace("/");
    }
  }
  return { response, data };
}
