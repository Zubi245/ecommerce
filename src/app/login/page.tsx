'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('sam_fabrics_admin', 'true');
        router.push('/admin');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-brand-light">
      <div className="bg-white p-8 shadow-xl rounded-sm w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-brand-black text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={20} />
          </div>
          <h1 className="font-serif text-2xl font-bold">Login</h1>
          <p className="text-gray-500 text-sm mt-2">Enter your credentials to access the dashboard</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 text-sm p-3 mb-6 text-center rounded-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Username</label>
            <input 
              type="text" 
              required
              disabled={loading}
              className="w-full border border-gray-300 p-3 focus:outline-none focus:border-brand-black disabled:bg-gray-100"
              value={credentials.username}
              onChange={e => setCredentials({...credentials, username: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input 
              type="password" 
              required
              disabled={loading}
              className="w-full border border-gray-300 p-3 focus:outline-none focus:border-brand-black disabled:bg-gray-100"
              value={credentials.password}
              onChange={e => setCredentials({...credentials, password: e.target.value})}
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-brand-black text-white py-3 uppercase tracking-widest text-sm font-bold hover:bg-gold-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
