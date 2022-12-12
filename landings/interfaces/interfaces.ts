export interface Author {
  name: string;
  url: string;
}
export interface Thumbnails {
  original: string;
  thumbnail: string;
  small: string;
  popular: string;
  list: string;
  categorized: string;
}
export interface Article {
  id: number;
  permalink: string;
  shortlink: string;
  date: string;
  time: string;
  author: Author;
  title: string;
  excerpt: string;
  thumbnail: string;
  thumbnails: Thumbnails;
}

export interface Tag {
  id: number;
  title: string;
  link?: string | null;
}

export interface Link {
  id: number;
  title: string;
  subtitle?: string | null;
  url: string;
  alt?: any;
  meta: string;
  type: string;
  file: string;
}

export interface Item {
  show_vip: any;
  id: number;
  order: number;
  slug: string;
  title: string;
  description: string;
  type: string;
  cover: string;
  dates?: any;
  tags: Tag[];
  links: Link[];
  meta_title: string;
  meta_description: string;
  reference?: string | null;
}

export interface Feed {
  id: number;
  title: string;
  title_fa: string;
  slug: string;
  type: string;
  items: Item[];
  cover?: string;
}

declare global {
  interface Window {
    plyr: any;
    video_plyr: any;
  }
}
export interface imageAlbum {
  id: number;
  title: string;
  title_fa: string;
  slug: string;
  type: string;
  cover: string;
}
export interface Toast {
  message: string;
  status: string;
}
export interface PredictionScores {
  accurate_prediction: number;
  flower_difference_prediction: number;
  correct_prediction: number;
  wrong_prediction: number;
}
export interface HomeTeam {
  id: number;
  title: string;
  picture: string;
}

export interface AwayTeam {
  id: number;
  title: string;
  picture: string;
}

export interface PredictionMatches {
  prediction: any;
  id: number;
  home_team: HomeTeam;
  away_team: AwayTeam;
  league: string;
  date: string;
  start_time: string;
  end_match: boolean;
  match_status: string;
  home_goals?: any;
  away_goals?: any;
  can_predict: boolean;
}
export interface Predicts {
  id: number;
  home_team: HomeTeam;
  away_team: AwayTeam;
  league: string;
  date: string;
  start_time: string;
  end_match: boolean;
  home_goals?: any;
  away_goals?: any;
  match: Match;
}

export interface Tag {
  id: number;
  title: string;
  link?: string | null | undefined;
}

export interface Link {
  id: number;
  title: string;
  subtitle?: string | null | undefined;
  url: string;
  alt?: any;
  meta: string;
  type: string;
  file: string;
  slug_fa: string;
}

export interface Item {
  id: number;
  order: number;
  show_vip: any;
  slug: string;
  title: string;
  full_description?: any;
  description: string;
  type: string;
  cover: string;
  dates?: any;
  tags: Tag[];
  links: Link[];
  meta_title: string;
  meta_description: string;
  reference?: string | null | undefined;
}

export interface BookList {
  id: number;
  title: string;
  title_fa: string;
  slug: string;
  type: string;
  cover?: any;
  items: Item[];
}
export interface FooterText {
  title: string;
  description: string;
  meta_title: string;
  meta_description: string;
  meta_url: string;
  cover?: any;
  slug: string;
}

export interface HomeTeam {
  id: number;
  title: string;
  picture: string;
}

export interface AwayTeam {
  id: number;
  title: string;
  picture: string;
}

export interface Match {
  id: number;
  home_team: HomeTeam;
  away_team: AwayTeam;
  league: string;
  date: string;
  start_time: string;
  end_match: boolean;
  match_status: string;
  prediction?: any;
  home_goals?: number;
  can_predict: boolean;
  away_goals?: number;
  match_stadium_fa: string;
}

export namespace NewsTypes {
  export interface Tag {
    id: number;
    title: string;
    link?: any;
  }

  export interface Link {
    id: number;
    title: string;
    subtitle?: any;
    url: string;
    alt?: any;
    meta?: any;
    type: string;
    file?: any;
  }

  export interface Item {
    id: number;
    order: number;
    slug: string;
    title: string;
    full_description?: string;
    description: string;
    type: string;
    cover?: any;
    dates?: any;
    tags: Tag[];
    links: Link[];
    meta_title: string;
    meta_description: string;
    reference?: string | null | undefined;
  }

  export interface Root {
    id: number;
    title: string;
    title_fa?: any;
    slug: string;
    type: string;
    cover?: any;
    items: Item[];
  }

  export interface News {
    news: Root | null;
    hottestNews: Root | null;
    otherNews: Root | null;
  }

  export interface SingleNews {
    slug: string;
    title: string;
    full_description: string;
    description: string;
    type: string;
    cover?: any;
    dates?: any;
    tags: Tag[];
    links: Link[];
    meta_title: string;
    meta_description: string;
    reference: string;
  }
}

