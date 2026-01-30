import React from 'react';

const WelcomeLoader = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white animate-in fade-in duration-300">
            <div className="relative mb-8">
                {/* Bouncing Logo Container */}
                <div className="w-24 h-24 bg-primary-50 rounded-[2rem] flex items-center justify-center animate-bounce shadow-xl shadow-primary-500/20">
                    <img
                        src="/Vector.svg"
                        alt="Logo"
                        className="w-12 h-auto drop-shadow-sm"
                    />
                </div>

                {/* Pulse ring effect */}
                <div className="absolute inset-0 bg-primary-500/20 rounded-[2rem] blur-xl animate-pulse -z-10"></div>
            </div>

            <div className="text-center space-y-4 animate-in slide-in-from-bottom-4 duration-700 fade-in fill-mode-forwards">
                {/* Logo Text */}
                <img
                    src="/Vector2.svg"
                    alt="RevLinko"
                    className="h-8 w-auto mx-auto mb-2"
                />
                <p className="text-zinc-500 font-medium animate-pulse">
                    Welcome to RevLinko. Setting up your dashboard...
                </p>
            </div>
        </div>
    );
};

export default WelcomeLoader;
