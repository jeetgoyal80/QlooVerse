// backend/utils/qlooClient.js
import axios from 'axios';

const qlooClient = axios.create({
  baseURL: 'https://hackathon.api.qloo.com',
  headers: {
    'x-api-key': process.env.QLOO_API_KEY,
    'Content-Type': 'application/json',
  },
});

export default qlooClient;
