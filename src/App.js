import  {UseState} from './UseState.js';
/* import  {ClassState} from './ClassState.js'; */
import './App.css';
import { UseReducer } from './UseReducer.js';

function App() {
  return (
    <div className="App">
      <UseState name = "Use State"/>
      <UseReducer name = "Use Reducer"/>
      {/* <ClassState name = "Class State"/> */}
    </div>
  );
}

export default App;
