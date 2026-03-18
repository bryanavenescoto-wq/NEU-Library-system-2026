import { BarChart3, TrendingUp, Users, BookOpen } from 'lucide-react';
import { BorrowRecord } from './ActiveBorrows';

interface AdminDashboardProps {
  records: BorrowRecord[];
}

export function AdminDashboard({ records }: AdminDashboardProps) {
  // Calculate statistics
  const totalBorrows = records.length;
  const activeBorrows = records.filter(r => r.status === 'borrowed').length;
  const returnedBooks = records.filter(r => r.status === 'returned').length;
  const returnRate = totalBorrows > 0 ? ((returnedBooks / totalBorrows) * 100).toFixed(1) : '0';

  // Most active borrowers
  const borrowerStats = records.reduce((acc, record) => {
    const key = `${record.studentName} (${record.studentId})`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topBorrowers = Object.entries(borrowerStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Most borrowed books
  const bookStats = records.reduce((acc, record) => {
    const key = record.bookTitle;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topBooks = Object.entries(bookStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Recent activity (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recentActivity = records.filter(r => 
    new Date(r.checkoutDate) >= sevenDaysAgo
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-red-600 p-6 rounded-lg shadow-lg border-2 border-black">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-400 p-3 rounded">
            <BarChart3 className="text-black" size={32} />
          </div>
          <div>
            <h2 className="text-3xl text-white">Admin Dashboard</h2>
            <p className="text-yellow-400">Library Analytics & Tracking</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-yellow-400 p-6 rounded-lg shadow-lg border-2 border-black">
          <div className="flex items-center justify-between mb-2">
            <BookOpen className="text-black" size={24} />
            <span className="text-3xl text-black">{activeBorrows}</span>
          </div>
          <p className="text-black text-sm">Active Borrows</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-black">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="text-red-600" size={24} />
            <span className="text-3xl text-black">{totalBorrows}</span>
          </div>
          <p className="text-gray-700 text-sm">Total Borrows</p>
        </div>

        <div className="bg-black p-6 rounded-lg shadow-lg border-2 border-black">
          <div className="flex items-center justify-between mb-2">
            <Users className="text-yellow-400" size={24} />
            <span className="text-3xl text-white">{Object.keys(borrowerStats).length}</span>
          </div>
          <p className="text-white text-sm">Total Users</p>
        </div>

        <div className="bg-red-600 p-6 rounded-lg shadow-lg border-2 border-black">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="text-white" size={24} />
            <span className="text-3xl text-white">{returnRate}%</span>
          </div>
          <p className="text-white text-sm">Return Rate</p>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Borrowers */}
        <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-black">
          <h3 className="text-xl text-black mb-4 flex items-center gap-2">
            <Users className="text-red-600" size={20} />
            Top Borrowers
          </h3>
          {topBorrowers.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No data available</p>
          ) : (
            <div className="space-y-3">
              {topBorrowers.map(([name, count], index) => (
                <div key={name} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded flex items-center justify-center text-white ${
                    index === 0 ? 'bg-yellow-400 text-black' : 
                    index === 1 ? 'bg-gray-400' : 
                    index === 2 ? 'bg-yellow-700' : 'bg-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1 border-2 border-gray-300 rounded p-2">
                    <div className="flex justify-between items-center">
                      <span className="text-black">{name}</span>
                      <span className="bg-red-600 text-white px-2 py-1 rounded text-sm">
                        {count} books
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Most Borrowed Books */}
        <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-black">
          <h3 className="text-xl text-black mb-4 flex items-center gap-2">
            <BookOpen className="text-red-600" size={20} />
            Most Borrowed Books
          </h3>
          {topBooks.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No data available</p>
          ) : (
            <div className="space-y-3">
              {topBooks.map(([title, count], index) => (
                <div key={title} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded flex items-center justify-center text-white ${
                    index === 0 ? 'bg-yellow-400 text-black' : 
                    index === 1 ? 'bg-gray-400' : 
                    index === 2 ? 'bg-yellow-700' : 'bg-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1 border-2 border-gray-300 rounded p-2">
                    <div className="flex justify-between items-center">
                      <span className="text-black text-sm">{title}</span>
                      <span className="bg-yellow-400 text-black px-2 py-1 rounded text-sm border border-black">
                        {count}x
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-black">
        <h3 className="text-xl text-black mb-4">Recent Activity (Last 7 Days)</h3>
        <div className="bg-yellow-50 border-2 border-black rounded-lg p-4">
          <p className="text-3xl text-black mb-2">{recentActivity}</p>
          <p className="text-gray-700">Books borrowed in the last week</p>
        </div>
      </div>
    </div>
  );
}
