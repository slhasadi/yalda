export interface UserInfo {
    wheel_iphone_chance:number;
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
    stage: Stage;
    najva_id?: any;
    tp_userid: string;
    tp_username: string;
    is_phone_confirmed: boolean;
    wallet: number;
    see_ad: boolean;
    has_active_golden_package: boolean;
    user_stage: string;
    remained_seen_ad: number;
    subscription:any;
  }
  export interface Stage {
    order: number;
    title: string;
    ruby: number;
    description: string;
    kind: string;
    url: string;
    game_setup_id: number;
  }
  export interface PaySku {
    detail: string;
    token: string;
    platform_token: string;
    discounted_price?: any;
  }
  export interface SkuShop {
    id: number;
    channel_sku_id: string;
    charkhoneh_channel_sku_id: string;
    picture: string;
    popup_picture?: any;
    title: string;
    price: number;
    desc: string;
    score: number;
    value: number;
    price_before_discount: number;
    score_before_discount: number;
    discount_percent: number;
    type: string;
    skuTitle:string
  }
  export interface SessionGame {
    game_setup_id: number;
    game: SessionGameinfo;
    user_play_count: number;
    first_price: number;
    second_price: number;
    third_price: number;
    price_type: string;
    title?: string;
  }
  export interface SessionGameinfo {
    title: string;
    image: string;
    rate: number;
    description: string;
  }
  export interface Session {
    id: number;
    image: string;
    title: string;
    start_datetime: string;
    end_datetime: string;
    is_active: boolean;
    games: SessionGame[];
    is_double_score: boolean;
    is_for_today: boolean;
    type:string;
  }
  export interface Awards {
    id: number;
    title: string;
    description: string;
    image: string;
    alt_image: string;
}
  export interface SessionRoot {
    id: number;
    challenge_type: string;
    title: string;
    subtitle?: any;
    organization: number;
    start_datetime: string;
    end_datetime: string;
    is_active: boolean;
    sessions: Session[];
    awards: Awards[];
  }
  export interface Video {
    id: number;
    link: string;
    type: string;
    text: string;
    banner?: any;
    video: string;
    proposed?: any;
  }
  export interface ShareData {
    desc: string;
    share_text: string;
  }
  export interface Image {
    id: number;
    created_at: Date;
    banner_id: number;
    image: string;
    url: string;
  }
  export interface Banner2 {
    id: number;
    org_name: string;
    title: string;
    type: string;
    image: string;
    images: Image[];
    kind: string;
    url: string;
    game_setup_id?: number;
  }
  export interface Banner {
    banner_id: number;
    order: number;
    banner: Banner2;
  }
  export interface Game {
    title: string;
    image: string;
    rate: number;
    description:string;
    players_count: number;
  }
  
  export interface GameSetup {
    game_setup_id: number;
    order: number;
    game: Game;
    is_free: boolean;
  }
  
  export interface CategoryList {
    id: number;
    title: string;
    image: string;
    view_type: string;
    banners: Banner[];
    game_setups: GameSetup[];
    entries: any[];
    prize: string;
    description: string;
    is_campaign: boolean;
    campaign_end_time?: any;
    slug: string;
  }
  export interface WheelGift {
    popup_image: string;
    wheel_win_item: any;
    item_name:string;
    description: string;
    amount: number;
    item_type: string;
  }
  export interface Data {
    can_use: boolean;
    wait: number;
  }
  export interface WheelPopup {
    image: string;
    data: Data;
  }
  export interface WheelLocked {
    status: string;
    time: number;
  }
  export interface ListLeaderboard {
    fullname: string;
    coin: number;
    score: number;
    rank: number;
    phone:number;
    purchase_coin_weekly_score: number;
    bzg_username: string;
    user_stage: string;
  }
  export interface Profile {
    fullname: string;
    coin: number;
    purchase_coin_weekly_score: number;
    bzg_username: string;
    user_stage: string;
    score: number;
    rank: number;
    phone:number;
  }
  export interface Leaderboard {
    leaderboard: ListLeaderboard[];
    profile: Profile[];
  }
  export interface BonusList {
    id: number;
    interval: number;
    reward: number;
    remained_time:number
  }
  export interface Winner {
    id: number;
    prize: string;
    session: number;
    winner_name: string;
  }