import React, { useState } from 'react';
import { ShieldPlus, AlertCircle, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const AdminSignupPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        accessCode: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate potential signup logic
        setTimeout(() => {
            setIsLoading(false);
            console.log('Signup attempt', formData);
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden font-sans text-slate-100">
            {/* Ambient background effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl opacity-50"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md z-10 p-4"
            >
                <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm">
                    {/* Header */}
                    <div className="bg-slate-950/50 p-6 text-center border-b border-slate-800 relative">
                        <Link to="/login" className="absolute left-6 top-6 text-slate-500 hover:text-white transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 mb-4 ring-1 ring-purple-500/20">
                            <ShieldPlus className="w-8 h-8 text-purple-500" />
                        </div>
                        <h1 className="text-xl font-bold text-white tracking-tight">Admin Registration</h1>
                        <p className="text-slate-400 text-sm mt-2">Restricted Enrollment</p>
                    </div>

                    {/* Form */}
                    <div className="p-8">
                        <form onSubmit={handleSignup} className="space-y-4">
                            <Input
                                label="Full Name"
                                name="name"
                                type="text"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="bg-slate-950 border-slate-800 focus:border-purple-500/50"
                            />

                            <Input
                                label="Work Email"
                                name="email"
                                type="email"
                                placeholder="name@elderguard.ai"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="bg-slate-950 border-slate-800 focus:border-purple-500/50"
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="bg-slate-950 border-slate-800 focus:border-purple-500/50"
                                />
                                <Input
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="bg-slate-950 border-slate-800 focus:border-purple-500/50"
                                />
                            </div>

                            <Input
                                label="Access Code"
                                name="accessCode"
                                type="text"
                                placeholder="ENTER-CODE-HERE"
                                value={formData.accessCode}
                                onChange={handleChange}
                                required
                                className="bg-slate-950 border-slate-800 focus:border-purple-500/50 font-mono tracking-wider"
                            />

                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 border-none shadow-lg shadow-purple-900/20"
                                    isLoading={isLoading}
                                >
                                    Register Account
                                </Button>
                            </div>
                        </form>

                        <div className="mt-6 flex items-start gap-3 p-4 bg-amber-500/5 border border-amber-500/10 rounded-lg">
                            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                            <p className="text-xs text-amber-400/80 leading-relaxed font-medium">
                                Registration requires a valid 256-bit access key generated by a Super Admin. IP logging active.
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-slate-950 py-3 px-8 text-center border-t border-slate-800">
                        <Link to="/login" className="text-xs text-slate-500 hover:text-purple-400 transition-colors">
                            Already have an account? Sign In
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
