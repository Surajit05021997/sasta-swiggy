import { useSelector } from 'react-redux';
import './CheckoutJourney.css';
import { useNavigate } from 'react-router-dom';
import check from '../assets/check.svg';
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import  { auth, db } from '../firebase';
import { useRef } from "react";

const CheckoutJourney = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const addressLine1 = useRef(null);

  const openAddAddressDialog = () => {
    const dialog = document.querySelector('.addAddressDialog');
    dialog.showModal();
  }

  const handleAddNewAddress = async (e) => {
    e.preventDefault();
    const dialog = document.querySelector('.addAddressDialog');

    console.log(addressLine1.current.value)

    // Get user address list
    let addressList = [];
    const docRef = doc(db, "users", auth.currentUser.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      addressList =  docSnap.data().address;
    } else {
      console.log("No such document!");
    }

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
              <dialog className="addAddressDialog">
                <div className="fw-bold">Save delivery address</div>
                <form>
                  <input type="text" placeholder="Address line 1" ref={addressLine1} />
                  <input type="text" placeholder="Address line 2" />
                  <input type="text" placeholder="Address line 3" />
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
