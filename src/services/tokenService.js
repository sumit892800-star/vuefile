const ACCESS_KEY = "access_token"
const REFRESH_KEY = "refresh_token"

export const getAccessToken = () => localStorage.getItem(ACCESS_KEY)

export const getRefreshToken = () => localStorage.getItem(REFRESH_KEY)

export const setTokens = (accessToken, refreshToken) => {
  if (accessToken) {
    localStorage.setItem(ACCESS_KEY, accessToken)
  }
  if (refreshToken) {
    localStorage.setItem(REFRESH_KEY, refreshToken)
  }
}

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_KEY)
  localStorage.removeItem(REFRESH_KEY)
}
