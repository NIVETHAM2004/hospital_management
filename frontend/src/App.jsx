import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import StaffManagement from './pages/StaffManagement';
import PatientManagement from './pages/PatientManagement';
import LabManagement from './pages/LabManagement';
import WardManagement from './pages/WardManagement';
import PharmacyManagement from './pages/PharmacyManagement';
import TreatmentManagement from './pages/TreatmentManagement';
import InvoiceManagement from './pages/InvoiceManagement';
import './App.css';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/staff" element={<StaffManagement />} />
          <Route path="/patient" element={<PatientManagement />} />
          <Route path="/lab" element={<LabManagement />} />
          <Route path="/ward" element={<WardManagement />} />
          <Route path="/pharmacy" element={<PharmacyManagement />} />
          <Route path="/treatment" element={<TreatmentManagement />} />
          <Route path="/invoice" element={<InvoiceManagement />} />
          <Route path = "/patient"element={<PatientManagement/>}/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;