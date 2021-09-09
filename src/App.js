import SignIn from "./components/signIn/SignIn";
import Dashboard from "./components/dashboard/Dashboard";

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container">
        <Route path="/" exact component={SignIn} />
        <Route path="/dashboard/:type" exact component={Dashboard} />
      </div>
    </Router>
  );
}

export default App;
