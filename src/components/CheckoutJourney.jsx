import { useSelector } from 'react-redux';
import './CheckoutJourney.css';
import { useNavigate } from 'react-router-dom';
import check from '../assets/check.svg';
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import  { auth, db } from '../firebase';
import { useState, useRef } from 'react';
import closeButton from '../assets/cross.svg';
import AddressMap from './AddressMap.jsx';

const CheckoutJourney = () => {
  const [markerAddress, setMarkerAddress] = useState('');
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const addressLine1 = useRef(null);
  const markerAddressRef = useRef(null);

  const openAddAddressDialog = () => {
    const dialog = document.querySelector('.add-address-dialog');
    dialog.showModal();
  }

  const closeAddAddressDialog = () => {
    const dialog = document.querySelector('.add-address-dialog');
    dialog.close();
  }

  const handleAddNewAddress = async (e) => {
    e.preventDefault();
    const dialog = document.querySelector('.add-address-dialog');

    // Get user address list
    let addressList = [];
    const docRef = doc(db, "users", auth.currentUser.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      addressList =  docSnap.data().address;
    } else {
      console.log("No such document!");
    }

    // Create new address list
    if(addressList?.length > 0) {
      addressList = [...addressList, {
        addressLine1: addressLine1.current.value,
      }]
    } else {
      addressList = [{
        addressLine1: addressLine1.current.value,
      }]
    }

    // Update user address list
    const usersDb = collection(db, "users");
    await setDoc(doc(usersDb, auth.currentUser.email), {
      address: addressList,
    }, { merge: true });

    dialog.close();

    addressLine1.current.value = '';
  }

  return (
    !user ? (
      <div className="checkout-journey">
        <div className="accout">
          <div className="flex-column gap-1">
            <div>
              <div className="fw-bold">Account</div>
              <div>To place your order now, log in to your existing account or sign up.</div>
            </div>
            <div className="login-control">
              <button onClick={() => navigate('/login', { state: { from: 'checkout' }})}>LOG IN</button>
              <button onClick={() => navigate('/sign-up', { state: { from: 'checkout' }})}>SIGN UP</button>
            </div>
          </div>
          <div>
            <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_147,h_140/Image-login_btpq7r" alt="Food Image" />
          </div>
        </div>
        <div className="delivery-address disabled">Delivery address</div>
        <div className="payment disabled">Payment</div>
      </div>
    ) : (
      <div className="checkout-journey">
        <div className="accout">
          <div className="fw-bold">Logged in</div>
          <img src={check} alt="" />
        </div>
        <div className="delivery-address">
          <div className="fw-bold">Select delivery address</div>
          <div className="delivery-address-list">
            <div className="new-address">
              <div>Add new address</div>
              <button onClick={openAddAddressDialog}>ADD NEW</button>
              <dialog className="add-address-dialog">
                <div className="add-address-dialog-header">
                  <div className="fw-bold">Save delivery address</div>
                  <img src={closeButton} alt="Close Button" className="close-button" onClick={closeAddAddressDialog} />
                </div>
                <form>
                  <AddressMap setMarkerAddress={setMarkerAddress} />
                  <textarea className="marker-address" ref={markerAddressRef} value={markerAddress} rows="5" disabled />
                  <input type="text" placeholder="Door/Flat No" ref={addressLine1} />
                  <input type="text" placeholder="Landmark" />
                  <button onClick={handleAddNewAddress}>ADD</button>
                </form>
              </dialog>
            </div>
          </div>
        </div>
        <div className="payment">
          <div className="fw-bold">Choose payment method</div>
        </div>
      </div>
    )
  )
}

export default CheckoutJourney;
