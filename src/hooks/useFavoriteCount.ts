import { useEffect, useState } from "react";

import { favoriteOrchidsChangedEventName, readFavoriteOrchids } from "../utils/favoriteOrchids";

export function useFavoriteCount() {
  const [favoriteCount, setFavoriteCount] = useState(() => readFavoriteOrchids().length);

  useEffect(() => {
    function updateFavoriteCount() {
      setFavoriteCount(readFavoriteOrchids().length);
    }

    window.addEventListener(favoriteOrchidsChangedEventName, updateFavoriteCount);
    window.addEventListener("storage", updateFavoriteCount);

    return () => {
      window.removeEventListener(favoriteOrchidsChangedEventName, updateFavoriteCount);
      window.removeEventListener("storage", updateFavoriteCount);
    };
  }, []);

  return favoriteCount;
}
