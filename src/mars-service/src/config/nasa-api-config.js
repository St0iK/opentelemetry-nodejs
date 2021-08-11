export default {
  baseUrl: process.env.NASA_API_BASE_URL || 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/',
  apiKey: process.env.NASA_API_KEY || 'DEMO_KEY'
}