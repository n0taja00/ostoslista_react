import './App.css';
import {useState,useEffect} from "react";
import axios from  "axios";

const URL = "http://localhost/ostoslista/";

function App() {
    const [item, setItem] = useState([]);
    const [text,setText] = useState("");
    const [amount,setAmount] = useState("");

    function save(e) {
      e.preventDefault();
      const json = JSON.stringify({description:text, amount:amount})
    axios.post(URL + 'add.php',json,{
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) =>{
      setItem(item => [...item,response.data]);
      setText('');
      setAmount('');
    }).catch (error => {
      alert(error.response.data.error)
    });
    }

    function remove(id) {
      const json = JSON.stringify({id:id})
      axios.post(URL + 'delete.php', json, {
        headers: {
          'Content-type': 'application/json'
        }
      })
      .then((response) => {
        const newListWithoutRemoved = item.filter((item) => item.id !== id);
        setItem(newListWithoutRemoved);
      }).catch (error => {
        alert(error.response ? error.response.data.error : error);
      });
      }

    useEffect(()=> {
      axios.get(URL)
      .then((response)=> {
        console.log(response.data);
        setItem(response.data);
      }).catch(error => {
        alert(error);
      })
    },[])

return (
  <form onSubmit={save}>
     <h3>Shopping list</h3>
 <div>
   <label>New item</label>
   <input type="text"
   onChange={e => setText(e.target.value)}
   value={text} placeholder="type description" />
 </div>
 <div id="amount">
  <input type="number" step="1"
  onChange={e => setAmount(e.target.value)}
  value={amount} placeholder="type amount"/>
 </div>
 <div id="button">
 <button>Add</button>
 </div>
 <output>
   <ol>
    {item?.map(text => (
      <li key={text.id}>{text.description}, {text.amount} &nbsp;
      <a href="#" classname="delete" onClick={() => remove(text.id)}>Delete</a>
      </li>
    ))}
  </ol>
  </output>
   </form>
)

}

export default App;
