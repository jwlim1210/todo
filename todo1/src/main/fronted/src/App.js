import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);



  useEffect(() => {
    axios.get('/api/todo/list')  // 백엔드에서 처리하는 경로로 수정
      .then(response => {
        setData(response.data);
      })
  }, []);
  


  return (
    <div className="App">
      <h1>Todo List</h1>
      {data ? (
        <ul>
          {data.map((todo, index) => (
            <li key={index}>{todo.title}<br></br>{todo.description}
            </li>
            
    
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default App;
