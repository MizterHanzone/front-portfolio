import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CVPage from './pages/CVPage';
import CoverLetterPage from './pages/CoverLetterPage';
import { InstallPrompt } from './components/InstallPrompt';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cv" element={<CVPage />} />
        <Route path="/cover-letter" element={<CoverLetterPage />} />
      </Routes>
      <InstallPrompt />
    </>
  );
}

export default App;
