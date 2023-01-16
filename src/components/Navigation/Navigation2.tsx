import {
  Box,
  Flex,
  HStack,
  Button,
  Text,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Icon,
  IconButton,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { AiOutlineClose } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';

import useSWR from 'swr';

const navLinks = [
  { name: 'About', path: '#' },
  { name: 'Features', path: '#' },
  { name: 'Pricing', path: '#' },
];

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useSWR('PoolMetadata');
  const MainColor = useColorModeValue('white', 'gray.800');
  const MenuListColor = useColorModeValue(
    'rgb(255, 255, 255)',
    'rgb(26, 32, 44)',
  );
  const MenuListBoxShadowColor = useColorModeValue(
    '2px 4px 6px 2px rgba(160, 174, 192, 0.6)',
    '2px 4px 6px 2px rgba(9, 17, 28, 0.6)',
  );

  const dropdownLinks = [
    {
      name: 'pooltool.io',
      path: '#',
      // path: `https://pooltool.io/pool/${data.hex}/epochs`
    },
    {
      name: 'cexplorer.io',
      path: '#',
      // path: `https://cexplorer.io/pool/${data.pool_id}`
    },
    {
      name: 'Github Repo',
      path: '#',
    },
  ];

  return (
    <Box px={4} bg={MainColor} position={'fixed'} w={'full'} zIndex={100}>
      <Flex h={16} alignItems="center" justifyContent="space-between" mx="auto">
        {/* <Icon as={RiFlashlightFill} h={8} w={8} /> */}
        <Text fontWeight="bold" fontSize="2xl">
          {data === undefined ? '' : data.ticker}
        </Text>

        <HStack spacing={8} alignItems="center">
          <HStack
            as="nav"
            spacing={6}
            display={{ base: 'none', md: 'flex' }}
            alignItems="center"
          >
            {navLinks.map((link, index) => (
              <NavLink key={index} {...link} onClose={onClose} />
            ))}

            {/* Dropdown Menu */}
            <Menu autoSelect={false} isLazy>
              {({ isOpen, onClose }) => (
                <>
                  <MenuButton _hover={{ color: 'blue.400' }}>
                    <Flex alignItems="center">
                      <Text>Community</Text>
                      <Icon
                        as={BiChevronDown}
                        h={5}
                        w={5}
                        ml={1}
                        transition="all .25s ease-in-out"
                        transform={isOpen ? 'rotate(180deg)' : ''}
                      />
                    </Flex>
                  </MenuButton>
                  <MenuList
                    zIndex={5}
                    bg={MenuListColor}
                    border="none"
                    boxShadow={MenuListBoxShadowColor}
                  >
                    {dropdownLinks.map((link, index) => (
                      <MenuLink
                        key={index}
                        name={link.name}
                        path={link.path}
                        onClose={onClose}
                      />
                    ))}
                  </MenuList>
                </>
              )}
            </Menu>
          </HStack>
        </HStack>

        <Button
          colorScheme="blue"
          size="md"
          rounded="md"
          display={{ base: 'none', md: 'block' }}
        >
          Sign in
        </Button>
        <IconButton
          size="md"
          icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
          aria-label="Open Menu"
          display={{ base: 'inherit', md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
      </Flex>

      {/* Mobile Screen Links */}
      {isOpen ? (
        <Box pb={4} display={{ base: 'inherit', md: 'none' }}>
          <Stack as="nav" spacing={2}>
            {navLinks.map((link, index) => (
              <NavLink key={index} {...link} onClose={onClose} />
            ))}
            <Text fontWeight="semibold" color="gray.500">
              Community
            </Text>
            <Stack pl={2} spacing={1} mt={'0 !important'}>
              {dropdownLinks.map((link, index) => (
                <NavLink key={index} {...link} onClose={onClose} />
              ))}
            </Stack>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}

// NavLink Component
interface NavLinkProps {
  name: string;
  path: string;
  onClose: () => void;
}

const NavLink = ({ name, path, onClose }: NavLinkProps) => {
  const LinkColor = useColorModeValue('blue.500', 'blue.200');

  return (
    <Link
      href={path}
      lineHeight="inherit"
      _hover={{
        textDecoration: 'none',
        color: LinkColor,
      }}
      onClick={() => onClose()}
    >
      {name}
    </Link>
  );
};

// Dropdown MenuLink Component
interface MenuLinkProps {
  name: string;
  path: string;
  onClose: () => void;
}

const MenuLink = ({ name, path, onClose }: MenuLinkProps) => {
  const MenuItemColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Link href={path} onClick={() => onClose()}>
      <MenuItem
        _hover={{
          color: 'blue.400',
          bg: MenuItemColor,
        }}
      >
        <Text>{name}</Text>
      </MenuItem>
    </Link>
  );
};
