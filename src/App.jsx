import { useState } from 'react';
import Gallery from './components/Gallery.jsx';
import '../app.js';

/*
- onclick opens adjacent images
*/

function App() {

  const [galNum, setGalNum] = useState(3520);

  /* concise */
  //const options = Array.from({ length: 101 }, (_, i) => 3500 + i);

  /* easy to read begin */
  function range(start, end) {
    const nums = [];
    for (let i = start; i <= end; i++) {
      nums.push(i);
    }
    return nums;
  }
  /* easy to read end */

  const options = range(4000, 4100);

  return (
    <div>
      <header>
        <img src="src/assets/react-core-concepts.png" alt="Stylized atom" />
        <h1>React Essentials</h1>
        <button v-on:click="add(5)">Add 5</button>
        <p>
          Fundamental React concepts you will need for almost any app you are going to build!
        </p>
      </header>
      <main>
        <h2>Time to get started!</h2>
        
        {/* Dropdown to choose the folder number */}
        <label>
          Choose Gallery:&nbsp;
          <select
            value={galNum}
            onChange={(event) => setGalNum(Number(event.target.value))}
          >
            
            {options.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}

          </select>
        </label>

      </main>
      <Gallery galNum={galNum} />
    </div>
  );
}

export default App;
