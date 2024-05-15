import './App.css'
import AppHeader from './components/AppHeader.jsx';
import RestaurantList from './components/RestaurantList.jsx';

function App() {
  return (
    <div>
      <AppHeader />
      <main>
        <RestaurantList />
      </main>
    </div>
  );
}

export default App
