import {
  Container,
  Box,
  chakra,
  Text,
  Icon,
  SimpleGrid,
} from '@chakra-ui/react';
import { iconFilter } from '../../lib/iconFilter';

type Props = {
  content: Content;
};

const Features = ({ content }: Props) => {
  return (
    <Container maxW="6xl" p={{ base: 5, md: 10 }}>
      <chakra.h3 fontSize="4xl" fontWeight="bold" mb={3} textAlign="center">
        Features
      </chakra.h3>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        placeItems="center"
        spacing={16}
        mt={12}
        mb={4}
      >
        {content.description?.map((feature, i) => (
          <Box key={i} textAlign="center">
            <Icon
              as={iconFilter(feature.icon)}
              w={10}
              h={10}
              color={`${content.theme}.400`}
            />
            <chakra.h3 fontWeight="semibold" fontSize="2xl">
              {feature.title}
            </chakra.h3>
            <Text fontSize="md">{feature.content}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Features;
