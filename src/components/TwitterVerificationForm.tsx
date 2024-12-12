import React, { useState } from 'react';
import { Verified, AlertCircle, CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { TwitterProfileInfo } from '../types/verification';

const statusIcons = {
    pass: CheckCircle,
    fail: XCircle,
    warning: AlertCircle,
};

const statusColors = {
    pass: 'text-green-600',
    fail: 'text-red-600',
    warning: 'text-yellow-600',
};


export function TwitterVerificationForm() {
    const [accountUrl, setAccountUrl] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [isLoadingLinks, setIsLoadingLinks] = useState(false);
    const [verificationResult, setVerificationResult] = useState<any | null>(null);
    const [socialLinks, setSocialLinks] = useState([]);
    const [error, setError] = useState('');
    const [fakeProbability, setFakeProbability] = useState<number | null>(null);
    const [isFake, setIsFake] = useState<boolean | null>(null);

    const handleVerification = async () => {
        if (!accountUrl.trim() || !/^[a-zA-Z0-9_.]+$/.test(accountUrl.trim())) {
            setError('Please enter a valid Twitter username');
            return;
        }

        setIsVerifying(true);
        setError('');
        setVerificationResult(null);

        try {
            const response = await fetch('http://localhost:5000/predict_twitter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: accountUrl.trim() }),
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            const result = await response.json();
            setVerificationResult(result.profile_info);
            setFakeProbability(result.fake_probability); 
            setIsFake(result.is_fake); 

            // Fetch social links separately
            setIsLoadingLinks(true);
            const socialLinksResponse = await fetch('http://localhost:5000/social_links', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: accountUrl.trim() }),
            });

            if (!socialLinksResponse.ok) {
                throw new Error(await socialLinksResponse.text());
            }

            const socialLinksResult = await socialLinksResponse.json();
            setSocialLinks(socialLinksResult.social_links);

        } catch (err) {
            console.error(err);
            setError('An error occurred while analyzing the account');
        } finally {
            setIsVerifying(false);
            setIsLoadingLinks(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow p-6 max-w-7xl mx-auto">
            <div className="flex items-center mb-4">
                <Verified className="h-8 w-8 text-indigo-600 mr-2" />
                <h2 className="text-xl font-semibold">Twitter Account Verification</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Twitter Username</label>
                    <input
                        type="text"
                        value={accountUrl}
                        onChange={(e) => setAccountUrl(e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                        placeholder="Enter username"
                    />
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>
                <div className="col-span-1 flex items-end">
                    <button
                        onClick={handleVerification}
                        disabled={isVerifying}
                        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {isVerifying ? 'Verifying...' : 'Verify'}
                    </button>
                </div>
            </div>

            {verificationResult && (
                <div className="mt-6 space-y-4"> 
                    <div className={`p-4 rounded-lg flex items-center 
                                    ${verificationResult.verified 
                                        ? 'bg-blue-50 text-blue-700'  // Blue for verified
                                        : isFake 
                                            ? 'bg-red-50 text-red-700' 
                                            : 'bg-green-50 text-green-700'}`}>
                        {verificationResult.verified && ( // Show Verified icon if verified
                            <Verified className="h-6 w-6 mr-3 text-blue-600" /> 
                        )}
                        {!verificationResult.verified && React.createElement( // Show other icons if not verified
                            statusIcons[isFake ? 'fail' : 'pass'], 
                            { className: `h-6 w-6 mr-3 ${isFake ? 'text-red-600' : 'text-green-600'}` }
                        )}
                        <div>
                            <h3 className={`font-medium text-lg 
                                            ${verificationResult.verified
                                                ? 'text-blue-700' 
                                                : isFake 
                                                    ? 'text-red-700' 
                                                    : 'text-green-700'}`}>
                                {verificationResult.verified
                                    ? 'Verified Account' 
                                    : isFake 
                                        ? 'Fake Account Suspected' 
                                        : 'Genuine Account'}
                            </h3>
                            <p className="text-gray-600 text-sm">
                                {isFake
                                    ? 'This account shows signs of being fake.'
                                    : 'This account appears to be real.'}
                            </p> 
                            <p className="text-gray-600 text-sm">Probability: {Math.round(fakeProbability * 100)}%</p>
                        </div>
                    </div>

                    <h3 className="text-lg font-medium mb-2">Account Information</h3>
                    <div className="bg-gray-100 text-sm p-6 rounded font-mono whitespace-pre-wrap">
                        <div>
                            <span className="font-bold text-gray-700">Screen Name:</span> {verificationResult.screen_name}
                        </div>
                        <div>
                            <span className="font-bold text-gray-700">Full Name:</span> {verificationResult.name}
                        </div>
                        <div>
                            <span className="font-bold text-gray-700">Location:</span> {verificationResult.location || "N/A"}
                        </div>
                        <div>
                            <span className="font-bold text-gray-700">Description:</span> {verificationResult.description || "N/A"}
                        </div>
                        <div>
                            <span className="font-bold text-gray-700">URL:</span> <a href={verificationResult.url} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>{verificationResult.url}</a>
                        </div>
                        <div>
                            <span className="font-bold text-gray-700">Followers Count:</span> {verificationResult.followers_count}
                        </div>
                        <div>
                            <span className="font-bold text-gray-700">Friends Count:</span> {verificationResult.friends_count}
                        </div>
                        <div>
                            <span className="font-bold text-gray-700">Likes Count:</span> {verificationResult.favorites_count}
                        </div>
                        <div>
                            <span className="font-bold text-gray-700">Tweets Count:</span> {verificationResult.statuses_count}
                        </div>
                        <div>
                            <span className="font-bold text-gray-700">Verified:</span> <span style={{ color: verificationResult.verified ? 'green' : 'red', fontWeight: 'bold', textDecoration: 'underline' }}>{verificationResult.verified ? "Yes" : "No"}</span>
                        </div>
                        <div>
                            <span className="font-bold text-gray-700">Created At:</span> {verificationResult.created_at}
                        </div>
                        <div>
                            <span className="font-bold text-gray-700">Has Extended Profile:</span> {verificationResult.has_extended_profile ? "Yes" : "No"}
                        </div>
                        <div>
                            <span className="font-bold text-gray-700">Language:</span> {verificationResult.lang || "N/A"}
                        </div>
                        <div>
                            <span className="font-bold text-gray-700">Status:</span> {verificationResult.status || "N/A"}
                        </div>
                        <div>
                            <span className="font-bold text-gray-700">Tweet Content:</span> {verificationResult.tweet_content || "N/A"}
                        </div>
                    </div>

                    <div className="mt-4">
                        <h3 className="text-lg font-medium mb-2">Accounts with same username on other platforms</h3>
                        {isLoadingLinks ? (
                            <p className="text-gray-600 text-sm">Checking for external links...</p>
                        ) : (
                            <>
                                {socialLinks.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                        {socialLinks.map((link, index) => (
                                            <a
                                                key={index}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-green-100 hover:bg-green-400 text-blue-700 font-medium py-2 px-4 rounded-10 inline-flex items-center"
                                            >
                                                <span className="mr-2">{link.platform}</span>
                                                <svg className="fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" /><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" /></svg>
                                            </a>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-600 text-sm">No other social media presence found.</p>
                                )}
                            </>
                        )}
                    </div>

                    <Link to="/report" state={{ profileInfo: verificationResult as TwitterProfileInfo }}>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">
                            Report Account
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}