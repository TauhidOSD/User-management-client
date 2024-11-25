
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {

  const [users, setUsers] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  },[])

  

  const handleUser = event => {
    event.preventDefault();
    const from = event.target;
    const name = from.name.value;
    const email = from.email.value;
    const user = {name,email}
    console.log(user);
    
    fetch('http://localhost:5000/users',{
      method:'POST',
      headers : {
        'content-type' : 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const newUsers = [...users,data];
      setUsers(newUsers);
      setUsers(newUsers);
      from.reset();
      
    })
  }

  return (
    <>
     <form onSubmit={handleUser}>

      <input type="text" name="name" id="" />
      <br />
      <input type="email" name="email" id="" />
      <br />
      <input type="submit" value="Add User" />
     </form>
      <h1>Users management System : {users.length}</h1>
      <div>
    {users.map(user => <p key={user.id} > {user.id} : {user.name} : {user.email}</p>)}
      </div>
     
       
    </>
  )
}

export default App
