import React, { useState, useContext, useEffect }from 'react'
import AuthContext from '../../context/Auth/AuthContext';
import AlertContext from '../../context/Alert/alertContext';
const Login = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const { loginUser, error, clearErrors, isAuthenticated } = authContext;
    const { setAlert } = alertContext;
    useEffect(() => {
        if (isAuthenticated) {
            props.history.push("/");
        }
        if (error) {
            setAlert(error, 'danger');
            clearErrors();
        }
       //eslint-disable-next-line
    }, [error, props.history, isAuthenticated]);

    const initialStateofUser = {
       
        email: '',
        password: '',
      
    }

    const [user, setUser] = useState(initialStateofUser)


    const handleChange = (event) => {

        setUser({ ...user, [event.target.name]: event.target.value })
    }
    const submitHandler = (e) => {
        e.preventDefault();
        if(email===''||password===""){
            setAlert("please fill the password")
        }else{
            loginUser({email,password})
            setUser(initialStateofUser)
        }
      
    }
    const {  email, password } = user;
    return (
        <div className="form-container">
            <h1>Account <span className="text-danger">Log In</span></h1>
            <form onSubmit={(e) => { submitHandler(e) }}>
                
                <div className="form-group">
                    <input type="email" placeholder="Email" name="email"
                        value={email} onChange={(event) => { handleChange(event) }}
                    />
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password" name="password"
                        value={password} onChange={(event) => { handleChange(event) }}
                    />
                </div>
                
                <input type="submit" value="Log In" className="btn btn-primary btn-block" />
            </form>

        </div>
    )
}

export default Login
