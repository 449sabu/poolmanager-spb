/**
 * @description
 * useSWR のパラメータなどで使用する。
 * @param {string} [url] API URL
 * @returns {Promise<BitflyerTickerResponseType>} API レスポンス
 */

export const fetcher = async (url: string, key?: string) => {
  const response = await fetch(url, {
    method: `GET`,
    headers: {
      api_key: key || '',
    },
  });
  return await response.json();
};
