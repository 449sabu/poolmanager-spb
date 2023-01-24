import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaGithub, FaTwitter, FaTelegram } from 'react-icons/fa';
import { SocialButton } from 'components/Items/SocialButton';
import { ExMetadata } from 'types/exMetadata';

type Props = {
  koios: PoolInfo;
  exMetadata: ExMetadata;
};

export default function Footer({ koios, exMetadata }: Props) {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Text>{`© ${new Date().getFullYear()} ${koios.meta_json.name}`}</Text>
          <Stack direction={'row'} spacing={6}>
            {exMetadata.info.social?.twitter_handle === undefined ? (
              ''
            ) : exMetadata.info.social?.twitter_handle === '' ? (
              ''
            ) : (
              <SocialButton
                label={'Twitter'}
                href={`https://twitter.com/${exMetadata.info.social?.twitter_handle}`}
              >
                <FaTwitter />
              </SocialButton>
            )}
            {exMetadata.info.social?.telegram_handle === undefined ? (
              ''
            ) : exMetadata.info.social?.telegram_handle === '' ? (
              ''
            ) : (
              <SocialButton
                label={'Telegram'}
                href={`https://github.com/${exMetadata.info.social.telegram_handle}`}
              >
                <FaTelegram />
              </SocialButton>
            )}
            {exMetadata.info.social?.github_handle === undefined ? (
              ''
            ) : exMetadata.info.social?.github_handle === '' ? (
              ''
            ) : (
              <SocialButton
                label={'FaGithub'}
                href={`https://github.com/${exMetadata.info.social.github_handle}`}
              >
                <FaGithub />
              </SocialButton>
            )}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
