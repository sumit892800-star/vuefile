const ACCESS_KEY = "access_token"
const REFRESH_KEY = "refresh_token"

export const getAccessToken = () => localStorage.getItem(ACCESS_KEY)

export const getRefreshToken = () => localStorage.getItem(REFRESH_KEY)

export const setTokens = (accessToken) => {
  if (accessToken) {
    localStorage.setItem(ACCESS_KEY, accessToken)
  }
}

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_KEY)
  localStorage.removeItem(REFRESH_KEY)
}
