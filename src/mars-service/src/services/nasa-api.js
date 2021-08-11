import axios from 'axios';

class NasaApi {

  constructor({photosBaseUrl, weatherBaseUrl, apiKey}) {
    this.photosBaseUrl = photosBaseUrl;
    this.weatherBaseUrl = weatherBaseUrl;
    this.apiKey = apiKey;
  }

  /**
   * Get Latest Photos
   * @returns {Promise<AxiosResponse<any>>}
   */
  async getLatestPhotos() {
    return await axios.get(`${this.photosBaseUrl}latest_photos?api_key=${this.apiKey}`);
  }

  async getWeather() {
    return await axios.get(this.weatherBaseUrl);
  }
}

export default NasaApi;