export interface PredictionListLeaderboard {
  fullname: string;
  coin: number;
  score: number;
  rank: number;
  phone: number;
  purchase_coin_weekly_score: number;
  bzg_username: string;
  user_stage: string;
}
export interface PredictionProfile {
  fullname: string;
  coin: number;
  purchase_coin_weekly_score: number;
  bzg_username: string;
  user_stage: string;
  score: number;
  rank: number;
  phone: number;
}
export interface PredictionLeaderboard {
  leaderboard: PredictionListLeaderboard[];
  profile: PredictionProfile;
}
export interface Genre {
  id: number;
  name: string;
  image?: string;
  slug_fa: string;
  genre_category: string[];
}
export interface Singer {
  url: string;
  slug_url: string;
  id: number;
  name: string;
  family: string;
  slug_fa: string;
  pic: string;
  pic_thumb: string;
  pic_webp?: string;
  bio: string;
  bio_rich_text?: string;
  genres: Genre[];
  cover_image: string;
  cover_list: string[];
  singer_album?: string;
  title?: string;
}
export interface DonateConfig {
  price: number;
  tunes: number;
  id: number;
}
export interface SingerPlayer {
  name: string;
  amily: string;
}
export interface RelatedSong extends Song {
  id: number;
  slug_url: string;
  url: string;
  title: string;
  title_reviewed?: any;
  slug_fa: string;
  duration: string;
  cover: string;
  cover_thumb: string;
  cover_webp: string;
  is_free: boolean;
  lyrics: string;
  singers: Singer[];
  audio_preload: string;
  donate_configs: DonateConfig[];
  published: boolean;
  discounted_price?: any;
  price: number;
  pre_sale: boolean;
  created_at: Date;
  new: boolean;
  have_access: boolean;
  audio_lq: string;
  audio_hq: string;
  cover_list: string[];
}
export interface Song {
  audio: string | ArrayBuffer | null;
  audio_hq: string;
  audio_lq: string | null;
  cover: string;
  title: string;
  id: number;
  content_id: number;
  type: string;
  link: Link;
  slug_url: string;
  slug_fa: string;
  lyrics: string;
  duration: string;
  singers: Singer[];
  have_access: boolean;
  cover_thumb: string;
  related: RelatedSong[];
  description: string;
  producer: string;
  arranger: string;
  day_of_publish: string;
  hour_of_publish: string;
  sample: string;
  donate_configs: DonateConfig[];
  price: number;
  audio_preload: string;
  covers: {
    cover: string;
    cover_thumb: string;
    type: string;
    video_main: string;
    video_thumb: string;
  }[];
  published: boolean;
}
export interface Playlist {
  singer: Singer;
  song: Song;
  title: string;
  id: number;
}
export interface DownloadItem {
  link: string;
  quality: number;
  title: string;
}
export interface SongPlayer {
  audio: string | ArrayBuffer | null;
  audio_hq: string | ArrayBuffer | null;
  audio_lq: string | ArrayBuffer | null;
  cover: string;
  title: string;
  id: number;
  type: string;
  link: Link;
  slug_fa?: string | null;
  lyrics?: string | null;
}
export interface SingerPlayer {
  name: string;
  amily: string;
}
export interface Banner {
  title: string;
  link: string;
  banner: string;
  bannerMobile: string;
  bgColor: string;
}

export interface GroupDataIFace {
  country_name: string;
  league_id: string;
  league_name: string;
  team_id: string;
  team_name: string;
  overall_promotion: string;
  overall_league_position: string;
  overall_league_payed: string;
  overall_league_W: string;
  overall_league_D: string;
  overall_league_L: string;
  overall_league_GF: string;
  overall_league_GA: string;
  overall_league_PTS: string;
  home_league_position: string;
  home_promotion: string;
  home_league_payed: string;
  home_league_W: string;
  home_league_D: string;
  home_league_L: string;
  home_league_GF: string;
  home_league_GA: string;
  home_league_PTS: string;
  away_league_position: string;
  away_promotion: string;
  away_league_payed: string;
  away_league_W: string;
  away_league_D: string;
  away_league_L: string;
  away_league_GF: string;
  away_league_GA: string;
  away_league_PTS: string;
  league_round: string;
  team_badge: string;
  fk_stage_key: string;
  stage_name: string;
  league_rounds: string;
}

export interface AllGroupsStagesDataIFace {
  "Group A": GroupDataIFace[];
  "Group B": GroupDataIFace[];
  "Group C": GroupDataIFace[];
  "Group D": GroupDataIFace[];
  "Group E": GroupDataIFace[];
  "Group F": GroupDataIFace[];
  "Group G": GroupDataIFace[];
  "Group H": GroupDataIFace[];
}

export interface HomeTeam {
  id: number;
  title: string;
  picture: string;
}

export interface AwayTeam {
  id: number;
  title: string;
  picture: string;
}

export interface MatchRound {
  league_round: string;
  fk_stage_key: string;
  stage_name: string;
  matches: Match[];
}

