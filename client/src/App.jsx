import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MorningAzkar from './pages/MorningAzkar';
import EveningAzkar from './pages/EveningAzkar';
import GeneralAzkar from './pages/GeneralAkar';
import AdminAddAzkar from './pages/AdminAddAzkar';
import AzkarDetail from './pages/AzkarDetail';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4 bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/morning" element={<MorningAzkar />} />
          <Route path="/evening" element={<EveningAzkar />} />
          <Route path="/general" element={<GeneralAzkar />} />
          <Route path="/admin" element={<AdminAddAzkar />} />
          <Route path="/azkar/:id" element={<AzkarDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;