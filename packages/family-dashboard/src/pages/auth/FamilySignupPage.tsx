import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Mail, Lock, User, Phone, Globe } from 'lucide-react';
import PhoneInput from '../../components/auth/PhoneInput';
import { signUpFamily, getFriendlyErrorMessage, GradientButton, OAuthButton } from '@elder-nest/shared';

const FamilySignupPage: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState('IN');
    const [connectionCode, setConnectionCode] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);

    const handlePhoneChange = (newPhone: string, newCountryCode: string) => {
        setPhone(newPhone);
        setCountryCode(newCountryCode);
    };

    const validateForm = (): string | null => {
        if (!fullName.trim()) return 'Please enter your full name';
        if (!email.trim()) return 'Please enter your email';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address';
        if (!password) return 'Please enter a password';
        if (password.length < 8) return 'Password must be at least 8 characters';
        if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
        if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
        if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
        if (password !== confirmPassword) return 'Passwords do not match';
        if (!agreeTerms) return 'Please agree to the Terms of Service';
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            await signUpFamily({
                email: email.trim().toLowerCase(),
                password,
                fullName: fullName.trim(),
                phone: phone || '',
                countryCode: phone ? countryCode : '',
                connectionCode: connectionCode.trim(), 
            });
            navigate('/family');
        } catch (err: any) {
            console.error("Signup Error Details:", err);
            let message = getFriendlyErrorMessage(err.code);
            if (message === 'An unexpected error occurred. Please try again.' && err.message) {
                message = err.message;
            }
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    // Password strength indicator
    const getPasswordStrength = (): { strength: number; label: string; color: string } => {
        if (!password) return { strength: 0, label: '', color: 'bg-gray-200' };
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        if (strength <= 2) return { strength: 1, label: 'Weak', color: 'bg-red-500' };
        if (strength <= 3) return { strength: 2, label: 'Medium', color: 'bg-amber-500' };
        if (strength <= 4) return { strength: 3, label: 'Strong', color: 'bg-emerald-500' };
        return { strength: 4, label: 'Very Strong', color: 'bg-emerald-600' };
    };

    const passwordStrength = getPasswordStrength();

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Left Side - Visuals */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex-col justify-between p-16">
                <div className="z-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                            <Shield className="w-8 h-8 text-indigo-100" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">ElderNest Family</span>
                    </div>
                    <h1 className="text-4xl xl:text-5xl font-bold leading-tight mb-6">
                        Protect your loved ones <br /> <span className="text-indigo-200">with confidence.</span>
                    </h1>
                    <p className="text-indigo-100 text-lg max-w-md">
                        Join thousands of families who trust ElderNest for real-time monitoring and peace of mind.
                    </p>
                </div>

                {/* Circles */}
                <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
                    <div className="absolute -right-20 -top-20 w-[600px] h-[600px] border border-white/10 rounded-full opacity-50" />
                    <div className="absolute -right-40 -top-40 w-[800px] h-[800px] border border-white/5 rounded-full opacity-30" />
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 overflow-y-auto">
                <div className="w-full max-w-lg">
                    <div className="text-center lg:text-left mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                        <p className="text-gray-500">Sign up to start monitoring your family</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={e => setFullName(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        placeholder="Enter your full name"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        placeholder="your@email.com"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        placeholder="Create password"
                                        disabled={isLoading}
                                    />
                                </div>
                                {password && (
                                    <div className="mt-2 flex items-center gap-2">
                                        <div className="flex-1 flex gap-1 h-1">
                                            {[1, 2, 3, 4].map(level => (
                                                <div key={level} className={`flex-1 rounded-full transition-colors ${passwordStrength.strength >= level ? passwordStrength.color : 'bg-gray-100'}`} />
                                            ))}
                                        </div>
                                        <span className="text-xs text-gray-500 font-medium">{passwordStrength.label}</span>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${confirmPassword && confirmPassword !== password ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                                        placeholder="Confirm password"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <PhoneInput
                                label="Phone Number (Optional)"
                                value={phone}
                                onChange={handlePhoneChange}
                                placeholder="Enter your phone number"
                                disabled={isLoading}
                            />

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Elder Connection Code (Optional)</label>
                                <div className="relative">
                                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={connectionCode}
                                        onChange={e => setConnectionCode(e.target.value.toUpperCase())}
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-mono tracking-wider uppercase"
                                        placeholder="e.g. 123456"
                                        maxLength={6}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                id="agreeTerms"
                                checked={agreeTerms}
                                onChange={e => setAgreeTerms(e.target.checked)}
                                className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <label htmlFor="agreeTerms" className="text-sm text-gray-600">
                                I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">Privacy Policy</a>
                            </label>
                        </div>

                        {error && (
                            <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium">
                                {error}
                            </div>
                        )}

                        <GradientButton
                            type="submit"
                            variant="primary"
                            size="family"
                            loading={isLoading}
                            className="w-full"
                        >
                            Create Account
                        </GradientButton>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                            <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or continue with</span></div>
                        </div>

                        <OAuthButton
                            role="family"
                            onSuccess={() => navigate('/family')}
                            onError={setError}
                            className="h-12"
                        />

                        <p className="text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/auth/login" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                                Sign in
                            </Link>
                        </p>
                        
                        <div className="pt-6 border-t border-gray-100 text-center">
                            <p className="text-sm text-gray-500 mb-2">Are you an elder?</p>
                            <Link to="/auth/signup?role=elder" className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm">
                                Create Elder Account →
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FamilySignupPage;
