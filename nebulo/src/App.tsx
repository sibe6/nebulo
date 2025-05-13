
import './css/App.css'
import { lorem } from './Const'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Streams from './Streams';
import ProtectedRoute from './ProtectedRoute';
import Feed from './Feed';


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />}>
            <Route
              path="/streams"
              element={
                <ProtectedRoute>
                  <Streams />
                </ProtectedRoute>
              }
              />
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Feed />
                  </ProtectedRoute>
                }
              />
          </Route>
        </Routes>
    </Router>
  );
}

export default App
