import useSWR, { SWRResponse } from 'swr';
import { fetcher } from 'lib/fetcher';

export const useSpecificStakePoolSWR = (
  fallbackData: SpecificStakePool,
): SWRResponse<SpecificStakePool, any> => {
  return useSWR(
    'SpecificStakePool',
    () => fetcher('/api/pool/specific', fallbackData.pool_id),
    {
      fallbackData,
      revalidateOnMount: true,
    },
  );
};
