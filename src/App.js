import SignIn from "./components/signIn/SignIn";
import Dashboard from "./components/dashboard/Dashboard";

import { BrowserRouter as Router, Route } from "react-router-dom";

const host = 'http://localhost'

function App() {
  return (
    <Router>
      <div className="container">
        <Route path="/" exact>
          <SignIn host={host}/>
        </Route>
        <Route path="/dashboard/:type" exact>
          <Dashboard host={host}/>
        </Route>
      </div>
    </Router>
  );
}

export default App;
