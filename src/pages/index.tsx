// import Feature from 'components/Feature/Feature';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Footer from 'components/Footer/Footer';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import Hero from 'components/Hero/Hero';
import Head from 'next/head';
import Nav from 'components/Navigation/Navigation';
import Stats from 'components/Stats/Stats';
import { DefaultData } from 'lib/defaultData';
import { fetcher } from 'lib/fetcher';
import { PoolInformation, useMetadata } from 'store/swr/koios/PoolInformation';
import type { ExMetadata } from 'types/exMetadata';

type Props = {
  content: Content;
  exMetadata: ExMetadata;
  poolInfo: Array<PoolInfo>;
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  content,
  exMetadata,
  poolInfo,
}: Props) => {
  const { mutate: mutatePoolInfo } = useMetadata(poolInfo);

  return (
    <>
      <Head>
        <title>{`${poolInfo[0].meta_json.name}`}</title>
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${poolInfo[0].meta_json.name}`} />
        <meta
          property="og:description"
          content={`${poolInfo[0].meta_json.description}`}
        />
        {/* <meta property="og:image" content={blog.image.url} /> */}
        <meta name="twitter:site" content={`${poolInfo[0].meta_json.name}`} />
        {/* <meta name="twitter:card" content="summary_large_image" /> */}
      </Head>
      <Nav />
      <Hero metadata={poolInfo[0]} exMetadata={exMetadata} content={content} />
      <Stats stat={poolInfo[0]} />
      {/* {process.env.SPB_TYPE === 'PoolManager' ? (
        <Feature content={content} />
      ) : (
        ''
      )} */}
      <Footer koios={poolInfo[0]} exMetadata={exMetadata} />
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<Props, Params> = async () => {
  const PoolInfo = await PoolInformation(
    'https://api.koios.rest/api/v0/pool_info',
    process.env.POOL_ID || '',
  );
  const exMetadata: ExMetadata = await fetcher(process.env.EX_METADATA || '');

  if (process.env.SPB_TYPE === 'PoolManager') {
    const a = await fetcher(
      'https://poolmanager.vercel.app/api/user',
      process.env.USER_ID || '',
    );
    const data: Content = a.user;

    return {
      props: {
        content: data,
        exMetadata: exMetadata,
        poolInfo: PoolInfo,
      },
    };
  } else {
    const data = DefaultData;
    return {
      props: {
        content: data,
        exMetadata: exMetadata,
        poolInfo: PoolInfo,
      },
    };
  }
};
