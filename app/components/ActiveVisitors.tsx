import { Users, LogOut, Clock } from 'lucide-react';

export interface Visitor {
  id: string;
  name: string;
  company: string;
  purpose: string;
  phone: string;
  checkInTime: string;
  checkOutTime?: string;
  status: 'active' | 'checked-out';
}

interface ActiveVisitorsProps {
  visitors: Visitor[];
  onCheckOut: (id: string) => void;
}

export function ActiveVisitors({ visitors, onCheckOut }: ActiveVisitorsProps) {
  const activeVisitors = visitors.filter(v => v.status === 'active');

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const calculateDuration = (checkInTime: string) => {
    const checkIn = new Date(checkInTime);
    const now = new Date();
    const diff = now.getTime() - checkIn.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-black">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-yellow-400 p-2 rounded">
          <Users className="text-black" size={24} />
        </div>
        <h2 className="text-2xl text-black">
          Active Visitors ({activeVisitors.length})
        </h2>
      </div>

      {activeVisitors.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No active visitors at the moment
        </div>
      ) : (
        <div className="space-y-4">
          {activeVisitors.map((visitor) => (
            <div
              key={visitor.id}
              className="border-2 border-black rounded-lg p-4 bg-yellow-50"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-lg text-black mb-1">{visitor.name}</h3>
                  <p className="text-gray-700">{visitor.company}</p>
                  {visitor.phone && (
                    <p className="text-gray-600 text-sm">{visitor.phone}</p>
                  )}
                </div>
                <button
                  onClick={() => onCheckOut(visitor.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors flex items-center gap-2 border-2 border-black"
                >
                  <LogOut size={16} />
                  Check Out
                </button>
              </div>

              <div className="border-t-2 border-black pt-3 mt-3">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Purpose:</strong> {visitor.purpose}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-gray-700">
                    <Clock size={14} />
                    <span>In: {formatTime(visitor.checkInTime)}</span>
                  </div>
                  <div className="bg-yellow-400 px-3 py-1 rounded border-2 border-black text-black">
                    Duration: {calculateDuration(visitor.checkInTime)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
