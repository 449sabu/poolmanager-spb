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
  useToast,
  Text,
  Select,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useMail } from 'hooks/useMail';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const schema = yup.object({
  name: yup.string().required('入力が必須の項目です。'),
  email: yup
    .string()
    .email('メールアドレスの形式ではありません。')
    .required('入力が必須の項目です。'),
  message: yup.string().required('入力が必須の項目です。'),
});

const Contact = () => {
  const toast = useToast();
  const { send } = useMail();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    criteriaMode: 'all',
    resolver: yupResolver(schema),
  });

  const subjects = [
    'ステーキングについて',
    'Cardanoについて',
    'ADAについて',
    'CIELが提供しているサービスについて',
    'その他',
  ];

  const onSubmit = async (values: ContactForm) => {
    console.log(values);
    const res = await send(values);
    if (res.success === true) {
      toast({
        title: 'メッセージが送信されました。',
        status: 'success',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
      setInterval(() => {
        reset();
      }, 3000);
    } else {
      toast({
        title: '送信できませんでした。',
        status: 'error',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="3xl" py={10} px={{ base: 5, md: 8 }}>
      <Stack spacing={10} pb={{ base: '1rem' }}>
        <Text
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          mb={2}
          textAlign="center"
          fontWeight={600}
        >
          Contact
        </Text>
      </Stack>

      <VStack
        as="form"
        spacing={8}
        w="100%"
        bg={useColorModeValue('white', 'gray.700')}
        rounded="lg"
        boxShadow="lg"
        p={{ base: 5, sm: 10 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <VStack spacing={4} w="100%">
          {/* <Stack w="100%" spacing={3} direction={{ base: "column", md: "row" }}> */}
          <FormControl>
            <FormLabel>お名前</FormLabel>
            <Input placeholder="" {...register('name')} />
            <Text textColor={'red.400'} fontSize={'sm'}>
              {errors.name?.message as string}
            </Text>
          </FormControl>
          <FormControl>
            <FormLabel>メールアドレス</FormLabel>
            <Input placeholder="" {...register('email')} />
            <Text textColor={'red.400'} fontSize={'sm'}>
              {errors.email?.message as string}
            </Text>
          </FormControl>
          {/* </Stack> */}
          <FormControl>
            <FormLabel>タイトルまたは件名</FormLabel>
            <Select
              rounded="md"
              {...register('subject', {
                required: true,
              })}
            >
              {subjects.map((subject, i) => (
                <option value={subject} key={i}>
                  {subject}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>お問合せ内容</FormLabel>
            <Textarea
              size="lg"
              placeholder=""
              rounded="md"
              {...register('message')}
            />
            <Text textColor={'red.400'} fontSize={'sm'}>
              {errors.message?.message as string}
            </Text>
          </FormControl>
        </VStack>

        <VStack w="100%">
          <Button
            bg="green.400"
            color="white"
            _hover={{
              bg: 'green.500',
            }}
            rounded="md"
            w={{ base: 'max-content' }}
            mt={4}
            isLoading={isSubmitting}
            type="submit"
          >
            送信
          </Button>
        </VStack>
      </VStack>
    </Container>
  );
};

export default Contact;
