import axios from 'axios';

class NasaApi {

  constructor({baseUrl, apiKey}) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  /**
   * Get Latest Photos
   * @returns {Promise<AxiosResponse<any>>}
   */
  async getLatestPhotos() {
    return await axios.get(`${this.baseUrl}latest_photos?api_key=${this.apiKey}`);
  }
}

export default NasaApi;