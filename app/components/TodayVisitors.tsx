import { Users, Clock } from 'lucide-react';

export interface VisitorRecord {
  id: string;
  name: string;
  email: string;
  college: string;
  reason: string;
  isEmployee: boolean;
  employeeType?: string;
  checkInTime: string;
}

interface TodayVisitorsProps {
  visitors: VisitorRecord[];
}

export function TodayVisitors({ visitors }: TodayVisitorsProps) {
  const today = new Date().toDateString();
  const todayVisitors = visitors.filter(v => 
    new Date(v.checkInTime).toDateString() === today
  );

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-black">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-yellow-400 p-2 rounded">
          <Users className="text-black" size={24} />
        </div>
        <h2 className="text-2xl text-black">
          Today's Visitors ({todayVisitors.length})
        </h2>
      </div>

      {todayVisitors.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No visitors today
        </div>
      ) : (
        <div className="max-h-96 overflow-y-auto space-y-3">
          {todayVisitors.map((visitor) => (
            <div
              key={visitor.id}
              className="border-2 border-black rounded-lg p-4 bg-yellow-50"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="text-lg text-black">{visitor.name}</h3>
                  <p className="text-sm text-gray-600">{visitor.email}</p>
                  <p className="text-sm text-gray-700">{visitor.college}</p>
                </div>
                {visitor.isEmployee && (
                  <span className="bg-red-600 text-white px-2 py-1 rounded text-xs border border-black">
                    {visitor.employeeType}
                  </span>
                )}
              </div>
              
              <div className="border-t-2 border-black pt-2 mt-2">
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Reason:</strong> {visitor.reason}
                </p>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock size={14} />
                  <span>{formatTime(visitor.checkInTime)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
