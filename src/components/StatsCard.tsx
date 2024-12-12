import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  Icon: LucideIcon;
  color: string;
}

export function StatsCard({ title, value, Icon, color }: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm platform-card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className={`text-2xl font-bold ${color} stats-counter`}>{value}</p>
        </div>
        <Icon className={`h-8 w-8 ${color}`} />
      </div>
    </div>
  );
}