import { FiGithub } from 'react-icons/fi';
import {
  HiShieldCheck,
  HiCheck,
  HiOutlineServer,
  HiOutlineTranslate,
  HiChatAlt,
} from 'react-icons/hi';

export const iconFilter = (icon: string) => {
  if (icon === 'HiOutlineTranslate') {
    return HiOutlineTranslate;
  }
  if (icon === 'HiShieldCheck') {
    return HiShieldCheck;
  }
  if (icon === 'FiGithub') {
    return FiGithub;
  }
  if (icon === 'HiChatAlt') {
    return HiChatAlt;
  }
  if (icon === 'HiOutlineServer') {
    return HiOutlineServer;
  }
  if (icon === 'HiShieldCheck') {
    return HiShieldCheck;
  }
  if (icon === 'HiCheck') {
    return HiCheck;
  } else {
    return HiOutlineTranslate;
  }
};
