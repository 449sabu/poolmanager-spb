import { Box, Heading, Container, Text, Stack } from '@chakra-ui/react';
import { KoiosProvider } from '@meshsdk/core';
import StakeButton from 'components/Items/StakeButton';

type Props = {
  metadata: PoolInfo;
  content: Content;
};

export default function CallToActionWithAnnotation({
  metadata,
  content,
}: Props) {
  const blockchainProvider = new KoiosProvider('api');

  return (
    <>
      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 10 }}
          pt={{ base: '10rem' }}
          pb={{ base: '0.5' }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            Cardano Staking Pool <br />
            <Text as={'span'} color={`${content.theme}.400`}>
              {metadata.meta_json.name}
            </Text>
          </Heading>
          <Text color={'gray.500'}>{metadata.meta_json.description}</Text>

          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}
          >
            <StakeButton
              onCheck={(address: string) =>
                blockchainProvider.fetchAccountInfo(address)
              }
              poolId={metadata.pool_id_bech32}
              content={content}
            />
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
