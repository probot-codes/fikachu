export interface Report {
  id: string;
  reporterEmail: string;
  platform: 'facebook' | 'instagram' | 'twitter' | 'other';
  suspectedAccountUrl: string;
  reason: string;
  evidence: string;
  status: 'pending' | 'investigating' | 'verified' | 'rejected';
  dateReported: string;
  dateUpdated: string;
}