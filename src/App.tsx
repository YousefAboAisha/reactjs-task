import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import Home from "./Pages/Home";
import Panel from "./Pages/Panel";
import PrivateRoute from "./hoc/privateRoute";

function App() {
  return (
    <Routes>
      <Route index path="/signin" element={<Home />} />

      {/* Make the register page as the default route */}
      <Route path="/" element={<Navigate to="/signin" />} />

      {/* Private Route */}
      <Route
        path="/panel"
        element={
          <PrivateRoute>
            <Panel />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
