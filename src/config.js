import dotenv from 'dotenv'

dotenv.config()

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080,
  app_name: process.env.APP_NAME || 'assignment-api-nutech',
  admin_url: process.env.ADMIN_URL || 'http://localhost:5173',
  dashboard_url: process.env.DASHBOARD_URL || 'http://localhost:5173',
  landing_url: process.env.LANDING_URL || 'http://localhost:8000',

  db_server: process.env.DB_SERVER || 'localhost',
  db_port: process.env.DB_PORT || 3306,
  db_name: process.env.DB_NAME || 'db_assignment_api_nutech',
  db_user: process.env.DB_USER || 'root',
  db_pass: process.env.DB_PASS || '',

  rd_server: process.env.RD_SERVER || 'localhost',
  rd_port: process.env.RD_PORT || 6379,
  rd_pass: process.env.RD_PASS || '',

  bearer_token: process.env.BEARER_TOKEN || 'token',
  salt_pass: process.env.SALT_PASS || 'salt_pass',
  admin_panel_version: process.env.ADMIN_PANEL_VERSION || ['1.0.0'],
  dashboard_version: process.env.DASHBOARD_VERSION || ['1.0.0'],
  landing_page_version: process.env.LANDING_PAGE_VERSION || ['1.0.0'],
  whitelist_cors: process.env.WHITELIST_CORS || ['http://localhost:5173'],
  jwt_secret: process.env.JWT_SECRET || 'secret',
  jwt_access_token_expiration: 1000 * 60 * 60 * 12, // 12 hour
  jwt_refresh_token_expiration:
    process.env.JWT_REFRESH_TOKEN_EXPIRATION || 1000 * 60 * 60 * 24 * 30, // 30 days

  processName: process.env.name
}

export default config
