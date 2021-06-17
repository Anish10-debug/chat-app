/*eslint-disable*/
import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, database } from '../misc/firebase';
//we want to make the username accessible everywhere
//this is why we are making use of Context API which uses
//PROVIDER and CONSUMER
//PROVIDER is a component which provides its children some value or context
//CONSUMER is the component which consumes the context and gets the value
const ProfileContext = createContext(); //to create a context

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //it checks whether user has signed in or not
    let userRef;
    const authUnsub = auth.onAuthStateChanged(authObj => {
      if (authObj) {
        //if the value changes in the specified path of the database then
        //this callback will run
        //'on' function will return snapshot which will give us data
        //from the database in the form of javascript object
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
      } else {
        //when the user is not logged in or when he logs out
        if (userRef) {
          userRef.off(); //detaches the callback previously attached with on
        }

        setProfile(null);
        setIsLoading(false);
      }
    });

    return () => {
      authUnsub();
      if (userRef) {
        userRef.off(); //cleanup function
      }
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
