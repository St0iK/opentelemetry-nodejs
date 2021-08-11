import NasaApi from "../services/nasa-api";
import NasaApiConfig from "../config/nasa-api-config"
const redis = require('redis');


export default async (ctx) => {
  const client = redis.createClient();

  client.on("error", function(error) {
    console.error(error);
  });

  client.set("key", "value", redis.print);
  client.get("key", redis.print);


  console.log(NasaApiConfig);
  const api = new NasaApi(NasaApiConfig);
  const res = await api.getLatestPhotos();
  ctx.body = res.data;
};
