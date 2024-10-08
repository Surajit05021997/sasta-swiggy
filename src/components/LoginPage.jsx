import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth, provider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRef, useState } from "react";
import googleIcon from '../assets/google_icon.svg';
import './LoginPage.css';
import Lottie from "lottie-react";
import loadingAnimation from '../assets/Animations/loading.json';


const LoginPage = () => {
  const [invalidCredentialMsg, setInvalidCredentialMsg] = useState('');
  const [isUserLoading, setIsUserLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const userEmail = useRef(null);
  const userPassword = useRef(null);

  const loginUser = () => {
    setInvalidCredentialMsg('');
    setIsUserLoading(true);
    if(userEmail.current.value.trim() === '' || userPassword.current.value.trim() === '') {
      setInvalidCredentialMsg('Wrong email or password');
      setIsUserLoading(false);
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
        setIsUserLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        if(errorCode === 'auth/invalid-credential') {
          setInvalidCredentialMsg('Invalid email or password');
        }
        setIsUserLoading(false);
      });
  }

  const loginUserWithGoogleAccount = () => {
    setIsUserLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setIsUserLoading(false);
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setIsUserLoading(false);
      })
  }

  return (
    <div className="login">
      {
        isUserLoading ? (
          <div className="user-loading">
            <Lottie animationData={loadingAnimation} loop={true} />
          </div>
        ) : (
          <div>
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
              <button onClick={loginUser} disabled={isUserLoading}>LOGIN</button>
              <div className="align-text-center">OR</div>
              <button className="google-login-btn" onClick={loginUserWithGoogleAccount}>
                <img src={googleIcon} alt="" />
                <div>Login with Google</div>
              </button>
            </form>
          </div>
        )
      }
    </div>
  )
}

export default LoginPage;