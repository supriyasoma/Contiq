import PdfViewer from "../../components/organisms/PdfViewer";
import Home from "../../components/template/Home";
import Header from "../../components/organisms/Header";
import SideBar from "../../components/organisms/NavBar";
import { useParams } from "react-router-dom";
import { PDF_REDIRECT_URL } from "../../utils/constants";

const SearchResultsScreen = () => {
  const { id, label, search } = useParams();

  return (
    <Home
      Header={<Header />}
      Sidebar={<SideBar selectedItem="Files" />}
      Content={
        <PdfViewer
          fileName={label ?? "sample.pdf"}
          fileRender={`${PDF_REDIRECT_URL}/${id}/${label}`}
          searchKey={search}
        />
      }
    />
  );
};

export default SearchResultsScreen;
