export const AUTH_CONFIG = {
  domain: 'myselflog.eu.auth0.com',
  clientId: 'yqRCVaMeuSwGiSwHdKKa336iOc09b7v2',    
  callbackUrl: process.env.REACT_APP_NODE_ENV == 'dev' ? 'http://localhost:3000/callback' : 'http://preview.myselflog.com/callback'
}
