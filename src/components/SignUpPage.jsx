import { Link, useNavigate, useLocation } from "react-router-dom";
import './SignUpPage.css';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../firebase';
import { useRef, useState } from "react";
import validateFormData from "../utilities/validateFormData";
import { collection, doc, setDoc } from "firebase/firestore"; 
import  { db } from '../firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../store/userSlice';

const SignUpPage = () => {
  const [invalidNameMsg, setInvalidNameMsg] = useState('');
  const [invalidEmailMsg, setInvalidEmailMsg] = useState('');
  const [invalidPasswordMsg, setInvalidPasswordMsg] = useState('');

  const dispatch = useDispatch();
  
  const location = useLocation();
  const navigate = useNavigate();
  
  const userName = useRef(null);
  const userEmail = useRef(null);
  const userPassword = useRef(null);

  const updateUserProfile = (user, userName) => {
    updateProfile(auth.currentUser, {
      displayName: userName,
    }).then(() => {
      addUserToDb(user);
      const { accessToken, displayName, email, uid } = user;
        dispatch(addUser({ accessToken, displayName, email, uid }));
    }).catch((error) => {
      console.log(error);
    });
  }

  const addUserToDb = async (user) => {
    const usersDb = collection(db, "users");
    try {
      await setDoc(doc(usersDb, user.email), {
        uid: user.uid,
        address: null,
        email: user.email,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const signUpUser = () => {
    setInvalidNameMsg('');
    setInvalidEmailMsg('');
    setInvalidPasswordMsg('');
    const validationResult = validateFormData(userName.current.value, userEmail.current.value, userPassword.current.value);
    validationResult.isNameValid ? setInvalidNameMsg('') : setInvalidNameMsg('Invalid name');
    validationResult.isEmailValid ? setInvalidEmailMsg('') : setInvalidEmailMsg('Invalid email');
    validationResult.isPasswordValid ? setInvalidPasswordMsg('') : setInvalidPasswordMsg('Invalid password');

    if(validationResult.isNameValid && validationResult.isEmailValid && validationResult.isPasswordValid) {
      const useNameCopy = userName.current.value;
      createUserWithEmailAndPassword(auth, userEmail.current.value, userPassword.current.value)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateUserProfile(user, useNameCopy);
          if(location.state.from === 'checkout') {
            navigate('/checkout');
          } else {
            navigate('/');
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === 'auth/email-already-in-use') {
            setInvalidEmailMsg('Email address is already registered!');
          }
        });
    }
  }

  return (
    <div className="sign-up">
      <h1>Sign up</h1>
      <div>
        or
        <Link className="redirect-link" to="/login" state={{from: 'homepage'}}> login to your account</Link>
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
