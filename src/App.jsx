import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainContent from "./Modules/Models/AddNewModel";
import Layout from "./Modules/CommonModules/Layout";
import ModelList from "./Modules/Models/ModelList";
import CoverContent from "./Modules/Covers/AddNewCovert";
import CoverList from "./Modules/Covers/CoverList";
import CsvByModel from "./Modules/Models/csv-by-model";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/model-list" element={<ModelList />} />
          <Route path="/add-cover" element={<CoverContent />} />
          <Route path="/cover-list" element={<CoverList />} />
          <Route path="/csv-by-model" element={<CsvByModel />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
