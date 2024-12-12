export type Platform = 'facebook' | 'twitter' | 'instagram';

// export interface VerificationResult {
//   isReal: boolean;
//   message: string;
//   details: VerificationDetail[];
//   riskScore: number;
// }

export interface VerificationResult {
  isReal: boolean;
  message: string;
  details: VerificationDetail[];
  riskScore: number;
  profile_info: {  // Add profile_info to the interface
    username: string;
    full_name: string;
    biography: string;
    profile_pic_url: string;
    is_private: boolean;
    num_posts: number;
    num_followers: number;
    num_follows: number;
    external_url: string | null;
  };
  socialLinks: { platform: string; url: string }[]; // Add socialLinks
}

export interface VerificationDetail {
  criterion: string;
  status: 'pass' | 'fail' | 'warning';
  description: string;
}

export interface VerificationDetail {
  criterion: string;
  status: 'pass' | 'fail' | 'warning';
  description: string;
}

