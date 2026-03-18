import { BookMarked, RotateCcw } from 'lucide-react';

export interface BorrowRecord {
  id: string;
  studentName: string;
  studentId: string;
  bookTitle: string;
  bookId: string;
  checkoutDate: string;
  returnDate?: string;
  status: 'borrowed' | 'returned';
}

interface ActiveBorrowsProps {
  records: BorrowRecord[];
  onReturn: (id: string) => void;
}

export function ActiveBorrows({ records, onReturn }: ActiveBorrowsProps) {
  const activeRecords = records.filter(r => r.status === 'borrowed');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-black">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-yellow-400 p-2 rounded">
          <BookMarked className="text-black" size={24} />
        </div>
        <h2 className="text-2xl text-black">
          Active Borrows ({activeRecords.length})
        </h2>
      </div>

      {activeRecords.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No active borrows
        </div>
      ) : (
        <div className="space-y-3">
          {activeRecords.map((record) => (
            <div
              key={record.id}
              className="border-2 border-black rounded-lg p-4 bg-yellow-50"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="text-lg text-black">{record.bookTitle}</h3>
                  <p className="text-sm text-gray-600">ID: {record.bookId}</p>
                </div>
                <button
                  onClick={() => onReturn(record.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors flex items-center gap-2 border-2 border-black"
                >
                  <RotateCcw size={16} />
                  Return
                </button>
              </div>
              
              <div className="border-t-2 border-black pt-2 mt-2">
                <p className="text-sm text-gray-700">
                  <strong>Borrower:</strong> {record.studentName} ({record.studentId})
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Checkout:</strong> {formatDate(record.checkoutDate)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
