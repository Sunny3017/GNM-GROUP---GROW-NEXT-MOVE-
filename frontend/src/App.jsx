import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import About from './pages/About';
import NotFound from './pages/NotFound';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddProperty from './pages/admin/AddProperty';
import EditProperty from './pages/admin/EditProperty';
import ManageProperties from './pages/admin/ManageProperties';
import ManageJobs from './pages/admin/ManageJobs';
import ViewApplications from './pages/admin/ViewApplications';
import ViewInquiries from './pages/admin/ViewInquiries';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-primary-light">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/property/:slug" element={<PropertyDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/about" element={<About />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/add" element={<ProtectedRoute><AddProperty /></ProtectedRoute>} />
            <Route path="/admin/edit/:id" element={<ProtectedRoute><EditProperty /></ProtectedRoute>} />
            <Route path="/admin/manage" element={<ProtectedRoute><ManageProperties /></ProtectedRoute>} />
            <Route path="/admin/jobs" element={<ProtectedRoute><ManageJobs /></ProtectedRoute>} />
            <Route path="/admin/applications" element={<ProtectedRoute><ViewApplications /></ProtectedRoute>} />
            <Route path="/admin/inquiries" element={<ProtectedRoute><ViewInquiries /></ProtectedRoute>} />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
