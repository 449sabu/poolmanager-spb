import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Button,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { useMail } from 'hooks/useMail';

const Contact = () => {
  const { setName, setMessage, setAddress, send } = useMail();

  return (
    <Container maxW="3xl" py={10} px={{ base: 5, md: 8 }}>
      <Stack spacing={10} pb={{ base: '1rem' }}>
        {/* <Text fontSize="4xl" mb={2} textAlign="center">
            Contact
          </Text> */}
        <VStack
          as="form"
          spacing={8}
          w="100%"
          bg={useColorModeValue('white', 'gray.700')}
          rounded="lg"
          boxShadow="lg"
          p={{ base: 5, sm: 10 }}
        >
          <VStack spacing={4} w="100%">
            <Stack
              w="100%"
              spacing={3}
              direction={{ base: 'column', md: 'row' }}
            >
              <FormControl id="name">
                <FormLabel>お名前</FormLabel>
                <Input
                  type="text"
                  placeholder=""
                  rounded="md"
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder=""
                  rounded="md"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormControl>
            </Stack>
            {/* <FormControl id="subject">
              <FormLabel>Subject</FormLabel>
              <Input type="text" placeholder="Are you available for freelance work?" rounded="md" />
            </FormControl> */}
            <FormControl id="message">
              <FormLabel>メッセージ</FormLabel>
              <Textarea
                size="lg"
                placeholder=""
                rounded="md"
                onChange={(e) => setMessage(e.target.value)}
              />
            </FormControl>
          </VStack>
          <VStack w="100%">
            <Button
              bg="green.300"
              color="white"
              _hover={{
                bg: 'green.500',
              }}
              rounded="md"
              w={{ base: 'max-content' }}
              onClick={send}
            >
              送信
            </Button>
          </VStack>
        </VStack>
      </Stack>
    </Container>
  );
};

export default Contact;
