import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export const Login = () => {
    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <GlassCard className="w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                    <p className="text-gray-400">Sign in to continue your journey</p>
                </div>

                <form className="space-y-4">
                    <Input label="Email" type="email" placeholder="john@example.com" />
                    <Input label="Password" type="password" placeholder="••••••••" />

                    <div className="flex justify-end">
                        <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
                    </div>

                    <Button className="w-full">Sign In</Button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    Don't have an account? <Link to="/register" className="text-white hover:text-primary font-medium transition-colors">Sign up</Link>
                </div>
            </GlassCard>
        </div>
    );
};

export const Register = () => {
    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <GlassCard className="w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Join Nature Sync</h1>
                    <p className="text-gray-400">Start your journey today</p>
                </div>

                <form className="space-y-4">
                    <Input label="Full Name" placeholder="John Doe" />
                    <Input label="Email" type="email" placeholder="john@example.com" />
                    <Input label="Password" type="password" placeholder="••••••••" />
                    <Input label="Confirm Password" type="password" placeholder="••••••••" />

                    <Button className="w-full">Create Account</Button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    Already have an account? <Link to="/login" className="text-white hover:text-primary font-medium transition-colors">Sign in</Link>
                </div>
            </GlassCard>
        </div>
    );
};
