import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { ReportPage } from './pages/ReportPage';
import { AdminPage } from './pages/AdminPage';
import { TwitterPage } from './pages/TwitterPage';
import { Unipage } from './pages/Unipage';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <main className="pt-20"> {/* Add padding here */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/twitter" element={<TwitterPage />} />
            <Route path="/unisearch" element={<Unipage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;