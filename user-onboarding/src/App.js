import React,{useState} from 'react';
import Form from './components/Forms'
import schema from './components/formSchema';
import * as yup from 'yup';
import axios from 'axios';
import './App.css';


const intitalFormValues = {
  username: '',
  password:'',
  email: '',
  tos: false
}

const intitalFormErrors = {
  username: '',
  password:'',
  email: '',
  tos: ''
}

function App() {
const [formValues , setFormValues] = useState(intitalFormValues)
const [formErrors, setFormErrors] = useState(intitalFormErrors)
const [users, setUsers] = useState([]);

 const handleSubmit = () => {
   axios.post("https://reqres.in/api/users", formValues)
   .then(res => {
    setUsers([res.data, ...users])
    
   })
   .catch(err => console.error(err))
   .finally(() => setFormValues(intitalFormValues))
}

const validate = (name, value) => {
  yup.reach(schema, name)
  .validate(value)
  .then(() => setFormErrors({ ...formErrors, [name]: ''}))
  .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0]}))
}

const handleChange = (name, value) => {
  validate(name, value);
  setFormValues({ ...formValues, [name]: value});
}

  return (
    <div className="App">
    <h1>User App!</h1>
    <Form 
    values={formValues} 
    change={handleChange} 
    errors={formErrors} 
    submit={handleSubmit}
    />
    {users.map(user => (
      <div key={user.id}>
        <p>{user.createdAt}</p>
        <p>{user.email}</p>
      </div>
    ))}
    </div>
  );
}

export default App;
