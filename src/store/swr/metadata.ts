import useSWR, { SWRResponse } from 'swr';
import { fetcher } from 'lib/fetcher';

export const useMetadataSWR = (
  fallbackData: PoolMetadata,
): SWRResponse<PoolMetadata, any> => {
  return useSWR(
    'PoolMetadata',
    () => fetcher('/api/pool/metadata', fallbackData.pool_id),
    {
      fallbackData,
      revalidateOnMount: true,
    },
  );
};
