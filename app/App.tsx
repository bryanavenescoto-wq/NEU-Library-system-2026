import { useState, useEffect } from 'react';
import { Library, LogOut, LayoutDashboard, Home, UserCog } from 'lucide-react';
import { Login } from './components/Login';
import { VisitorCheckIn } from './components/VisitorCheckIn';
import { TodayVisitors, VisitorRecord } from './components/TodayVisitors';
import { AdminStatistics } from './components/AdminStatistics';

const STORAGE_KEY = 'neu_library_visitors';

function App() {
  const [user, setUser] = useState<{ email: string; role: 'user' | 'admin' } | null>(null);
  const [view, setView] = useState<'home' | 'admin'>('home');
  const [showWelcome, setShowWelcome] = useState(false);
  const [visitors, setVisitors] = useState<VisitorRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(visitors));
  }, [visitors]);

  const handleLogin = (email: string, role: 'user' | 'admin') => {
    setUser({ email, role });
    setShowWelcome(true);
    setTimeout(() => setShowWelcome(false), 3000);
  };

  const handleLogout = () => {
    setUser(null);
    setView('home');
  };

  const handleRoleSwitch = () => {
    if (user && user.email === 'jcesperanza@neu.edu.ph') {
      const newRole = user.role === 'admin' ? 'user' : 'admin';
      setUser({ ...user, role: newRole });
      setView('home'); // Reset to home view when switching roles
    }
  };

  const handleCheckIn = (data: {
    name: string;
    email: string;
    college: string;
    reason: string;
    isEmployee: boolean;
    employeeType?: string;
  }) => {
    const newVisitor: VisitorRecord = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      ...data,
      checkInTime: new Date().toISOString()
    };

    setVisitors([newVisitor, ...visitors]);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Welcome Message */}
      {showWelcome && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-yellow-400 border-4 border-black rounded-lg px-8 py-4 shadow-2xl">
            <p className="text-2xl text-black font-bold">Welcome to NEU Library!</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-red-600 border-b-4 border-black shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2">
                <img 
                  src="https://neu.edu.ph/main/img/neu.png" 
                  alt="NEU Logo" 
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div>
                <h1 className="text-3xl text-white">NEU Library</h1>
                <p className="text-yellow-400">
                  {user.email} 
                  <span className="ml-3 bg-yellow-400 text-black px-4 py-2 rounded text-base border-2 border-black font-bold">
                    {user.role === 'admin' ? '👨‍💼 ADMIN' : '👤 USER'}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Navigation Buttons - Only show for Admin */}
              {user.role === 'admin' && (
                <>
                  <button
                    onClick={() => setView('home')}
                    className={`px-4 py-2 rounded border-2 border-black transition-colors ${
                      view === 'home' 
                        ? 'bg-yellow-400 text-black' 
                        : 'bg-white text-black hover:bg-yellow-100'
                    }`}
                  >
                    <Home className="inline mr-2" size={20} />
                    Home
                  </button>
                  <button
                    onClick={() => setView('admin')}
                    className={`px-4 py-2 rounded border-2 border-black transition-colors ${
                      view === 'admin' 
                        ? 'bg-yellow-400 text-black' 
                        : 'bg-white text-black hover:bg-yellow-100'
                    }`}
                  >
                    <LayoutDashboard className="inline mr-2" size={20} />
                    Statistics
                  </button>
                </>
              )}

              {/* Role Switch Button - Only show for specific user */}
              {user.email === 'jcesperanza@neu.edu.ph' && (
                <button
                  onClick={handleRoleSwitch}
                  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors border-2 border-black"
                >
                  <UserCog className="inline mr-2" size={20} />
                  Switch Role
                </button>
              )}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors border-2 border-black"
              >
                <LogOut className="inline mr-2" size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Role Notification Banner */}
      <div className={`${
        user.role === 'admin' 
          ? 'bg-gradient-to-r from-yellow-400 to-yellow-300' 
          : 'bg-gradient-to-r from-blue-400 to-blue-300'
      } border-b-4 border-black shadow-md`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-3">
            <div className={`${
              user.role === 'admin' ? 'bg-red-600' : 'bg-green-600'
            } p-2 rounded-full border-2 border-black`}>
              {user.role === 'admin' ? (
                <LayoutDashboard className="text-white" size={24} />
              ) : (
                <Home className="text-white" size={24} />
              )}
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-black">
                {user.role === 'admin' 
                  ? '👨‍💼 ADMINISTRATOR MODE' 
                  : '👤 REGULAR USER MODE'}
              </p>
              <p className="text-sm text-black">
                {user.role === 'admin' 
                  ? 'Access to Statistics Dashboard & Analytics' 
                  : 'Access to Visitor Check-In & Today\'s Visitors'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 flex-grow">
        {/* Regular users can only access home view */}
        {user.role === 'user' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <VisitorCheckIn onCheckIn={handleCheckIn} />
            <TodayVisitors visitors={visitors} />
          </div>
        )}

        {/* Admin can access both home and statistics - NO CHECK-IN FORM */}
        {user.role === 'admin' && (
          <>
            {view === 'home' ? (
              <div className="max-w-3xl mx-auto">
                <TodayVisitors visitors={visitors} />
              </div>
            ) : (
              <AdminStatistics visitors={visitors} />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black border-t-4 border-yellow-400 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center">
          <p className="text-white">
            &copy; 2026 NEU Library
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;