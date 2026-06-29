import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DefaultLayout } from "../layouts/DefaultLayout";
import { CareGuidePage } from "../pages/CareGuidePage";
import { FavoritesPage } from "../pages/FavoritesPage";
import { HomePage } from "../pages/HomePage";
import { OrchidBrowsePage } from "../pages/OrchidBrowsePage";
import { OrchidDetailPage } from "../pages/OrchidDetailPage";
import { RareOrchidsPage } from "../pages/RareOrchidsPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/orchids" element={<OrchidBrowsePage />} />
          <Route path="/care-guide" element={<CareGuidePage />} />
          <Route path="/orchids/:slug" element={<OrchidDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/rare-orchids" element={<RareOrchidsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
