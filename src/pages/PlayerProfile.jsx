import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Calendar, Globe, Clock, MapPin, Trophy, ExternalLink } from 'lucide-react';
import { useChessStore } from '../store/useChessStore';
import { useTimer } from '../hooks/useTimer';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';

export const PlayerProfile = () => {
  const { username } = useParams();
  const {
    currentPlayer,
    playerLoading,
    playerError,
    fetchPlayerProfile,
    retryFetchPlayerProfile,
    clearPlayerProfile
  } = useChessStore();

  const timeElapsed = useTimer(currentPlayer?.last_online);

  useEffect(() => {
    if (username) {
      fetchPlayerProfile(username);
    }
    
    // Cleanup when component unmounts
    return () => {
      clearPlayerProfile();
    };
  }, [username]);

  if (playerLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto my-auto px-4 py-8">
          <LoadingSpinner size="large" />
        </div>
      </div>
    );
  }

  if (playerError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Grandmasters
          </Link>
          <ErrorMessage message={playerError} onRetry={() => retryFetchPlayerProfile(username)} />
        </div>
      </div>
    );
  }

  if (!currentPlayer) {
    return null;
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (lastOnline) => {
    const now = Date.now();
    const diff = now - (lastOnline * 1000);
    const minutes = diff / (1000 * 60);
    
    if (minutes < 5) return 'bg-green-500';
    if (minutes < 60) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const player = currentPlayer;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Grandmasters
        </Link>

        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              {player.avatar ? (
                <img
                  src={player.avatar}
                  alt={player.username}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <User className="w-12 h-12 text-white" />
                </div>
              )}
              <div className={`absolute -bottom-1 -right-1 w-6 h-6 ${getStatusColor(player.last_online)} rounded-full border-2 border-white`}></div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-800">{username}</h1>
                <Trophy className="w-6 h-6 text-yellow-500" />
              </div>
              {player.name && (
                <p className="text-lg text-gray-600 mb-2">{player.name}</p>
              )}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>Last seen: {timeElapsed}</span>
              </div>
            </div>

            {player.url && (
              <a
                href={player.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View on Chess.com
              </a>
            )}
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Basic Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Username</p>
                  <p className="font-medium text-gray-800">{username}</p>
                </div>
              </div>
              
              {player.name && (
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium text-gray-800">{player.name}</p>
                  </div>
                </div>
              )}

              {player.title && (
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Title</p>
                    <p className="font-medium text-gray-800">{player.title}</p>
                  </div>
                </div>
              )}

              {player.country && (
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Country</p>
                    <p className="font-medium text-gray-800">{player.country}</p>
                  </div>
                </div>
              )}

              {player.location && (
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium text-gray-800">{player.location}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Activity Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Activity Status</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Last Online</p>
                  <p className="font-medium text-gray-800">{timeElapsed}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Joined Chess.com</p>
                  <p className="font-medium text-gray-800">{formatDate(player.joined)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 ${getStatusColor(player.last_online)} rounded-full`}></div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium text-gray-800">
                    {(() => {
                      const now = Date.now();
                      const diff = now - (player.last_online * 1000);
                      const minutes = diff / (1000 * 60);
                      
                      if (minutes < 5) return 'Recently Active';
                      if (minutes < 60) return 'Active';
                      return 'Offline';
                    })()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        {(player.followers || player.is_streamer || player.twitch_url) && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Additional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {player.followers && (
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{player.followers.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Followers</p>
                </div>
              )}
              
              {player.is_streamer && (
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">✓</p>
                  <p className="text-sm text-gray-500">Verified Streamer</p>
                </div>
              )}

              {player.twitch_url && (
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <a
                    href={player.twitch_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Twitch Channel
                  </a>
                  <p className="text-sm text-gray-500">Streaming Platform</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};