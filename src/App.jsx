import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TbTrashX } from 'react-icons/tb'
import { TbEdit } from 'react-icons/tb'

function App() {
  const [todos, setTodos] = useState([])

  //  set todos from api 
  useEffect(()=>{
    fetch('https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/nelsonc924')
    .then((response) => response.json())
    .then((data) => setTodos([...data]));
  },[])

  const createTodo = (e) => {
    e.preventDefault()
    let newTodo = {
      'label': e.target.todoInput.value,
      'done': false
    }
    let currentTodos = todos
    let isNew = true
    todos.forEach(todo => {
      if(todo.label.toLowerCase() === newTodo.label.toLowerCase()){
        isNew = false
      }
    })
    //  check if todo is new 
    if (todos === false){
      alert("TODO ALREADY EXISTS")
    } else {
      currentTodos.push(newTodo)
      fetch('https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/nelsonc924', {
        method: "PUT",
        body: JSON.stringify(currentTodos),
        headers: {
            "Content-Type": "application/json"
        }
      })
      .then(resp => { return resp.json() })
      .then(data => { console.log(data); setTodos([...currentTodos]); })
      .catch(error => { console.log(error) })
    }

    // clear the intput no matter what happens 
    e.target.todoInput.value = ""
  }
  const removeTodo = (e,idx) => {
    e.preventDefault()
    let filteredTodos = todos.filter((todo,index) => { return index !== idx })
    // setTodos(filteredTodos)

    // connecting to api
    fetch('https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/nelsonc924', {
      method: "PUT",
      body: JSON.stringify(filteredTodos),
      headers: {
          "Content-Type": "application/json"
      }
    })
    .then(resp => { return resp.json() })
    .then(data => { setTodos([...filteredTodos]) })
    .catch(error => { console.log(error) })
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
