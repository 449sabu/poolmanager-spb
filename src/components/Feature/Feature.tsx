import {
  Box,
  Container,
  SimpleGrid,
  Text,
  VStack,
  Icon,
} from '@chakra-ui/react';
import { iconFilter } from '../../lib/iconFilter';

type Props = {
  content: Content;
};

export default function GridListWithHeading({ content }: Props) {
  return (
    <Box pb={20}>
      <Text
        textAlign="center"
        fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
        fontWeight={600}
      >
        Pool Features
      </Text>

      <Container maxW={'6xl'} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {content.description?.map((feature, i) => (
            <VStack m="auto" mt={1} key={i}>
              <Icon
                as={iconFilter(feature.icon)}
                boxSize={{ base: 16 }}
                color={'white'}
                bg={`${content.theme}.400`}
                p={3}
                borderRadius="md"
              />
              <Text fontWeight={600} fontSize={{ base: '2xl', lg: '3xl' }}>
                {feature.title}
              </Text>
              <Text color={'gray.600'} fontSize={'2xl'} textAlign={'center'}>
                {feature.content}
              </Text>
            </VStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
