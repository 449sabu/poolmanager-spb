import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FaGithub, FaTwitter, FaTelegram } from 'react-icons/fa';
import { ExMetadata } from 'types/exMetadata';

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

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
