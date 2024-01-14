import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import MovieListPage from './pages/MovieListPage';
import MovieDetailPage from './pages/MovieDetailPage';
import Dashboard from './components/Dashboard';
import RegisterPage from './pages/RegisterPage';
import FavoritesPage from './pages/FavoritesPage';
import RecommendationPagePage from './pages/RecommendationPage';
const PrivateRoute = ({ children }) => {
  
  const isAuthenticated = true; 

  return isAuthenticated ? (
    <Dashboard>
      {children}
    </Dashboard>
  ) : (
    <Navigate to="/login" />
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registerpage" element={<RegisterPage />} />
        <Route path="/movies" element={<PrivateRoute><MovieListPage /></PrivateRoute>} />
        <Route path="/movie/:movieId" element={<PrivateRoute><MovieDetailPage /></PrivateRoute>} />
        <Route path="/favorite" element={<PrivateRoute><FavoritesPage /></PrivateRoute>} />
        <Route path="/recommendations" element={<PrivateRoute><RecommendationPagePage /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
