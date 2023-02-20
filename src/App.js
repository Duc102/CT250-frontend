// import "./bootstrap-5.2.2/css/bootstrap.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import {Routes, Route } from 'react-router-dom'
import './App.css';
import User from "./Components/User/User";
import Administrator from "./Components/Administrator/Administrator";
function App() {
  return (
    <Routes>
      <Route path='/*' element={<User/>}></Route>
      <Route path='/administrator/*' element={<Administrator/>}></Route>
    </Routes>
  );
}

export default App;
