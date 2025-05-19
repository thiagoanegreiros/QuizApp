import { Routes, Route } from 'react-router-dom';
import './App.css';
import QuizSetup from './components/QuizSetup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<QuizSetup />} />
    </Routes>
  );
}

export default App;
