import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import './LoginPage.css';


const LoginPage = () => {
  const [invalidCredentialMsg, setInvalidCredentialMsg] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const userEmail = useRef(null);
  const userPassword = useRef(null);

  const loginUser = () => {
    setInvalidCredentialMsg('');
    setIsLoggingIn(true);
    if(userEmail.current.value.trim() === '' || userPassword.current.value.trim() === '') {
      setInvalidCredentialMsg('Wrong email or password');
      setIsLoggingIn(false);
      return;
    }
    signInWithEmailAndPassword(auth, userEmail.current.value, userPassword.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        if(location.state.from === 'checkout') {
          navigate('/checkout');
        } else {
          navigate('/');
        }
        setIsLoggingIn(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        if(errorCode === 'auth/invalid-credential') {
          setInvalidCredentialMsg('Invalid email or password');
        }
        setIsLoggingIn(false);
      });
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <div>
        or
        <Link className="redirect-link" to="/sign-up" state={{from: 'homepage'}}> create an account</Link>
      </div>
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="field-container">
          <input type="email" id="email" placeholder="Email" ref={userEmail} />
        </div>
        <div className="field-container">
          <input type="password" id="password" placeholder="Password" ref={userPassword} />
        </div>
        <div>
          {
            invalidCredentialMsg ? (<div className="invalid-msg">{invalidCredentialMsg}</div>) : ''
          }
        </div>
        <button onClick={loginUser} disabled={isLoggingIn}>LOGIN</button>
      </form>
    </div>
  )
}

export default LoginPage;