import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useReportsStore } from '../store/reportsStore';
import type { TwitterProfileInfo } from './verification'; // Import the interface
import type { InstagramProfileInfo } from './InstagramVerification'; // Import the interface

export function ReportForm() {
  const location = useLocation();
  const twitterProfileInfo = location.state?.profileInfo as TwitterProfileInfo | undefined;
  const instagramProfileInfo = location.state?.profileInfo as InstagramProfileInfo | undefined;
  const [email, setEmail] = useState('');
  const [platform, setPlatform] = useState(() => {
    if (twitterProfileInfo) {
      return 'twitter'}
    else if (instagramProfileInfo) {
      return 'instagram'
    } else {
      return ' '
    }
  }); 
  const [accountUrl, setAccountUrl] = useState(() => {
    if (twitterProfileInfo) {
      return twitterProfileInfo?.url
    } else if (instagramProfileInfo) {
      return "https://instagram.com/"+instagramProfileInfo?.username
    } else {
      return ' '
    }
  }); 
  const [reason, setReason] = useState('');
  const [evidence, setEvidence] = useState(() => {
    if (twitterProfileInfo) {
      return Object.entries(twitterProfileInfo)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n\n');
    } else if (instagramProfileInfo) {
      return Object.entries(instagramProfileInfo)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n\n');
    } 
    else {
      return '';
    }
  });
  const [submitted, setSubmitted] = useState(false);
  
  const addReport = useReportsStore((state) => state.addReport);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addReport({
      reporterEmail: email,
      platform: platform as any,
      suspectedAccountUrl: accountUrl,
      reason,
      evidence,
    });
    
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-green-50 p-4 rounded-md">
        <p className="text-green-800">
          Thank you for your report. We will investigate and notify you at {email} about our findings.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmit} className="bg-white backdrop-blur-lg rounded-xl shadow-md p-6 space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3" 
            // Added padding and sm:text-sm
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="platform" className="block text-sm font-medium text-gray-700">
            Platform
          </label>
          <select
            id="platform"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 px-3 sm:text-sm" 
            // Added padding and sm:text-sm
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="instagram">Instagram</option>
            <option value="twitter">Twitter</option>
            <option value="other">Other</option>
          </select>
        </div>
  
          <div>
            <label htmlFor="accountUrl" className="block text-sm font-medium text-gray-700">
              Suspected Account URL
            </label>
            <input
              type="url"
              id="accountUrl"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={accountUrl}
              onChange={(e) => setAccountUrl(e.target.value)}
            />
          </div>
  
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
              Reason for Reporting
            </label>
            <textarea
              id="reason"
              required
              rows={6} // Increased number of rows
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3" 
              // Added padding and sm:text-sm
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="evidence" className="block text-sm font-medium text-gray-700">
              Evidence (Optional)
            </label>
            <textarea
              id="evidence"
              rows={6} // Increased number of rows
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3" 
              // Added padding and sm:text-sm
              value={evidence}
              onChange={(e) => setEvidence(e.target.value)}
              placeholder="Provide any additional evidence or details that support your report..."
            />
          </div>
          <div className="bg-yellow-50 p-4 rounded-md">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Important Note</h3>
                <p className="mt-2 text-sm text-yellow-700">
                  Please ensure you have valid reasons for reporting this account. False reports may result in action against your own account.
                </p>
              </div>
            </div>
          </div>
  
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}