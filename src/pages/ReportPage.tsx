import React from 'react';
import { ReportForm } from '../components/ReportForm';

export function ReportPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Report a Fake Account</h1>
      <ReportForm />
    </div>
  );
}