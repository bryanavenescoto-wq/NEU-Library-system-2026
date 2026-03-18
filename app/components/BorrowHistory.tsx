import { History } from 'lucide-react';
import { BorrowRecord } from './ActiveBorrows';

interface BorrowHistoryProps {
  records: BorrowRecord[];
}

export function BorrowHistory({ records }: BorrowHistoryProps) {
  const returnedRecords = records.filter(r => r.status === 'returned');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-black">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-black p-2 rounded">
          <History className="text-white" size={24} />
        </div>
        <h2 className="text-2xl text-black">
          Borrow History ({returnedRecords.length})
        </h2>
      </div>

      {returnedRecords.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No history available
        </div>
      ) : (
        <div className="max-h-96 overflow-y-auto space-y-2">
          {returnedRecords.map((record) => (
            <div
              key={record.id}
              className="border-2 border-gray-300 rounded-lg p-3 bg-gray-50"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-black">{record.bookTitle}</h3>
                  <p className="text-sm text-gray-600">{record.studentName}</p>
                </div>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded border border-green-800">
                  Returned
                </span>
              </div>
              <div className="text-xs text-gray-600 mt-2">
                <div>Out: {formatDate(record.checkoutDate)}</div>
                <div>In: {formatDate(record.returnDate!)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
