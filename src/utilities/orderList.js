import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import  { auth, db } from '../firebase';

const orderList = {
  async get() {
    let orderList = [];
    const docRef = doc(db, "users", auth.currentUser.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      orderList = docSnap.data().orderList ? docSnap.data().orderList : [];
    } else {
      console.log("No such document!");
    }
    return orderList;
  },
  
  async update(order) {
    const orderList = await this.get();
    const usersDb = collection(db, "users");
    await setDoc(doc(usersDb, auth.currentUser.email), {
      orderList: [...orderList, { orderDetails: order }],
    }, { merge: true });
  }
}

export default orderList;
