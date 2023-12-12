import { useState } from 'react'
import './App.css'
import TodoItem from './assets/components/TodoItem'
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateTodo from './assets/components/CreateTodo';



function App() {
  let [todoItems, setTodoItems] = useState([
    {id: 1, title: 'Дело 1', min: 0, max: 30, value: 0},
    {id: 2, title: 'Дело 2', min: 0, max: 10, value: 0},
    {id: 3, title: 'Дело 3', min: 0, max: 10, value: 0},
  ])

  // Измениние стадии прогресса внутри каждого todoItem
  function changeValue(id, newVal) {
    setTodoItems(todoItems.map(item => item.id !== id ? item : {...item, value: newVal}));
  }

  // Добавление новой задачи
  function addTask(newTask) {
      setTodoItems([...todoItems, newTask])
  }

  // Удаление задачи
  function deleteTask(id) {
    setTodoItems(todoItems.filter(item => item.id !== id))
  }

  return <div className='container'>
    <CreateTodo 
      items={todoItems}
      addTask={addTask}
    />
    {todoItems.map(item => <TodoItem 
      key={item.id} 
      id={item.id} 
      title={item.title} 
      min={item.min} 
      max={item.max} 
      startValue={item.currentVal}
      deleteTask={deleteTask}
      currentValue={item.value} 
      changeValue={changeValue}
      />)}
    </div>
  
}

export default App
