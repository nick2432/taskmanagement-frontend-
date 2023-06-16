
import { BrowserRouter as Router , Routes,Route} from 'react-router-dom';
import Login from './component/login.js';
import Tasks from './component/Tasks';
import Signup from './component/signup';
function App() {
  return (
  <Router>
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/tasks/:id" element={<Tasks/>}/>
      <Route path="/" element={<Login/>}/>
    </Routes>
  </Router>
  );
}

export default App;
