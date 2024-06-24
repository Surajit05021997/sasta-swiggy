import { useSelector, useDispatch } from 'react-redux';
import './CheckoutJourney.css';
import { useNavigate } from 'react-router-dom';
import check from '../assets/check.svg';
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import  { auth, db } from '../firebase';
import { useState, useRef, useEffect } from 'react';
import closeButton from '../assets/cross.svg';
import AddressMap from './AddressMap.jsx';
import DeliveryAddressTile from './DeliveryAddressTile.jsx';
import { addAddress } from '../store/deliveryDetailsSlice';

const CheckoutJourney = () => {
  const [markerAddress, setMarkerAddress] = useState('');
  const [deliveryAddressList, setDeliveryAddressList] = useState([]);
  const user = useSelector((state) => state.user);
  const deliveryDetails = useSelector((state) => state.deliveryDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const flatNo = useRef(null);
  const landmark = useRef(null);
  const markerAddressRef = useRef(null);

  useEffect(() => {
    if(auth.currentUser) {
      getDeliveryAddressList();
    }
  }, [auth.currentUser]);

  const getDeliveryAddressList = async () => {
    const docRef = doc(db, "users", auth.currentUser.email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setDeliveryAddressList(docSnap.data().address);
    } else {
      console.log("No such document!");
    }
  }

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
        markerAddress: markerAddressRef.current.value,
        flatNo: flatNo.current.value,
        landmark: landmark.current.value,
      }]
    } else {
      addressList = [{
        markerAddress: markerAddressRef.current.value,
        flatNo: flatNo.current.value,
        landmark: landmark.current.value,
      }]
    }

    // Update user address list
    const usersDb = collection(db, "users");
    await setDoc(doc(usersDb, auth.currentUser.email), {
      address: addressList,
    }, { merge: true });

    dialog.close();

    // Called to show the newly adde address
    getDeliveryAddressList();

    flatNo.current.value = '';
    landmark.current.value = '';
  }

  const handleChangeDeliveryAddress = () => {
    dispatch(addAddress(null));
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
          <div className="fw-bold mb-1">{deliveryDetails?.address ? (
            <div className='flex-row justify-space-between'>
              <div className='flex-row gap-1'>
                <div>Delivery address</div>
                <button className="change-delivery-address-btn" onClick={handleChangeDeliveryAddress}>CHANGE</button>
              </div>
              <img src={check} alt="" />
            </div>
          ) : 'Select delivery address'}</div>
          {
            deliveryDetails?.address ? (
              <div className="selected-delivery-address">
                {deliveryDetails?.address.markerAddress}
              </div>
            ) : (
              <div className="delivery-address-list">
                {
                  deliveryAddressList?.map((address, index) => {
                    return <DeliveryAddressTile address={address} key={index} />
                  })
                }
                <div className="new-address">
                  <div className="mb-1">Add new address</div>
                  <button onClick={openAddAddressDialog}>ADD NEW</button>
                  <dialog className="add-address-dialog">
                    <div className="add-address-dialog-header">
                      <div className="fw-bold">Save delivery address</div>
                      <img src={closeButton} alt="Close Button" className="close-button" onClick={closeAddAddressDialog} />
                    </div>
                    <form>
                      <AddressMap setMarkerAddress={setMarkerAddress} />
                      <textarea className="marker-address" ref={markerAddressRef} value={markerAddress} rows="5" disabled />
                      <input type="text" placeholder="Door/Flat No" ref={flatNo} />
                      <input type="text" placeholder="Landmark" ref={landmark}/>
                      <button onClick={handleAddNewAddress}>ADD</button>
                    </form>
                  </dialog>
                </div>
              </div>
            )
          }
          
        </div>
        <div className="payment">
          <div className="fw-bold">Choose payment method</div>
        </div>
      </div>
    )
  )
}

export default CheckoutJourney;
