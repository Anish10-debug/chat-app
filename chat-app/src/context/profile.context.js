/*eslint-disable*/
import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, database } from '../misc/firebase';
import firebase from 'firebase/app';
//we want to make the username accessible everywhere
//this is why we are making use of Context API which uses
//PROVIDER and CONSUMER
//PROVIDER is a component which provides its children some value or context
//CONSUMER is the component which consumes the context and gets the value

export const isOfflineForDatabase = {
  state: 'offline',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
  state: 'online',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const ProfileContext = createContext(); //to create a context

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //it checks whether user has signed in or not
    let userRef;
    let userStatusRef;

    const authUnsub = auth.onAuthStateChanged(authObj => {
      if (authObj) {
        //if the value changes in the specified path of the database then
        //this callback will run
        //'on' function will return snapshot which will give us data
        //from the database in the form of javascript object
        userStatusRef = database.ref(`/status/${authObj.uid}`);
        userRef = database.ref(`/profiles/${authObj.uid}`);
        userRef.on('value', snap => {
          const { name, createdAt, avatar } = snap.val();

          const UserData = {
            name,
            createdAt,
            avatar,
            uid: authObj.uid,
            email: authObj.email,
          };
          //console.log(UserData);
          setProfile(UserData);
          setIsLoading(false);
        });

        database.ref('.info/connected').on('value', snapshot => {
          // If we're not currently connected, don't do anything.
          if (snapshot.val() == false) {
            return;
          }

          // If we are currently connected, then use the 'onDisconnect()'
          // method to add a set which will only trigger once this
          // client has disconnected by closing the app,
          // losing internet, or any other means.
          userStatusRef
            .onDisconnect()
            .set(isOfflineForDatabase)
            .then(() => {
              userStatusRef.set(isOnlineForDatabase);
            });
        });
      } else {
        //when the user is not logged in or when he logs out
        if (userRef) {
          userRef.off(); //detaches the callback previously attached with on
        }

        if (userStatusRef) {
          userStatusRef.off();
        }

        setProfile(null);
        setIsLoading(false);
        database.ref('.info/connected').off();
      }
    });

    return () => {
      authUnsub();
      if (userRef) {
        userRef.off(); //cleanup function
      }
      if (userStatusRef) {
        userStatusRef.off();
      }
      database.ref('.info/connected').off();
    };
  }, []);

  //in order to pass value to this context we need to pass {profile}
  return (
    <ProfileContext.Provider value={{ isLoading, profile }}>
      {children}
    </ProfileContext.Provider>
    //to use this in our app, we need to wrap app.js within ProfileProvider
    //everything within the ProfileProvider will be act as children
  );
};

//ProfileContext will contain the value
//we will use this value everywhere thats why we exported
//a function useProfile and passed the value of ProfileContext
//NOTE: we cannot pass useContext in a variable. Thats why we created a function
export const useProfile = () => useContext(ProfileContext);
