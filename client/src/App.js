import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Navbar
import Navbar from "./components/Navbar";

// pages
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Login from "./components/pages/Login";
import Registration from "./components/pages/validation/registration/RegistrationWithValidation";
import Contact from "./components/pages/Contact";
import ResetPassword from "./components/pages/ResetPassword";
import Error from "./components/pages/Error";
import WorkingArea from "./components/pages/WorkingArea";
import CreateUnit from "./components/pages/CreateUnit";
import ManageUnit from "./components/pages/ManageUnit";
import TrackUnits from "./components/pages/TrackUnits";
import TrackLinks from "./components/pages/TrackLinks";
import Scan from "./components/pages/validation/scan/ScanWithValidation";
import Thanks from "./components/pages/Thanks";
import ScanGenerator from "./components/pages/ScanGenerator";
import ScansInformation from "./components/pages/ScansInformation";
import UpdateProfile from "./components/pages/UpdateProfile";
import UnitAnalytics from "./components/dashboards/UnitAnalytics";
import UniversityAnalytics from "./components/dashboards/UniversityAnalytics";
import GlobalAnalytics from "./components/dashboards/GlobalAnalytics";
import CreateInitiative from "./components/pages/CreateInitiative";
import ManageInitiative from "./components/pages/ManageInitiative";
import SearchInitiatives from "./components/pages/SearchInitiatives";
import { LangContext } from "./components/contexts/LangContext";
import { useState } from "react";

/*import ProtectedRoute from "./ProtectedRoute";
import { useState, useMemo, useReducer } from "react" */

function App() {
  const [lang, setLang] = useState("en");

  return (
    <>
      <Router>
        <LangContext.Provider value={{ lang, setLang }}>
          <Navbar />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>

            <Route path="/register">
              <Registration />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>

            <Route path="/workingarea" component={WorkingArea} />

            <Route path="/login" component={Login} />

            <Route path="/resetpassword/:token" component={ResetPassword} />

            <Route path="/createunit">
              <CreateUnit />
            </Route>

            <Route path="/manageunit" component={ManageUnit} />

            <Route path="/trackunits" component={TrackUnits} />

            <Route path="/tracklinks" component={TrackLinks} />

            <Route path="/scangenerator" component={ScanGenerator} />

            <Route exact path="/scan" component={Scan} />

            <Route
              path="/scan/:scantype/:userid/:unitid/:scantoken"
              component={Scan}
            />

            <Route exact path="/updateprofile" component={UpdateProfile} />

            <Route
              exact
              path="/dashboards/unitanalytics"
              component={UnitAnalytics}
            />

            <Route
              exact
              path="/dashboards/universityanalytics"
              component={UniversityAnalytics}
            />

            <Route
              exact
              path="/dashboards/globalanalytics"
              component={GlobalAnalytics}
            />

            <Route path="/thanks">
              <Thanks />
            </Route>

            <Route path="/scansinformation">
              <ScansInformation />
            </Route>

            <Route path="/createinitiative">
              <CreateInitiative />
            </Route>

            <Route path="/manageinitiative">
              <ManageInitiative />
            </Route>

            <Route path="/searchinitiatives">
              <SearchInitiatives />
            </Route>

            <Route path="*">
              <Error />
            </Route>
          </Switch>
        </LangContext.Provider>
      </Router>
    </>
  );
}

export default App;
