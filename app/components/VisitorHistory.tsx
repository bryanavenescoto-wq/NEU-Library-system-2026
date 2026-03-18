import { History, Calendar } from 'lucide-react';
import { Visitor } from './ActiveVisitors';

interface VisitorHistoryProps {
  visitors: Visitor[];
}

export function VisitorHistory({ visitors }: VisitorHistoryProps) {
  const checkedOutVisitors = visitors.filter(v => v.status === 'checked-out');

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateDuration = (checkInTime: string, checkOutTime: string) => {
    const checkIn = new Date(checkInTime);
    const checkOut = new Date(checkOutTime);
    const diff = checkOut.getTime() - checkIn.getTime();
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
        <div className="bg-black p-2 rounded">
          <History className="text-white" size={24} />
        </div>
        <h2 className="text-2xl text-black">
          Visitor History ({checkedOutVisitors.length})
        </h2>
      </div>

      {checkedOutVisitors.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No visitor history available
        </div>
      ) : (
        <div className="max-h-96 overflow-y-auto space-y-3">
          {checkedOutVisitors.map((visitor) => (
            <div
              key={visitor.id}
              className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-black">{visitor.name}</h3>
                  <p className="text-sm text-gray-600">{visitor.company}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Calendar size={12} />
                  <span>{formatDate(visitor.checkInTime)}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-700 mb-2">
                <strong>Purpose:</strong> {visitor.purpose}
              </p>
              
              <div className="flex gap-4 text-xs text-gray-600">
                <span>In: {formatTime(visitor.checkInTime)}</span>
                <span>Out: {formatTime(visitor.checkOutTime!)}</span>
                <span className="text-black">
                  Duration: {calculateDuration(visitor.checkInTime, visitor.checkOutTime!)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
