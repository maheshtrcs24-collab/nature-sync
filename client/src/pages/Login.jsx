import React, { useState } from 'react';
import { Mail, Lock, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login attempt:', { email, password });
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center pt-8 px-4 font-sans">
            <Link to="/" className="flex items-center gap-2 mb-12">
                <Leaf className="text-spotify-green w-10 h-10" />
                <span className="text-3xl font-black tracking-tighter text-white">NatureSync</span>
            </Link>

            <div className="w-full max-w-md bg-spotify-dark p-12 rounded-2xl shadow-2xl border border-white/5">
                <h2 className="text-4xl font-black text-center text-white mb-2 tracking-tight">
                    Log in to Nature
                </h2>
                <p className="text-spotify-gray text-center text-sm font-bold mb-10">
                    Enter your details below
                </p>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-xs font-bold text-white uppercase tracking-widest mb-2 px-1">
                            Email address
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-spotify-gray group-focus-within:text-white transition-colors" />
                            </div>
                            <input
                                type="email"
                                required
                                className="w-full bg-spotify-light/50 border border-white/10 rounded-full pl-12 pr-4 py-3.5 text-sm text-white placeholder-spotify-gray focus:outline-none focus:ring-2 focus:ring-spotify-green transition-all"
                                placeholder="you@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-white uppercase tracking-widest mb-2 px-1">
                            Password
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-spotify-gray group-focus-within:text-white transition-colors" />
                            </div>
                            <input
                                type="password"
                                required
                                className="w-full bg-spotify-light/50 border border-white/10 rounded-full pl-12 pr-4 py-3.5 text-sm text-white placeholder-spotify-gray focus:outline-none focus:ring-2 focus:ring-spotify-green transition-all"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-spotify-green text-black text-lg font-bold py-3.5 rounded-full hover:scale-105 transition-transform shadow-xl mt-4"
                    >
                        Log In
                    </button>
                </form>

                <div className="mt-10 pt-8 border-t border-white/10 text-center">
                    <p className="text-spotify-gray font-bold text-sm">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-white hover:text-spotify-green transition-colors underline underline-offset-4">
                            Sign up for NatureSync
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
