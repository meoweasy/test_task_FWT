import { BrowserRouter as Router } from 'react-router-dom';
import Header from './pages/Header';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Home />
      </div>
    </Router>
  );
}

export default App;
