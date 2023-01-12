/**
 * @description
 * useSWR のパラメータなどで使用する。
 * @param {string} [url] API URL
 * @returns {Promise<BitflyerTickerResponseType>} API レスポンス
 */

export const fetcher = async (url: string, key: string) => {
  const response = await fetch(url, {
    method: `POST`,
    body: key,
  });
  return await response.json();
};
