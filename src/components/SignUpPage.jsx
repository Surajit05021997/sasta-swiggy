import { Link } from "react-router-dom";
import './SignUpPage.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useRef, useState } from "react";
import validateFormData from "../utilities/validateFormData";

const SignUpPage = () => {
  const [invalidNameMsg, setInvalidNameMsg] = useState('');
  const [invalidEmailMsg, setInvalidEmailMsg] = useState('');
  const [invalidPasswordMsg, setInvalidPasswordMsg] = useState('');

  const userName = useRef(null);
  const userEmail = useRef(null);
  const userPassword = useRef(null);

  const signUpUser = () => {
    setInvalidNameMsg('');
    setInvalidEmailMsg('');
    setInvalidPasswordMsg('');
    const validationResult = validateFormData(userName.current.value, userEmail.current.value, userPassword.current.value);
    validationResult.isNameValid ? setInvalidNameMsg('') : setInvalidNameMsg('Invalid name');
    validationResult.isEmailValid ? setInvalidEmailMsg('') : setInvalidEmailMsg('Invalid email');
    validationResult.isPasswordValid ? setInvalidPasswordMsg('') : setInvalidPasswordMsg('Invalid password');
    if(validationResult.isNameValid && validationResult.isEmailValid && validationResult.isPasswordValid) {
      createUserWithEmailAndPassword(auth, userEmail.current.value, userPassword.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    }
  }

  return (
    <div className="sign-up">
      <h1>Sign up</h1>
      <div>
        or
        <Link className="redirect-link" to="/login"> login to your account</Link>
      </div>
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="field-container">
          <input type="text" id="name" placeholder="Name" ref={userName} />
          {/* <label className={isInputFocus} htmlFor="name">Name</label> */}
          {
            invalidNameMsg ? (<div className="invalid-msg">{invalidNameMsg}</div>) : ''
          }
        </div>
        <div className="field-container">
          <input type="email" id="email" placeholder="Email" ref={userEmail} />
          {/* <label htmlFor="email">Email</label> */}
          {
            invalidEmailMsg ? (<div className="invalid-msg">{invalidEmailMsg}</div>) : ''
          }
        </div>
        <div className="field-container">
          <input type="password" id="password" placeholder="Password" ref={userPassword} />
          {/* <label htmlFor="password">Password</label> */}
          {
            invalidPasswordMsg ? (<div className="invalid-msg">{invalidPasswordMsg}</div>) : ''
          }
        </div>
        <button onClick={signUpUser}>CONTINUE</button>
      </form>
    </div>
  )
}

export default SignUpPage;
