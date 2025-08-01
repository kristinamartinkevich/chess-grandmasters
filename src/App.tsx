import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GrandmastersList } from './pages/GrandmastersList';
import { PlayerProfile } from './pages/PlayerProfile';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Routes>
          <Route path="/" element={<GrandmastersList />} />
          <Route path="/player/:username" element={<PlayerProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;