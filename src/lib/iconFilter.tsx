import { Icon } from '@chakra-ui/react';
import { FiGithub } from 'react-icons/fi';
import {
  HiShieldCheck,
  HiCheck,
  HiOutlineServer,
  HiOutlineTranslate,
  HiChatAlt,
} from 'react-icons/hi';

export const IconFilter = (icon: string, theme: string) => {
  if (icon === 'HiOutlineTranslate') {
    return (
      <Icon
        as={HiOutlineTranslate}
        boxSize={14}
        bg={`${theme}.400`}
        p={3}
        borderRadius="md"
      />
    );
  }
  if (icon === 'HiShieldCheck') {
    return (
      <Icon
        as={HiShieldCheck}
        boxSize={14}
        bg={`${theme}.400`}
        p={3}
        borderRadius="md"
      />
    );
  }
  if (icon === 'FiGithub') {
    return (
      <Icon
        as={FiGithub}
        boxSize={14}
        bg={`${theme}.400`}
        p={3}
        borderRadius="md"
      />
    );
  }
  if (icon === 'HiChatAlt') {
    return (
      <Icon
        as={HiChatAlt}
        boxSize={14}
        bg={`${theme}.400`}
        p={3}
        borderRadius="md"
      />
    );
  }
  if (icon === 'HiOutlineServer') {
    return (
      <Icon
        as={HiOutlineServer}
        boxSize={14}
        bg={`${theme}.400`}
        p={3}
        borderRadius="md"
      />
    );
  }
  if (icon === 'HiShieldCheck') {
    return (
      <Icon
        as={HiShieldCheck}
        boxSize={14}
        bg={`${theme}.400`}
        p={3}
        borderRadius="md"
      />
    );
  }
  if (icon === 'HiOutlineTranslate') {
    return (
      <Icon
        as={HiOutlineTranslate}
        boxSize={14}
        bg={`${theme}.400`}
        p={3}
        borderRadius="md"
      />
    );
  } else {
    return (
      <Icon
        as={HiCheck}
        boxSize={14}
        bg={`${theme}.400`}
        p={3}
        borderRadius="md"
      />
    );
  }
};
