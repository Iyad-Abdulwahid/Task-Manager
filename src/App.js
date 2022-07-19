import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  
  useEffect(() => {
    const getQuotes = async () =>{
      const quotesFromApi = await fetchQuotes()
      setTasks(quotesFromApi)
    }
    getQuotes()
  },)
  const fetchQuotes = async () => {
    const res = await fetch("https://inspirational-quotes-api.herokuapp.com/quotes")
    const data = await res.json()
    console.log(data)
    return data
  }
  
  // Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }
  
  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
    alert('Are You Sure You Want To Delete This Task?')
  }
  
  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
      task.id === id ? { ...task, reminder: !task.reminder } : task
      )
      )
    }
    
    // constructor(props);{
    //   (props);
    //   this.state = {
    //     items: [],
    //     isLoaded: false,
    //   }
    // }
  
    // componentDidMount();{
    //   fetch("https://inspirational-quotes-api.herokuapp.com/quotes")
    //     .then(res => res.json())
    //     .then(json => {
    //       this.state({
    //         isLoaded: true,
    //         items: json,
    //       })
    //     });
    // }
    // var { isLoaded, items } = this.state;
    // if (!isLoaded) {
    //   return <div>Loading...</div>;
    // } else { return (
    //   <div>
    //   <ul>
    //     {items.map(item => (item => (
    //       <li key= {item.id}>
    //         {item.quote} - {item.source}
    //       </li>
    //     ))};
    //   </ul>
    //   </div>

    return (
      <Router>
      <div className='container'>
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
          />
        <Routes>
          <Route
            path='/'
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                  />
                  ) : (
                    'You Have Nothing In Your List Yet!'
                    )}
              </>
            }
            />
        </Routes>
      </div>
    </Router>
    
)}

export default App
