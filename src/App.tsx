
import { useAuth } from '@/context/AuthContext'
import Login from '@/pages/Login'
import DashboardLayout from '@/layouts/DashboardLayout'
import Dashboard from '@/pages/Dashboard'
import Projects from '@/pages/Projects'
import ProjectDetails from '@/pages/ProjectDetails'
// import Dashboard from '@/pages/Dashboard' - Maybe just redirect to Projects as main dashboard?
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
           <Route index element={<Dashboard />} />
           <Route path="projects" element={<Projects />} />
           <Route path="projects/:id" element={<ProjectDetails />} />
           {/* Add more routes here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App
