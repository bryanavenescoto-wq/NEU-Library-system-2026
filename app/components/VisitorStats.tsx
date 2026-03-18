import { TrendingUp, UserCheck, Clock } from 'lucide-react';
import { Visitor } from './ActiveVisitors';

interface VisitorStatsProps {
  visitors: Visitor[];
}

export function VisitorStats({ visitors }: VisitorStatsProps) {
  const activeCount = visitors.filter(v => v.status === 'active').length;
  const todayCount = visitors.filter(v => {
    const visitDate = new Date(v.checkInTime);
    const today = new Date();
    return visitDate.toDateString() === today.toDateString();
  }).length;
  const totalCount = visitors.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-yellow-400 p-6 rounded-lg shadow-lg border-2 border-black">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-black text-sm mb-1">Active Now</p>
            <p className="text-4xl text-black">{activeCount}</p>
          </div>
          <div className="bg-black p-3 rounded">
            <UserCheck className="text-yellow-400" size={28} />
          </div>
        </div>
      </div>

      <div className="bg-red-600 p-6 rounded-lg shadow-lg border-2 border-black">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white text-sm mb-1">Today's Visitors</p>
            <p className="text-4xl text-white">{todayCount}</p>
          </div>
          <div className="bg-white p-3 rounded">
            <Clock className="text-red-600" size={28} />
          </div>
        </div>
      </div>

      <div className="bg-black p-6 rounded-lg shadow-lg border-2 border-black">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white text-sm mb-1">Total Visitors</p>
            <p className="text-4xl text-white">{totalCount}</p>
          </div>
          <div className="bg-yellow-400 p-3 rounded">
            <TrendingUp className="text-black" size={28} />
          </div>
        </div>
      </div>
    </div>
  );
}
