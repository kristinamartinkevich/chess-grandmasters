import React, { useEffect } from 'react';
import { Search, Crown, Users } from 'lucide-react';
import { useChessStore } from '../store/useChessStore';
import { GrandmasterCard } from '../components/GrandmasterCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { Navbar, NavbarBrand } from '@nextui-org/react';

export const GrandmastersList = () => {
  const {
    grandmasters,
    filteredGrandmasters,
    grandmastersLoading,
    grandmastersError,
    searchTerm,
    setSearchTerm,
    fetchGrandmasters,
    retryFetchGrandmasters
  } = useChessStore();

  useEffect(() => {
    fetchGrandmasters();
  }, []);

  if (grandmastersLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <LoadingSpinner size="large" />
        </div>
      </div>
    );
  }

  if (grandmastersError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <ErrorMessage message={grandmastersError} onRetry={retryFetchGrandmasters} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Navbar className="flex items-center justify-center gap-3 mb-4">
            <NavbarBrand>
                          <Crown className="w-8 h-8 text-yellow-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Chess Grandmasters
            </h1>
            </NavbarBrand>
          </Navbar>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore profiles of chess grandmasters from around the world. Click on any player to view their detailed profile and activity status.
          </p>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Users className="w-5 h-5" />
            <span className="font-medium">
              {filteredGrandmasters.length} of {grandmasters.length} grandmasters
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search grandmasters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Grandmasters Grid */}
        {filteredGrandmasters.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No grandmasters found</h3>
            <p className="text-gray-600">Try adjusting your search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGrandmasters.map((username) => (
              <GrandmasterCard key={username} username={username} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};