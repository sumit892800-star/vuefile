export const rolePermissions = {
  admin: [
    "dashboard:view",
    "users:view",
    "users:create",
    "users:update"
  ],

  manager: [
    "dashboard:view",
    "users:view",
    "users:update"
  ],

  user: [
    "users:view",
    "users:update"
  ]
}
