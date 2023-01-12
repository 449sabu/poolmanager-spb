type Content = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  stakekey: string;
  poolid: string;
  exMetadata: string;
  sign: string;
  createdWebsite: boolean;
  url: string;
  theme: string;
  description: Array<Descriptions>;
};

type Descriptions = {
  fieldId: string;
  title: string;
  content: string;
  icon: string;
};

type MergeData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  stakekey: string;
  poolid: string;
  exMetadata: string;
  sign: string;
  createdWebsite: boolean;
  url: string;
  description: string;
  info: {
    url_png_icon_64x64: string;
    location?: string;
    social?: {
      twitter_handle?: string;
      telegram_handle?: string;
      youtube_handle?: string;
      discord_handle?: string;
    };
    about?: {
      me?: string;
      server?: string;
      'verification string'?: string;
    };
  };
  'my-pool-ids'?: {
    '0'?: string;
  };
  'vrf-app'?: string;
  pool_id: string;
  hex: string;
  url: string;
  hash: string;
  ticker: string;
  name: string;
  description: string;
  homepage: string;
};
