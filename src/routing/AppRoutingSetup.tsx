import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Login } from "@/pages";

const AppRoutingSetup = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Navigate to={`/`} replace />} />
      </Routes>
    </Router>
  );
};

export { AppRoutingSetup };
