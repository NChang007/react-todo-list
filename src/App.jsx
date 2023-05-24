import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TbTrashX } from 'react-icons/tb'
import { TbEdit } from 'react-icons/tb'

function App() {
  const [todos, setTodos] = useState([])
  const createTodo = (e) => {
    e.preventDefault()
    let newTodo = {
      'label': e.target.todoInput.value,
      'done': false
    }
    // check if todo already exists 
    let isNew = true
    todos.forEach(todo => {
      if(todo.label.toLowerCase() === newTodo.label.toLowerCase()){
        isNew = false
      }
    })
    // if it does return an alert else setTodos
    isNew ? setTodos([...todos, newTodo]) : alert("TODO ALREADY EXISTS")
    // clear the intput no matter what happens 
    e.target.todoInput.value = ""
  }
  const removeTodo = (e,idx) => {
    e.preventDefault()
    let filteredTodos = todos.filter((todo,index) => { return index !== idx })
    setTodos(filteredTodos)
  }
  const updateTodo = (e,idx) => {
    e.preventDefault()
    let todo = todos[idx]
    let form = document.createElement('form')
    let input = document.createElement('input')
    let listItem = document.querySelector(`#listItem${idx}`)
    input.value = todo.label
    input.name = 'editTodo'
    form.style.width = '100%'
    form.appendChild(input)

    form.onsubmit = (e) => {
      e.preventDefault()
      todos[idx].label = e.target.editTodo.value
      listItem.removeChild(form)
      for(let i=0; i< listItem.childElementCount; i++){
        listItem.childNodes[i].classList.remove('hide-elem')
      }
      setTodos([...todos])
    }
    
    // hide all other elements on the li
    for(let i=0; i< listItem.childElementCount; i++){
      listItem.childNodes[i].classList.add('hide-elem')
    }

    listItem.appendChild(form)
  }
  return (
    <>
      <div className='todo'>
        <h1>Todo List</h1>
        <form onSubmit={createTodo}>
          <input type="text" name='todoInput' placeholder={todos[0] ? "ADD TODOS" : "NO TODOS, ADD TODO"}/>
        </form>
        <ul className='todos-list'>
          {
            todos.map((todo,idx) => {
              return(
                <li id={'listItem'+idx} key={idx}>
                  <span>{todo.label}</span>
                  <div style={{display: 'flex', gap: '5px'}}>
                    <button onClick={(e) => updateTodo(e,idx)}><TbEdit/></button>
                    <button onClick={(e) => removeTodo(e,idx)}><TbTrashX/></button>
                  </div>
                </li>
              )
            })
          }
        </ul>
        <span>Todos left : {todos.length}</span>
      </div>
    </>
  )
}

export default App
