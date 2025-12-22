// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PrivateRoute from './components/common/PrivateRoute/PrivateRoute';

import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import EditProfilePage from './pages/EditProfilePage/EditProfilePage';
import ProjectsPage from './pages/ProjectsPage/ProjectsPage';
import AddEditProjectPage from './pages/AddEditProjectPage/AddEditProjectPage';
import ProfilesPage from './pages/ProfilesPage/ProfilesPage';
import PublicProfilePage from './pages/PublicProfilePage/PublicProfilePage';

import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profiles" element={<ProfilesPage />} />
              <Route path="/profiles/:username" element={<PublicProfilePage />} />
              <Route path="/projects" element={<ProjectsPage />} />

              <Route 
                path="/profile" 
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/profile/edit" 
                element={
                  <PrivateRoute>
                    <EditProfilePage />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/projects/add" 
                element={
                  <PrivateRoute>
                    <AddEditProjectPage />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/projects/edit/:id" 
                element={
                  <PrivateRoute>
                    <AddEditProjectPage />
                  </PrivateRoute>
                } 
              />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
