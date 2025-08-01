import React from 'react';
import { User, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const GrandmasterCard = ({ username }) => {
  return (
    <Link
      to={`/player/${username}`}
      className="group block p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all duration-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
              {username}
            </h3>
            <p className="text-sm text-gray-500">Grandmaster</p>
          </div>
        </div>
        <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
      </div>
    </Link>
  );
};