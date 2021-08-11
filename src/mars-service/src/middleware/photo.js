import NasaApi from "../services/nasa-api";
import NasaApiConfig from "../config/nasa-api-config"

export default async (ctx) => {
  const api = new NasaApi(NasaApiConfig);

  const res = await api.getLatestPhotos();
  console.log(res.data);
  ctx.body = 'Photo!';
};
