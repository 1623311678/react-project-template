
// 用于区分线上 & 测试接口
export const IS_DEPLOY_ONLINE = process.env.DEPLOY_ENV === 'prod' || process.env.DEPLOY_ENV === 'pre'
export const ACCOUNT_SITE_URL = IS_DEPLOY_ONLINE ? "https://accounts.funpinpin.com" : "https://accounts.funpinpin.top";

console.log(process.env.DEPLOY_ENV)

export const ENV_API_FLAG = process.env.DEPLOY_ENV


// 区分webpack的打包模式, 开发 & 生产
export const IS_PRODUCTION_MODE = process.env.NODE_ENV === 'production'

export const APP_MOUNT_URI = IS_PRODUCTION_MODE ? "/admin/" : "";

export const PAYPAL_ENV = IS_DEPLOY_ONLINE ? 'production' : 'sandbox'
