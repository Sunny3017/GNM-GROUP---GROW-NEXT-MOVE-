import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-primary-dark text-center px-4">
            <div>
                <h1 className="text-9xl font-bold text-gold mb-4">404</h1>
                <h2 className="text-3xl font-serif text-white mb-8">Page Not Found</h2>
                <p className="text-gray-400 mb-12 text-lg">The page you're looking for doesn't exist or has been moved.</p>
                <Link to="/" className="inline-flex items-center gap-2 bg-gold text-primary-dark px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-white transition-all shadow-xl">
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
