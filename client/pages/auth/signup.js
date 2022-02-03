import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
export default () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    //const [errors,setErrors] = useState([]);
    const {doRequest, errors } = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {
            email, password
        },
        onSuccess: () => Router.push('/')
    });
    const onSubmit = async (event) => {
        event.preventDefault();
        doRequest();
  }
    return <form onSubmit={onSubmit}>
        <h1>Sign up</h1>
        <div className="mb-3">
            <label>Email Address</label>
            <input 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            className="form-control" 
            id="email" />
        </div>
        <div className="mb-3">
            <label>Password</label>
            <input 
            value={password} 
            onChange={e => setPassword(e.target.value)}
            className="form-control" 
            type="password" />
        </div>
        {errors}        
        <button className="btn btn-primary">Sign up</button>        
    </form>
}