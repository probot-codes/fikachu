// verification.ts

export interface TwitterProfileInfo {
    screen_name: string | null;
    location: string | null;
    description: string | null;
    url: string | null;
    followers_count: number | null;
    friends_count: number | null;
    listed_count: number | null;
    created_at: string | null;
    favorites_count: number | null;
    verified: boolean;
    statuses_count: number | null;
    lang: string | null;
    status: string | null;
    default_profile: boolean | null;
    default_profile_image: boolean;
    has_extended_profile: boolean | null;
    name: string | null;
    tweet_content: string | null;
    tweet_timestamp: string;
  } 