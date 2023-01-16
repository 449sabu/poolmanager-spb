import { BlockFrostAPI } from '@blockfrost/blockfrost-js';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import Head from 'next/head';
import { fetcher } from 'lib/fetcher';
import Feature from '../components/Feature/Feature';
import type { ExMetadata } from 'types/exMetadata';
import Footer from '../components/Footer/Footer';
import Hero from '../components/Hero/Hero';
import Stats from '../components/Stats/Stats';
import { useMetadataSWR } from '../store/swr/metadata';
import { useSpecificStakePoolSWR } from '../store/swr/specific';

type Props = {
  content: Content;
  exMetadata: ExMetadata;
  metadata: PoolMetadata;
  stat: SpecificStakePool;
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  content,
  exMetadata,
  metadata,
  stat,
}: Props) => {
  const { mutate: mutateMetadata } = useMetadataSWR(metadata);
  const { mutate: mutateSpecificStakePool } = useSpecificStakePoolSWR(stat);

  return (
    <>
      <Head>
        <title>{`${metadata.name}`}</title>
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${metadata.name}`} />
        <meta property="og:description" content={`${metadata.description}`} />
        {/* <meta property="og:image" content={blog.image.url} /> */}
        <meta name="twitter:site" content={`${metadata.name}`} />
        {/* <meta name="twitter:card" content="summary_large_image" /> */}
      </Head>
      <Hero metadata={metadata} exMetadata={exMetadata} content={content} />
      <Stats stat={stat} />
      <Feature content={content} />
      <Footer metadata={metadata} />
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<Props, Params> = async () => {
  const a = await fetcher(
    'https://poolmanager.vercel.app/api/user',
    process.env.USER_ID || '',
  );
  const data: Content = a.user;

  const exMetadata: ExMetadata = await fetcher(`${data.exMetadata}`);

  const Blockfrost = new BlockFrostAPI({
    projectId: process.env.BLOCKFROST_API || '',
  });
  const metadata = await Blockfrost.poolMetadata(data.poolid);
  const stat = await Blockfrost.poolsById(data.poolid);

  return {
    props: {
      content: data,
      exMetadata: exMetadata,
      metadata: metadata,
      stat: stat,
    },
  };
};
