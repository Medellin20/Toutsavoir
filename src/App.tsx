import { SiteMotion } from './components/SiteMotion';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Feedback } from './pages/Feedback';
import { Home } from './pages/Home';
import { Consultation } from './pages/Consultation';
import { useEffect } from 'react';
import { Admin } from './pages/Admin';
import { ProfileProvider } from './contexts/ProfileContext';
import { Contact } from './pages/Contact';
import { LanguageProvider } from './contexts/LanguageContext';

function ScrollToPage() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function App() {
  return (
    <LanguageProvider>
      <ProfileProvider>
      <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <SiteMotion />
        <ScrollToPage />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reservation" element={<Consultation />} />
            <Route path="/consultation/:serviceId" element={<Consultation />} />
            <Route path="/packs" element={<Navigate to="/#services" replace />} />
            <Route path="/payment" element={<Navigate to="/#services" replace />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/avis" element={<Feedback />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
      </BrowserRouter>
      </ProfileProvider>
    </LanguageProvider>
  );
}

export default App;
