export type ExMetadata = {
  // how-to-implement: 'ardanians/adapools.org/master/example-meta.json',
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
};
