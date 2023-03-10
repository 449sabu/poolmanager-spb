import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FiBox, FiUsers, FiLock, FiPlus, FiPercent } from 'react-icons/fi';
import { GoGraph } from 'react-icons/go';
import { calculateADA } from '../../lib/calculateADA';

type Props = {
  stat: PoolInfo;
};

interface StatsCardProps {
  title: string;
  stat: string;
  icon: ReactNode;
}

function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}
    >
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={'medium'}>{title}</StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={'auto'}
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent={'center'}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function BasicStatistics({ stat }: Props) {
  const stats = [
    {
      title: 'Fixed Cost',
      stat: `${calculateADA(stat.fixed_cost)} ADA`,
      icon: <FiPlus size={'3em'} />,
    },
    {
      title: 'Margin Cost',
      stat: `${stat.margin} %`,
      icon: <FiPercent size={'3em'} />,
    },
    {
      title: 'Pledge',
      stat: `${calculateADA(stat.pledge || '')} ADA`,
      icon: <FiLock size={'3em'} />,
    },
    {
      title: 'Delegators',
      stat: `${stat.live_delegators}`,
      icon: <FiUsers size={'3em'} />,
    },
    {
      title: 'Active Stake',
      stat: `${calculateADA(stat.active_stake || '')} ADA`,
      icon: <GoGraph size={'3em'} />,
    },
    {
      title: 'Blocks',
      stat: `${stat.block_count || 0} Blocks`,
      icon: <FiBox size={'3em'} />,
    },
  ];

  return (
    <Box
      maxW="7xl"
      mx={{ base: '1rem', md: 'auto' }}
      pt={5}
      px={{ base: 2, sm: 12, md: 17 }}
      pb={20}
    >
      <chakra.h1
        textAlign={'center'}
        fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
        py={10}
        fontWeight={600}
      >
        Support your Staking Life.
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 2, lg: 4 }}>
        {stats.map((s, i) => (
          <StatsCard key={i} title={s.title} stat={s.stat} icon={s.icon} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
