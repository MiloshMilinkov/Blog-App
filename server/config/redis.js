//Connection to UPSTASH as a service provider for reddis db
//Reddis has been chosen for faster in memory performance and no code for data expyring
//In house usage with express
import Redis from "ioredis";
import dotenv from 'dotenv';
dotenv.config();

const redisClient = new Redis(process.env.UPSTASH_REDIS_URL);

redisClient.on('connect', () => console.log('Connected to reddis.'));
redisClient.on('error', () => console.log('Failed connection to reddis.'));

export default redisClient;