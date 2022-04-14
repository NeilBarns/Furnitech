import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set } from "firebase/database";

import React, { useContext } from 'react'

//CONTEXTS
import {
  useUserManagementContext
} from '../hooks/ContextProvider';

const FirebaseOperations = () => {

  const { user_changes } = useContext(useUserManagementContext);

  const firebaseConfig = {
    apiKey: "AIzaSyA7oiFNBsQmyKrQzlJbgIjgLTKABB3KjOo",
    authDomain: "furnitech-37b23.firebaseapp.com",
    databaseURL: "https://furnitech-37b23-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "furnitech-37b23",
    storageBucket: "furnitech-37b23.appspot.com",
    messagingSenderId: "893115740258",
    appId: "1:893115740258:web:761dbd1a9d12ae7645e13b",
    measurementId: "G-6Y0L562WQB"
  };

  const app = initializeApp(firebaseConfig);

  const database = getDatabase(app);

  const db = getDatabase();


  const insertNewCategorytoFirebase = async (payload) => {

    let { firebaseCategoryAddress, category } = payload;

    set(ref(db, firebaseCategoryAddress), true);
  }

  const insertNewDevicetoFirebase = async (payload) => {

    let { firebaseDeviceAddress, discoveredWifiDeviceFBJSON } = payload;

    firebaseDeviceAddress = firebaseDeviceAddress.split('-').join('/');
    discoveredWifiDeviceFBJSON = JSON.parse(discoveredWifiDeviceFBJSON);

    set(ref(db, firebaseDeviceAddress), discoveredWifiDeviceFBJSON);
  }

  const subscribe = async (payload) => {
    let { firebasePath } = payload;
    let reference = ref(db, firebasePath);

    onValue(reference, (snapshot) => {
      let values = snapshot.val();
      fetchedDeviceList = Object.values(values);
      user_changes({ type: 'saveDeviceList', payload: { fetchedDeviceList } })
    });

  }

  return {
    insertNewCategorytoFirebase,
    insertNewDevicetoFirebase,
    subscribe
  }
}

export default FirebaseOperations


