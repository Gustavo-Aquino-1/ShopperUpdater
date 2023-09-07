import { Switch, Route } from 'react-router-dom';
import './App.css';
import UpdateProduct from './pages/UpdateProduct';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Tutorial from './pages/Tutorial';

function App() {
  return (
    <Switch>
      <Route exact path="/tutorial" component={Tutorial} />
      <Route exact path="/" component={UpdateProduct} />
      <Redirect from="*" to="/" />
    </Switch>
  );
}

export default App;
