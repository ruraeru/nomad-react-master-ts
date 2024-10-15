const BASE_URL = "https://api.coingecko.com/api/v3/coins";
const NICO_URL = "https://ohlcv-api.nomadcoders.workers.dev";
const API_KEY = process.env.REACT_APP_GEKO_API;

export async function fetchCoins() {
  console.log(API_KEY);
  return fetch(`${BASE_URL}/markets?vs_currency=usd&${API_KEY}`).then(res =>
    res.json()
  );
}
export async function fetchCoinInfo(coindId: string) {
  return fetch(`${BASE_URL}/${coindId}?x_cg_demo_api_key=${API_KEY}`).then(
    res => res.json()
  );
}

export async function fetchCoinTickers(coindId: string) {
  return fetch(
    `${BASE_URL}/${coindId}/tickers?x_cg_demo_api_key=${API_KEY}`
  ).then(res => res.json());
}

export async function fetchCoinHistory(coinId: string) {
  return fetch(
    `${BASE_URL}/${coinId}/ohlc?vs_currency=usd&days=7&x_cg_demo_api_key=${API_KEY}`
  ).then(res => res.json());
}
