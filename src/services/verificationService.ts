import { Platform } from '../types/verification';

interface VerificationResult {
  isReal: boolean;
  message: string;
  details: VerificationDetail[];
  riskScore: number;
}

interface VerificationDetail {
  criterion: string;
  status: 'pass' | 'fail' | 'warning';
  description: string;
}

export function verifyAccount(platform: Platform, accountUrl: string): Promise<VerificationResult> {
  // Simulated verification logic
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate random verification details
      const details: VerificationDetail[] = [
        {
          criterion: 'Account Age',
          status: Math.random() > 0.5 ? 'pass' : 'warning',
          description: Math.random() > 0.5 
            ? 'Account is over 6 months old'
            : 'Account was created recently (less than 1 month ago)',
        },
        {
          criterion: 'Profile Completeness',
          status: Math.random() > 0.5 ? 'pass' : 'fail',
          description: Math.random() > 0.5
            ? 'Profile has complete information including bio and profile picture'
            : 'Profile lacks basic information and uses default avatar',
        },
        {
          criterion: 'Posting Pattern',
          status: Math.random() > 0.5 ? 'pass' : 'fail',
          description: Math.random() > 0.5
            ? 'Regular posting pattern with varied content'
            : 'Suspicious posting pattern with repetitive content',
        },
        {
          criterion: 'Friend/Follower Ratio',
          status: Math.random() > 0.5 ? 'pass' : 'warning',
          description: Math.random() > 0.5
            ? 'Healthy ratio of friends/followers to following'
            : 'Unusual ratio of followers to following',
        },
        {
          criterion: 'Engagement Analysis',
          status: Math.random() > 0.5 ? 'pass' : 'fail',
          description: Math.random() > 0.5
            ? 'Natural engagement patterns with varied interactions'
            : 'Suspicious engagement patterns suggesting automated behavior',
        },
      ];

      // Calculate risk score based on verification details
      const failCount = details.filter(d => d.status === 'fail').length;
      const warningCount = details.filter(d => d.status === 'warning').length;
      const riskScore = Math.round(((failCount * 30 + warningCount * 15) / (details.length * 30)) * 100);

      const isReal = riskScore < 50;

      resolve({
        isReal,
        message: isReal
          ? 'This account has passed our verification checks and appears to be legitimate.'
          : 'Our analysis indicates this account may be fake. We recommend reporting it for further investigation.',
        details,
        riskScore,
      });
    }, 1500);
  });
}