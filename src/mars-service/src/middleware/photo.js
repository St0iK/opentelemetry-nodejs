import NasaApi from "../services/nasa-api";
import NasaApiConfig from "../config/nasa-api-config"

export default async (ctx) => {
  console.log(NasaApiConfig);
  const api = new NasaApi(NasaApiConfig);
  const res = await api.getLatestPhotos();

  ctx.body = res.data;
};
