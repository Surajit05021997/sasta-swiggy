import './App.css'
import AppHeader from './components/AppHeader.jsx';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <AppHeader />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App
