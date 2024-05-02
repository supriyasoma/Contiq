import React from "react";
import Home from "../../components/template/Home";
import Header from "../../components/organisms/Header";
import SideBar from "../../components/organisms/NavBar";
import PdfViewer from "../../components/organisms/PdfViewer";
import { useParams } from "react-router-dom";
import { PDF_REDIRECT_URL } from "../../utils/constants";

const PDFPage = () => {
  const { id, name } = useParams();

  return (
    <Home
      Header={<Header />}
      Sidebar={<SideBar selectedItem={"Files"} />}
      Content={
        <PdfViewer
          fileName={name ?? "sample.pdf"}
          fileRender={`${PDF_REDIRECT_URL}/${id}/${name}`}
        />
      }
    />
  );
};

export default PDFPage;
