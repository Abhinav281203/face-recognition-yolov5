import Login from "./components/login/login"
import Register from "./components/register/register"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Upload from "./components/upload/Upload";

function App() {
  return (
    <div className="App">
      <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/upload" component={Upload} />
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;
