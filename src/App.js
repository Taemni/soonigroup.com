// App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/layouts/header";
import Main from "./pages/main";
import Group from "./pages/group";
import NotFound from "./pages/404";
import Footer from "./components/layouts/footer";
import styled from "styled-components";

const PageContainer = styled.div`
  max-width: 1140px;
  margin-top: 20px;
`;

function App() {
  return (
    <BrowserRouter>
      <PageContainer className="container page-container">
        <Header />
        <div className="bg-transparent">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/groups/:groupId" element={<Group />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </PageContainer>
    </BrowserRouter>
  );
}
export default App;
