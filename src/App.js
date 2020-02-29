import React, {useState} from 'react';
import './App.css';
import FormikLoginForm from './Form';

function App() {

  const [users, setUsers] = useState([]);

  return (
    <div className="App">
      {/* <FormikLoginForm /> */}
      <FormikLoginForm users={users} setUsers={setUsers}/>
      <h1>Users:</h1>
      <div>
        {users.map(user => {
          return (
            <p>Name: {user.fname} {user.lname}</p>
          )
        })}
      </div>
    </div>
  );
}

export default App;
