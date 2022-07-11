import { Route, Routes } from "react-router-dom";
import Home from "./Components/pages/Home";
import AddVenuePage from "./Components/pages/addVenue/AddVenuePage";
import NotFound from "./Components/pages/NotFound";
import VenuePage from "./Components/pages/venue/VenuePage";
import VenuesPage from "./Components/pages/venues/VenuesPage";
import EditVenuePage from "./Components/pages/editVenue/EditVenuePage"
import RegisterPage from "./Components/pages/register/RegisterPage";
import LoginPage from "./Components/pages/login/LoginPage";
import RequireAuth from "./Components/pages/addVenue/RequireAuth";
import Layout from "./Components/Layout";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={ <Layout /> }>
          <Route index element={ <Home /> } />

          <Route path="new" element={
            <RequireAuth>
              <AddVenuePage />
            </RequireAuth> }
          />

          <Route path="register" element={ <RegisterPage /> } />

          <Route path="login" element={ <LoginPage /> } />

          <Route path="venues/" >
            <Route index element={ <VenuesPage /> } />
            <Route path=":id" element={ <VenuePage /> } />

            <Route path=":id/edit" element={ <EditVenuePage /> } />
          </Route>

          <Route path="*" element={ <NotFound /> } />
        </Route>
      </Routes>
  );
};

export default App;