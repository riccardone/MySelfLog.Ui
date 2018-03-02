export const AUTH_CONFIG = {
  domain: 'myselflog.eu.auth0.com',
  clientId: 'yqRCVaMeuSwGiSwHdKKa336iOc09b7v2',    
  callbackUrl: process.env.NODE_ENV === 'production' ? 'http://preview.myselflog.com/callback' : 'http://localhost:3000/callback'
};