export interface GroupTeamDataIFace {
  country_name: string;
  league_id: string;
  league_name: string;
  team_id: string;
  team_name: string;
  overall_promotion: string;
  overall_league_position: string;
  overall_league_payed: string;
  overall_league_W: string;
  overall_league_D: string;
  overall_league_L: string;
  overall_league_GF: string;
  overall_league_GA: string;
  overall_league_PTS: string;
  home_league_position: string;
  home_promotion: string;
  home_league_payed: string;
  home_league_W: string;
  home_league_D: string;
  home_league_L: string;
  home_league_GF: string;
  home_league_GA: string;
  home_league_PTS: string;
  away_league_position: string;
  away_promotion: string;
  away_league_payed: string;
  away_league_W: string;
  away_league_D: string;
  away_league_L: string;
  away_league_GF: string;
  away_league_GA: string;
  away_league_PTS: string;
  league_round: string;
  team_badge: string;
  fk_stage_key: string;
  stage_name: string;
  league_rounds: string;
}

export interface PaginationV2DataIFace {
  count: number;
  next: string | null;
  previous: string | null;
  results: { [P: string]: object[] } | object[];
}

export interface TeamInfoInMatchDataIFace {
  id: number;
  title: string;
  picture: string;
}

export interface MatchGameDataIFace {
  away_goals: string | null;
  away_team: TeamInfoInMatchDataIFace;
  can_predict: boolean;
  date: string;
  end_match: boolean;
  home_goals: string | null;
  home_team: TeamInfoInMatchDataIFace;
  id: number;
  league: string;
  match_stadium: string | null;
  match_stadium_fa: string;
  match_status: string;
  prediction: string | null;
  start_time: string;
}

export interface GetMatchesResponseData extends PaginationV2DataIFace {
  results: MatchGameDataIFace[];
}

export interface ProfileAudioTagItem {
  id: number;
  link: string;
  title: string;
}

export interface ProfileAudioLinkItem {
  alt: string | null;
  file: string;
  id: number;
  meta: string;
  subtitle: string | null;
  title: string;
  type: string;
  url: string;
}

export interface ProfileInternalItem {
  cover: string;
  dates: string;
  description: string;
  id: number;
  links: ProfileAudioLinkItem[];
  meta_description: string;
  meta_title: string | null;
  reference: string | null;
  slug: string;
  tags: ProfileAudioTagItem[];
  title: string;
  type: string;
}

export interface ProfileContentItem {
  content_type: string;
  date: null | string;
  items: ProfileInternalItem[];
  total: number;
}

export interface ProfilePackageItem {
  done_at: { date: string; time: string };
  game: string;
  price: number;
  referrer_id: string;
  score: number | null;
  sku: { id: number; title: string; value: number; type: string };
}

export interface ProfileInfoSubscription {
  subscribed: boolean;
  subscribed_till: Date;
}

export interface ProfileInfoStage {
  order: number;
  title: string;
  ruby: number;
  description: string;
  kind: string;
  url: string;
  game_setup_id: number;
}

export interface ProfileInfoDataIFace {
  phone: string;
  first_name: string;
  last_name: string;
  fair_access: boolean;
  coin: number;
  purchased_coin: number;
  reward_coin: number;
  golden_key: number;
  ruby: number;
  invite_code: string;
  subscription: ProfileInfoSubscription;
  invitation_count: number;
  is_invited: boolean;
  is_guest: boolean;
  heart: number;
  bzg_username: string;
  picture?: any;
  instagram_username: string;
  birth_date?: any;
  email: string;
  city?: any;
  province?: any;
  stage: ProfileInfoStage;
  najva_id?: any;
  tp_userid: string;
  tp_username: string;
  is_phone_confirmed: boolean;
  wallet: number;
  see_ad: boolean;
  has_active_golden_package: boolean;
  user_stage: string;
  digi_club_coin: number;
  best_score_chance: number;
  wheel_iphone_chance: number;
  draw_chance: number;
  remained_seen_ad: number;
}

export interface GetProfileResponseData {
  items: ProfileContentItem[];
  packages: ProfilePackageItem[];
  games: [];
  info: ProfileInfoDataIFace;
}
export interface Popup {
  id: number;
  title: string;
  description: string;
  link: string;
  cover: string;
}
export interface Pages {
  title: string;
  subtitle: string;
  description: string;
  meta_title: string;
  meta_description: string;
  meta_url: string;
  icon: string;
  cover?: any;
  slug: any;
  popup: Popup;
  type: string;
}

export interface playoffRoundMatchItemDataIFace {
  match_awayteam_id: string;
  match_awayteam_name: string;
  match_awayteam_score: string;
  match_date: string;
  match_hometeam_id: string;
  match_hometeam_name: string;
  match_hometeam_score: string;
  match_status: string;
  match_time: string;
  team_away_badge: string;
  team_home_badge: string;
}

export interface playoffRoundItemDataIFace {
  fk_stage_key: string;
  league_name: string;
  matches: playoffRoundMatchItemDataIFace[];
  stage_name: string;
}
