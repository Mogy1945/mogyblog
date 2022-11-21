import { createClient } from 'microcms-js-sdk';

export const client = createClient({
    serviceDomain: 'uw4bprzt79',
    apiKey: process.env.API_KEY,
});