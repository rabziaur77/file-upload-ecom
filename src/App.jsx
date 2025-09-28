import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainContent from "./Modules/Models/AddNewModel";
import Layout from "./Modules/CommonModules/Layout";
import ModelList from "./Modules/Models/ModelList";
import CoverContent from "./Modules/Covers/AddNewCovert";
import CoverList from "./Modules/Covers/CoverList";
import CheckAuth from "./Modules/Service/AuthRegister";
import Anonymous from "./Modules/CommonModules/anonymous_layout";
import AccountLogin from "./Modules/Accont/Login/account-login";
import CsvByModel from "./Modules/CsvModelCover/CsvByModelCover";
import FinalConfig from "./Modules/Final/ConfigModelndCover";
import BackModelList from "./Modules/BackModel/BackModelList";
import AddNewBackModel from "./Modules/BackModel/AddNewBackModel";
import BackCoverContent from "./Modules/BackCover/BackAddNewCovert";
import BackCoverList from "./Modules/BackCover/BackCoverList";

const App = () => {
  return (
    <>
      {!CheckAuth() ? (
        <BrowserRouter>
          <Anonymous>
            <Routes>
              <Route path="/" element={<AccountLogin />} />
            </Routes>
          </Anonymous>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/model-list" element={<ModelList />} />
              <Route path="/add-cover" element={<CoverContent />} />
              <Route path="/cover-list" element={<CoverList />} />
              <Route path="/csv-by-model" element={<CsvByModel />} />
              <Route path="/final-config" element={<FinalConfig/>} />
              <Route path="/back-model" element={<AddNewBackModel />} />
              <Route path="/back-model-list" element={<BackModelList />} />
              <Route path="/back-cover" element={<BackCoverContent />} />
              <Route path="/back-cover-list" element={<BackCoverList />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
