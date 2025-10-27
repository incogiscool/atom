// import { Redis } from "@upstash/redis";
// import { Ratelimit } from "@upstash/ratelimit";

// export const redis_url = process.env.UPSTASH_REDIS_REST_URL;
// export const red_token = process.env.UPSTASH_REDIS_REST_TOKEN;

// if (!redis_url) throw new Error("No redis url in env file.");
// if (!red_token) throw new Error("No redis token in env file.");

// export const redis = new Redis({
//   url: redis_url,
//   token: red_token,
// });

// export const ratelimit = new Ratelimit({
//   redis,
//   limiter: Ratelimit.slidingWindow(30, "1 m"),
// });
