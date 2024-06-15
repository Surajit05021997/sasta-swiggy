import { Link, useNavigate } from "react-router-dom";
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import './LoginPage.css';


const LoginPage = () => {
  const [invalidCredentialMsg, setInvalidCredentialMsg] = useState('');

  const navigate = useNavigate();

  const userEmail = useRef(null);
  const userPassword = useRef(null);

  const loginUser = () => {
    setInvalidCredentialMsg('');
    if(userEmail.current.value.trim() === '' || userPassword.current.value.trim() === '') {
      setInvalidCredentialMsg('Invalid email or password');
      return;
    }
    signInWithEmailAndPassword(auth, userEmail.current.value, userPassword.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        if(errorCode === 'auth/invalid-credential') {
          setInvalidCredentialMsg('Invalid email or password');
        }
      });
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <div>
        or
        <Link className="redirect-link" to="/sign-up"> create an account</Link>
      </div>
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="field-container">
          <input type="email" id="email" placeholder="Email" ref={userEmail} />
          {/* <label htmlFor="email">Email</label> */}
        </div>
        <div className="field-container">
          <input type="password" id="password" placeholder="Password" ref={userPassword} />
          {/* <label htmlFor="password">Password</label> */}
        </div>
        <div>
          {
            invalidCredentialMsg ? (<div className="invalid-msg">{invalidCredentialMsg}</div>) : ''
          }
        </div>
        <button onClick={loginUser}>LOGIN</button>
      </form>
    </div>
  )
}

export default LoginPage;