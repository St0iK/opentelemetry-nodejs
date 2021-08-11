import NasaApiConfig from "../config/nasa-api-config";
import NasaApi from "../services/nasa-api";

export default async (ctx) => {
  console.log(NasaApiConfig);
  const api = new NasaApi(NasaApiConfig);
  const res = await api.getWeather();
  ctx.body = res.data;
};
