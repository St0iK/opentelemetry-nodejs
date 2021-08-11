export default {
  photosBaseUrl: process.env.NASA_API_PHOTOS_BASE_URL || 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/',
  weatherBaseUrl: process.env.NASA_API_WEATHER_BASE_URL || 'https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json',
  apiKey: process.env.NASA_API_KEY || 'DEMO_KEY'
}