import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Stack,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { IconFilter } from '../lib/iconFilter';

type Props = {
  content: Content;
};

export default function GridListWithHeading({ content }: Props) {
  return (
    <Box pb={20}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading
          // fontSize={'4xl'}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          fontWeight={600}
        >
          Pool Features
        </Heading>
        <Text color={'gray.600'} fontSize={'xl'}></Text>
      </Stack>

      <Container maxW={'6xl'} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {/* <HStack> */}
          {content.description.map((feature, i) => (
            <HStack key={i} align={'top'}>
              <VStack m="auto" mt={1}>
                {IconFilter(feature.icon, content.theme)}
                <Text fontWeight={600} fontSize={{ base: '2xl', lg: '3xl' }}>
                  {feature.title}
                </Text>
                <Text color={'gray.600'} fontSize={'2xl'}>
                  {feature.content}
                </Text>
              </VStack>
            </HStack>
          ))}
          {/* </HStack> */}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
