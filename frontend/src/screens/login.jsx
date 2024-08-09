import { useState, useContext, useEffect } from "react";
import Input from "../components/input";
import Message from "../components/message";
import { AuthContext } from '../context/AuthContext'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { login, user } = useContext(AuthContext)
  const { getEvents } = useContext(AppContext)
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState({type: 'error', text: ''})

  const navigate = useNavigate()

  const handleSubmit = async () => {    
    if(data.username === '' || data.password === ''){
      return setMessage({type: 'error', text: 'All fields are required.'})
    }
    setMessage({type: 'error', text: ''})
    const resp = await login(data)
    if(resp.error){
      setMessage({type: 'error', text: resp.data.message})
    }
  }

  useEffect(() => {    
    if(user){
      getEvents()
      navigate('/events')
    }
  }, [user])

  return (
    <section className="h-screen flex justify-center items-center">
      <div className="w-96">
        <p className="text-5xl font-bold text-center mb-5">Login</p>
        {message.text.length > 0 && <Message type={message.type} text={message.text} />}
        <Input
          id="username"
          label="Username"
          type="text"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button className="btn" onClick={handleSubmit}>Submit</button>
      </div>
    </section>
  );
};

export default Login;
