import { useState } from 'react';
import { BarChart3, Users, Calendar, Filter } from 'lucide-react';
import { VisitorRecord } from './TodayVisitors';

interface AdminStatisticsProps {
  visitors: VisitorRecord[];
}

export function AdminStatistics({ visitors }: AdminStatisticsProps) {
  const [dateFilter, setDateFilter] = useState<'today' | 'week' | 'custom'>('today');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [reasonFilter, setReasonFilter] = useState('all');
  const [collegeFilter, setCollegeFilter] = useState('all');
  const [employeeFilter, setEmployeeFilter] = useState('all');

  // Get filtered visitors based on all filters
  const getFilteredVisitors = () => {
    let filtered = [...visitors];

    // Date filter
    const now = new Date();
    if (dateFilter === 'today') {
      filtered = filtered.filter(v => 
        new Date(v.checkInTime).toDateString() === now.toDateString()
      );
    } else if (dateFilter === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      filtered = filtered.filter(v => 
        new Date(v.checkInTime) >= weekAgo
      );
    } else if (dateFilter === 'custom' && customStartDate && customEndDate) {
      const start = new Date(customStartDate);
      const end = new Date(customEndDate);
      end.setHours(23, 59, 59);
      filtered = filtered.filter(v => {
        const date = new Date(v.checkInTime);
        return date >= start && date <= end;
      });
    }

    // Reason filter
    if (reasonFilter !== 'all') {
      filtered = filtered.filter(v => v.reason === reasonFilter);
    }

    // College filter
    if (collegeFilter !== 'all') {
      filtered = filtered.filter(v => v.college === collegeFilter);
    }

    // Employee filter
    if (employeeFilter === 'employee') {
      filtered = filtered.filter(v => v.isEmployee);
    } else if (employeeFilter === 'student') {
      filtered = filtered.filter(v => !v.isEmployee);
    } else if (employeeFilter === 'teacher') {
      filtered = filtered.filter(v => v.isEmployee && v.employeeType === 'Teacher');
    } else if (employeeFilter === 'staff') {
      filtered = filtered.filter(v => v.isEmployee && v.employeeType === 'Staff');
    }

    return filtered;
  };

  const filteredVisitors = getFilteredVisitors();

  // Calculate statistics
  const totalVisitors = filteredVisitors.length;
  const employeeCount = filteredVisitors.filter(v => v.isEmployee).length;
  const studentCount = filteredVisitors.filter(v => !v.isEmployee).length;

  // Group by reason
  const reasonStats = filteredVisitors.reduce((acc, v) => {
    acc[v.reason] = (acc[v.reason] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Group by college
  const collegeStats = filteredVisitors.reduce((acc, v) => {
    acc[v.college] = (acc[v.college] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Get unique values for filters
  const allReasons = Array.from(new Set(visitors.map(v => v.reason)));
  const allColleges = Array.from(new Set(visitors.map(v => v.college)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-red-600 p-6 rounded-lg shadow-lg border-2 border-black">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-400 p-3 rounded">
            <BarChart3 className="text-black" size={32} />
          </div>
          <div>
            <h2 className="text-3xl text-white">Visitor Statistics</h2>
            <p className="text-yellow-400">Analyze library visitor data</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-black">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="text-red-600" size={20} />
          <h3 className="text-xl text-black">Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Date Range Filter */}
          <div>
            <label className="block text-black mb-2 text-sm">Date Range</label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as any)}
              className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none focus:border-red-600"
            >
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          {/* Reason Filter */}
          <div>
            <label className="block text-black mb-2 text-sm">Reason</label>
            <select
              value={reasonFilter}
              onChange={(e) => setReasonFilter(e.target.value)}
              className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none focus:border-red-600"
            >
              <option value="all">All Reasons</option>
              {allReasons.map(reason => (
                <option key={reason} value={reason}>{reason}</option>
              ))}
            </select>
          </div>

          {/* College Filter */}
          <div>
            <label className="block text-black mb-2 text-sm">College</label>
            <select
              value={collegeFilter}
              onChange={(e) => setCollegeFilter(e.target.value)}
              className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none focus:border-red-600"
            >
              <option value="all">All Colleges</option>
              {allColleges.map(college => (
                <option key={college} value={college}>{college}</option>
              ))}
            </select>
          </div>

          {/* Employee Filter */}
          <div>
            <label className="block text-black mb-2 text-sm">Visitor Type</label>
            <select
              value={employeeFilter}
              onChange={(e) => setEmployeeFilter(e.target.value)}
              className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none focus:border-red-600"
            >
              <option value="all">All Visitors</option>
              <option value="student">Students Only</option>
              <option value="employee">All Employees</option>
              <option value="teacher">Teachers Only</option>
              <option value="staff">Staff Only</option>
            </select>
          </div>
        </div>

        {/* Custom Date Range */}
        {dateFilter === 'custom' && (
          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t-2 border-gray-300">
            <div>
              <label className="block text-black mb-2 text-sm">Start Date</label>
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none focus:border-red-600"
              />
            </div>
            <div>
              <label className="block text-black mb-2 text-sm">End Date</label>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none focus:border-red-600"
              />
            </div>
          </div>
        )}
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-yellow-400 p-6 rounded-lg shadow-lg border-2 border-black">
          <div className="flex items-center justify-between mb-2">
            <Users className="text-black" size={28} />
            <span className="text-4xl text-black">{totalVisitors}</span>
          </div>
          <p className="text-black">Total Visitors</p>
        </div>

        <div className="bg-red-600 p-6 rounded-lg shadow-lg border-2 border-black">
          <div className="flex items-center justify-between mb-2">
            <Users className="text-white" size={28} />
            <span className="text-4xl text-white">{studentCount}</span>
          </div>
          <p className="text-white">Students</p>
        </div>

        <div className="bg-black p-6 rounded-lg shadow-lg border-2 border-black">
          <div className="flex items-center justify-between mb-2">
            <Users className="text-yellow-400" size={28} />
            <span className="text-4xl text-white">{employeeCount}</span>
          </div>
          <p className="text-white">Employees</p>
        </div>
      </div>

      {/* Detailed Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* By Reason */}
        <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-black">
          <h3 className="text-xl text-black mb-4">Visitors by Reason</h3>
          {Object.keys(reasonStats).length === 0 ? (
            <p className="text-gray-500 text-center py-4">No data available</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(reasonStats)
                .sort(([, a], [, b]) => b - a)
                .map(([reason, count]) => (
                  <div key={reason} className="flex items-center justify-between border-2 border-gray-300 rounded p-3">
                    <span className="text-black">{reason}</span>
                    <span className="bg-yellow-400 text-black px-3 py-1 rounded border-2 border-black">
                      {count}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* By College */}
        <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-black">
          <h3 className="text-xl text-black mb-4">Visitors by College</h3>
          {Object.keys(collegeStats).length === 0 ? (
            <p className="text-gray-500 text-center py-4">No data available</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(collegeStats)
                .sort(([, a], [, b]) => b - a)
                .map(([college, count]) => (
                  <div key={college} className="flex items-center justify-between border-2 border-gray-300 rounded p-3">
                    <span className="text-black text-sm">{college}</span>
                    <span className="bg-red-600 text-white px-3 py-1 rounded border-2 border-black">
                      {count}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
