import { createClient } from 'microcms-js-sdk'

const client = createClient({
  serviceDomain: 'uw4bprzt79',
  apiKey: process.env.API_KEY,
})

export default client