import React,{useState,useContext,useEffect} from 'react'
import AlertContext from '../../context/Alert/alertContext';
import AuthContext from '../../context/Auth/AuthContext'
const Register=(props)=> {
    const initialStateofUser = {
        name: '',
        email: '',
        password: '',
        password2: ''
    }
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const { register,error,clearErrors,isAuthenticated } = authContext;
    const { setAlert } = alertContext;
    useEffect(() => {
        if (isAuthenticated){
            props.history.push("/");
        }
        if (error !== null) {
            setAlert(error, 'danger');
            clearErrors();
        }
         //eslint-disable-next-line
    }, [error, props.history,isAuthenticated]);
    const [user, setUser] = useState(initialStateofUser)
  
   
    const handleChange = (event) => {

        setUser({ ...user, [event.target.name]: event.target.value })
    }
    const submitHandler = (e) => {
        e.preventDefault();
       if(name===''||email===''||password===''){
           setAlert('Please Enter all fields','danger')
       } else if ( password !==password2){
           setAlert('Password mismatch', 'danger')
       }else{
          const response=register({
              name,email,password
          })
          console.log(response)
       }
       
        }
    const {name,email,password,password2}=user;
    return (
        <div className="form-container">
        <h1>Account <span className="text-primary">Register</span></h1>
            <form onSubmit={(e) => { submitHandler(e) }}>
            <div className="form-group">
                    <input type="text" placeholder="Name" name="name"
                        value={name} onChange={(event) => { handleChange(event) }}
                    />

            </div>
              <div className="form-group">
                <input type="email" placeholder="Email" name="email"
                    value={email} onChange={(event) => { handleChange(event) }}
                />
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password" name="password"
                        value={password} minLength="6" onChange={(event) => { handleChange(event) }}
                    />
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Confirm Password" name="password2"
                        value={password2} minLength="6" onChange={(event) => { handleChange(event) }}
                    />
                </div>
                <input type="submit" value="Register" className="btn btn-primary btn-block"/>
        </form>
            
        </div>
    )
} 

export default Register
