export type AuthTokens = {
  token: {
    accessToken: string;
    refreshToken: string;
  };
  setToken: (accessToken: string, refreshToken: string) => void;
};
