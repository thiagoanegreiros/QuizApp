import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Quiz />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  );
}

export default App;
