import { createContext, ReactNode, useEffect, useState } from "react";
import firebase, { FirebaseOptions } from 'firebase/app';
import { db, auth } from "../libs/firebase";

interface CountsProvider{
  children: ReactNode;
}

export interface CountsType{
  id: string;
  uid: string;
  count: string;
  date: string;
  value: number;
  type: string;
}

export const CountsContext = createContext({} as CountsType[]);

export const CountsContextProvider = ({ children }: CountsProvider) => {

  const [counts, setCounts] = useState<CountsType[]>([]);

  useEffect(() => {
   
    auth.onAuthStateChanged(user => {

      if(user){
        db.collection("counts").orderBy("timestamp", "desc").get()
        .then(items => {
          let filtered = items.docs.filter(count => count.data().uid === user.uid),
              data = filtered.map(count => ({
                count: count.data().count,
                value: count.data().value,
                uid: count.data().uid,
                date: count.data().date,
                type: count.data().type,
                id: count.id
              }))

          setCounts(data);
        })
        .catch(error => console.log(error.message))
      }

    })    

  }, []);

  return(
    <CountsContext.Provider value={ counts }>
      {children}
    </CountsContext.Provider>
  )
}