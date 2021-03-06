import React, { useState, useEffect } from "react";

import ShowFavoriteList from "../../components/ShowFavoriteList/ShowFavoriteList";
import firebase from "firebase";
import { useAuth } from "../../contexts/AuthContext";

import "./FavoritesPage.scss";

export default function FavoritesPage() {
  const { currentUser } = useAuth();
  const [favorites, setFavorites] = useState([] as any);

  const ref = firebase.firestore().collection("Favorites");

  //ONE TIME GET FUNCTION
  function getFavorites() {
    if (currentUser) {
      ref.where("user", "==", currentUser.uid).onSnapshot((querySnapshot) => {
        const items = [] as any;

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          items.push(data);

          setFavorites({ ...favorites, items });
        });
      });
    }
  }

  useEffect(() => {
    getFavorites();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="page">
      <div className="page__content-wrapper">
        {favorites && favorites.items && favorites.items.length > 0 && (
          <ShowFavoriteList title="My Favorite Shows" shows={favorites.items} />
        )}
      </div>
    </div>
  );
}
