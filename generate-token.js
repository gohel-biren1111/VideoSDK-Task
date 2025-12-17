import jwt from 'jsonwebtoken';

// Your VideoSDK Credentials
const API_KEY = '0a090f04-3d3d-4232-afd1-6132e9f62b78';
const SECRET_KEY = '10c1b03d6c3f14b3f0ea8529b5b9454a1b3ea36fda0e59b53d6721a292851655';

// Generate JWT Token
const token = jwt.sign(
  {
    apikey: API_KEY,
    permissions: ['allow_join', 'allow_mod'],
  },
  SECRET_KEY,
  {
    algorithm: 'HS256',
    expiresIn: '30d', 
  }
);

console.log('\n Your VideoSDK JWT Token:\n');
console.log(token);
console.log('\n Copy this token and add it to your .env file:');
console.log(`VITE_VIDEOSDK_TOKEN=${token}`);
console.log('\nToken will expire in 30 days\n');
