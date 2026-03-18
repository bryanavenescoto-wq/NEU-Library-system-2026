import { LogIn } from 'lucide-react';
import { useState } from 'react';

interface LoginProps {
  onLogin: (email: string, role: 'user' | 'admin') => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate NEU email account
    if (!email.endsWith('@neu.edu.ph')) {
      setError('Please use a valid NEU email account (@neu.edu.ph)');
      return;
    }

    // Check if password is provided
    if (!password || password.trim() === '') {
      setError('Please enter a password');
      return;
    }

    // Determine role: specific email as admin, others as regular users
    const role = email === 'jcesperanza@neu.edu.ph' ? 'admin' : 'user';
    
    onLogin(email, role);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg border-4 border-black max-w-md w-full">
        <div className="flex justify-center mb-6">
          <img 
            src="https://neu.edu.ph/main/img/neu.png" 
            alt="NEU Logo" 
            className="w-24 h-24 object-contain"
          />
        </div>
        
        <h1 className="text-3xl text-center text-black mb-2">NEU Library</h1>
        <p className="text-center text-gray-600 mb-8">Please login to continue</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-black mb-2">
              Email Address <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              required
              className="w-full px-4 py-3 border-2 border-black rounded focus:outline-none focus:border-red-600"
              placeholder="your.email@neu.edu.ph"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-black mb-2">
              Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              required
              className="w-full px-4 py-3 border-2 border-black rounded focus:outline-none focus:border-red-600"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="bg-red-100 border-2 border-red-600 rounded p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition-colors border-2 border-black flex items-center justify-center gap-2"
          >
            <LogIn size={20} />
            Login
          </button>
        </form>
      </div>
    </div>
  );
}