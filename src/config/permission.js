export const rolePermissions = {
  admin: [
    "dashboard:view","downloader:view",
    "about:view",
    "users:view",
    "users:create",
    "users:update"
  ],

  manager: [
    "dashboard:view","downloader:view", 
    "users:view",
    "users:update"
  ],

  user: [
    "users:view","downloader:view",
    "users:update"
  ]
}