import { useState } from 'react'
import './App.css'
import { TbTrashX } from 'react-icons/tb'
import { TbEdit } from 'react-icons/tb'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [todos, setTodos] = useState([])
  const toastOpts = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  }
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
    isNew ? setTodos([...todos, newTodo]) : toast.error('TODO ALREADY EXISTS',toastOpts)
    // clear the intput no matter what happens 
    e.target.todoInput.value = ""
  }
  const removeTodo = (e,idx) => {
    e.preventDefault()
    let filteredTodos = todos.filter((todo,index) => { return index !== idx })
    setTodos(filteredTodos)
  }
  const completeTask = (e, idx) => {
    document.querySelector(`.task-label-${idx}`).classList.toggle('strike')
    let updatedTodos = todos
    updatedTodos[idx].done = !updatedTodos[idx].done
    console.log(updatedTodos[idx].done);
    setTodos(updatedTodos)
  }

  console.log(todos);
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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

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
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <input className={'task-input-' + idx} type="checkbox" onChange={(e) => completeTask(e,idx)}/>
                    <span className={'task-label-' + idx}>{todo.label}</span>
                  </div>
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
