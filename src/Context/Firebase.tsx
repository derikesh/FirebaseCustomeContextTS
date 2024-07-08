import React, { createContext, useContext, ReactNode } from "react";
import { FirebaseApp } from "firebase/app";
import { initializeApp } from "firebase/app";
import { getDatabase, set, ref } from "firebase/database";
import { getAuth ,createUserWithEmailAndPassword} from "firebase/auth";

import { getDownloadURL ,getStorage} from "firebase/storage";
import { getDocs,getFirestore, collection, Firestore , query} from "firebase/firestore"


interface FirebaseContextProp {
  firebaseApp: FirebaseApp;
  putDataFunction: (key: any, data: any) => void;
  sighnUP:(email:string,password:string)=>void;
  listAllBookk:()=>Promise<any>;
  // getImageUrl:(path:string)=>Promise<any>;
}

const FirebaseContext = createContext<FirebaseContextProp | undefined>(
  undefined
);

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }

  return context;
};

interface FirebaseProviderProps {
  children: ReactNode;
}




export const FireBaseContent: React.FC<FirebaseProviderProps> = ({
  children,
}: FirebaseProviderProps) => {
  
  const firebaseConfig = {
    apiKey: "your key",
    authDomain: "your domain",
    projectId: "your id",
    storageBucket: " your bucket ",
    messagingSenderId: " your id ",
    appId: " your id ",
    measurementId: "your messurement id",
    databaseURL: " your database url ",
  };

  const initilizedFirebase: any = initializeApp(firebaseConfig);

  const database = getDatabase(initilizedFirebase);

  const firebaseApp = initilizedFirebase;

  // function storgae

   const firestore = getFirestore(initilizedFirebase);

 
const listAllBookk = async () => {
  const q = query(collection(firestore, "books")); 
  const querySnapshot = await getDocs(q);
  return querySnapshot;
}

  //  to add any data in firebase we use set and ref keywpords from firebase database
  const putDataFunction = (key: any, data: any) =>
    set(ref(database, key), data);

    // custome auth
    const firebaseAuth = getAuth(initilizedFirebase);

    const sighnUP = ( email:string, password:string )=>{
         return createUserWithEmailAndPassword(firebaseAuth,email,password)
    }

  const firebaseContextValue: FirebaseContextProp = {
    firebaseApp,
    putDataFunction,
    sighnUP,
    listAllBookk,
    // getImageUrl
  };

  // function to set the value of dyanmic database

  return (
    <>
      <FirebaseContext.Provider value={firebaseContextValue}>
        {children}
      </FirebaseContext.Provider>
    </>
  );
};
