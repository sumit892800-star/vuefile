const base64UrlDecode = (value) => {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/")
  const pad = base64.length % 4 ? "=".repeat(4 - (base64.length % 4)) : ""
  const decoded = atob(base64 + pad)
  try {
    return decodeURIComponent(
      decoded
        .split("")
        .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, "0")}`)
        .join("")
    )
  } catch {
    return decoded
  }
}

export const decodeJwt = (token) => {
  if (!token || typeof token !== "string") return null
  const parts = token.split(".")
  if (parts.length !== 3) return null
  try {
    const payload = base64UrlDecode(parts[1])
    return JSON.parse(payload)
  } catch {
    return null
  }
}
