import { Route, BrowserRouter as Router, Routes, } from "react-router-dom"
import Login from "./components/login/Login";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import CreateEmployee from "./pages/CreateEmployee";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import EmployeeList from "./pages/EmployeeList";
import UpdateEmployee from "./pages/UpdateEmployee";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='login' element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path='/' element={<DashboardLayout />}>
            <Route path='' element={<Dashboard />} />
            <Route path='employees' element={<EmployeeList />} />
            <Route path='create-employee' element={<CreateEmployee />} />
            <Route path='edit-employee/:id' element={<UpdateEmployee />} />
          </Route>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
