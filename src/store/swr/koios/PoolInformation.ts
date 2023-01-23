import useSWR, { SWRResponse } from 'swr';

export const PoolInformation = async (url: string, key?: string) => {
  const response = await fetch(url, {
    method: `POST`,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      _pool_bech32_ids: [key],
    }),
  });
  return (await response.json()) as Array<PoolInfo>;
};

export const useMetadata = (
  fallbackData: Array<PoolInfo>,
): SWRResponse<Array<PoolInfo>> => {
  return useSWR(
    'PoolInformation',
    () =>
      PoolInformation(
        'https://api.koios.rest/api/v0/pool_info',
        fallbackData[0].pool_id_bech32,
      ),
    {
      fallbackData,
      revalidateOnMount: true,
    },
  );
};
