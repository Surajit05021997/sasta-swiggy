import { Link, useNavigate, useLocation } from "react-router-dom";
import './SignUpPage.css';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { auth, provider } from '../firebase';
import { useRef, useState } from "react";
import validateFormData from "../utilities/validateFormData";
import { collection, doc, setDoc } from "firebase/firestore"; 
import  { db } from '../firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../store/userSlice';
import googleIcon from '../assets/google_icon.svg';
import Lottie from "lottie-react";
import loadingAnimation from '../assets/Animations/loading.json';

const SignUpPage = () => {
  const [invalidNameMsg, setInvalidNameMsg] = useState('');
  const [invalidEmailMsg, setInvalidEmailMsg] = useState('');
  const [invalidPasswordMsg, setInvalidPasswordMsg] = useState('');
  const [invalidreTypedPasswordMsg, setInvalidReTypedPasswordMsg] = useState('');
  const [isUserLoading, setIsUserLoading] = useState(false);

  const dispatch = useDispatch();
  
  const location = useLocation();
  const navigate = useNavigate();
  
  const userName = useRef(null);
  const userEmail = useRef(null);
  const userPassword = useRef(null);
  const reTypedPassword = useRef(null);

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
    setInvalidReTypedPasswordMsg('');
    setIsUserLoading(true);

    const isPasswordEqual = userPassword.current.value === reTypedPassword.current.value;
    const validationResult = validateFormData(userName.current.value, userEmail.current.value, userPassword.current.value);
    validationResult.isNameValid ? setInvalidNameMsg('') : setInvalidNameMsg('Invalid name - Should not contain special character.');
    validationResult.isEmailValid ? setInvalidEmailMsg('') : setInvalidEmailMsg('Invalid email');
    validationResult.isPasswordValid ? setInvalidPasswordMsg('') : setInvalidPasswordMsg('Invalid password - Should contain atleast one number, special character, uppercase & lowercase letter and atleast 8 characters.');
    isPasswordEqual ? setInvalidReTypedPasswordMsg('') : setInvalidReTypedPasswordMsg('Re-typed password must be same as password.');



    if(validationResult.isNameValid && validationResult.isEmailValid && validationResult.isPasswordValid && isPasswordEqual) {
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
          setIsUserLoading(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === 'auth/email-already-in-use') {
            setInvalidEmailMsg('Email address is already registered!');
          }
          setIsUserLoading(false);
        });
    } else {
      setIsUserLoading(false);
    }
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
      });
  }

  return (
    <div className="sign-up">
      {
        isUserLoading ? (
          <div className="user-loading">
            <Lottie animationData={loadingAnimation} loop={true} />
          </div>
        ) : (
          <div>
            <h1>Sign up</h1>
            <div>
              or
              <Link className="redirect-link" to="/login" state={{from: 'homepage'}}> login to your account</Link>
            </div>
            <form onSubmit={(event) => event.preventDefault()}>
              <div className="field-container">
                <input type="text" id="name" placeholder="Name" ref={userName} />
                {
                  invalidNameMsg ? (<div className="invalid-msg">{invalidNameMsg}</div>) : ''
                }
              </div>
              <div className="field-container">
                <input type="email" id="email" placeholder="Email" ref={userEmail} />
                {
                  invalidEmailMsg ? (<div className="invalid-msg">{invalidEmailMsg}</div>) : ''
                }
              </div>
              <div className="field-container">
                <input type="password" id="password" placeholder="Password" ref={userPassword} />
                {
                  invalidPasswordMsg ? (<div className="invalid-msg">{invalidPasswordMsg}</div>) : ''
                }
              </div>
              <div className="field-container">
                <input type="password" id="re-type-password" placeholder="Re-Type Password" ref={reTypedPassword} />
                {
                  invalidreTypedPasswordMsg ? (<div className="invalid-msg">{invalidreTypedPasswordMsg}</div>) : ''
                }
              </div>
              <button onClick={signUpUser} disabled={isUserLoading}>CONTINUE</button>
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

export default SignUpPage;
