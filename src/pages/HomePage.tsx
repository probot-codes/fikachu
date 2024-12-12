import React from 'react';
import { Verified, AlertTriangle, UserCheck, CheckCircle, XCircle, BarChart2, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatsCard } from '../components/StatsCard';
import { VerificationForm } from '../components/VerificationForm';

export function HomePage() {
  const stats = [
    { title: 'Accounts Verified', value: '6', Icon: CheckCircle, color: 'text-indigo-600' },
    { title: 'Fake Accounts Detected', value: '9', Icon: XCircle, color: 'text-red-600' },
    { title: 'Reports Processed', value: '4', Icon: BarChart2, color: 'text-green-600' },
    { title: 'Success Rate', value: '91%', Icon: Award, color: 'text-purple-600' }
  ];

  return (
    <div className="min-h-screen">
    {/* <div className="bg-gray-100 min-h-screen"> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <VerificationForm />
        </div>
      </div>
    </div>
  );
}