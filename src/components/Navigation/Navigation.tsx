import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  SunIcon,
  MoonIcon,
} from '@chakra-ui/icons';

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useColorMode,
} from '@chakra-ui/react';

import useSWR from 'swr';

export default function WithSubnavigation() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();
  const { data: PoolInfo } = useSWR<Array<PoolInfo>>('PoolInformation');

  return (
    <Box position={'fixed'} w={'full'} zIndex={100}>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            color={useColorModeValue('gray.800', 'white')}
            fontWeight={'bold'}
          >
            {PoolInfo === undefined ? '' : PoolInfo[0].meta_json.ticker}
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            {PoolInfo === undefined ? '' : <DesktopNav />}
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          <Button onClick={toggleColorMode} marginRight={3}>
            {colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        {PoolInfo === undefined ? '' : <MobileNav />}
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const { data: PoolInfo } = useSWR('PoolInformation');

  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  const NAV_ITEMS: Array<NavItem> = [
    {
      label: 'Explorer',
      children: [
        {
          label: 'pooltool.io',
          subLabel: ``,
          href: `https://pooltool.io/pool/${PoolInfo[0].pool_id_hex}/epochs`,
        },
        {
          label: 'cexplorer.io',
          subLabel: '',
          href: `https://cexplorer.io/pool/${PoolInfo[0].pool_id_bech32}`,
        },
        {
          label: 'pool.pm',
          subLabel: '',
          href: `https://pool.pm/${PoolInfo[0].pool_id_hex}`,
        },
        {
          label: 'poolpeek.com',
          subLabel: '',
          href: `https://poolpeek.com/pool/${PoolInfo[0].pool_id_hex}`,
        },
        {
          label: 'Cardanoscan.io',
          subLabel: '',
          href: `https://cardanoscan.io/pool/${PoolInfo[0].pool_id_bech32}`,
        },
      ],
    },
  ];

  return (
    <Stack direction={'row'} spacing={4}>
      {ABOUT_CARDANO.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  const { data: PoolInfo } = useSWR('PoolInformation');

  const NAV_ITEMS: Array<NavItem> = [
    {
      label: 'Explorer',
      children: [
        {
          label: 'pooltool.io',
          subLabel: ``,
          href: `https://pooltool.io/pool/${PoolInfo[0].pool_id_hex}/epochs`,
        },
        {
          label: 'cexplorer.io',
          subLabel: '',
          href: `https://cexplorer.io/pool/${PoolInfo[0].pool_id_bech32}`,
        },
        {
          label: 'pool.pm',
          subLabel: '',
          href: `https://pool.pm/${PoolInfo[0].pool_id_hex}`,
        },
        {
          label: 'poolpeek.com',
          subLabel: '',
          href: `https://poolpeek.com/pool/${PoolInfo[0].pool_id_hex}`,
        },
        {
          label: 'Cardanoscan.io',
          subLabel: '',
          href: `https://cardanoscan.io/pool/${PoolInfo[0].pool_id_bech32}`,
        },
      ],
    },
  ];

  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {ABOUT_CARDANO.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const ABOUT_CARDANO: Array<NavItem> = [
  {
    label: 'About Cardano',
    children: [
      {
        label: 'Cardano',
        subLabel: `Cardano.org`,
        href: `https://cardano.org/`,
      },
      {
        label: 'IOG | IO Global',
        subLabel: `https://iohk.io/en/`,
        href: `https://iohk.io/en/`,
      },
      {
        label: 'EMURGO',
        subLabel: `httpsio://emurgo.`,
        href: `https://emurgo.io`,
      },
      {
        label: 'Cardano Foundation',
        subLabel: `https://cardanofoundation.org/`,
        href: `https://cardanofoundation.org/`,
      },
      {
        label: 'Project Catalyst',
        subLabel: `https://cardano.ideascale.com/c/landing`,
        href: `https://cardano.ideascale.com/c/landing`,
      },
    ],
  },
];
