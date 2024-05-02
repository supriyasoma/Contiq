import { useEffect, useState } from "react";
import Home from "../../components/template/Home";
import Header from "../../components/organisms/Header";
import SideBar from "../../components/organisms/NavBar";
import HomeBody from "../../components/organisms/HomeBody";
import { HomeDataItem } from "../../utils/interfaces";
import { fileData } from "../../services";

const HomePage = () => {
  const [filesData, setFilesData] = useState<HomeDataItem[]>([]);

  useEffect(() => {
    const today = new Date();
    const fifteenDaysBack = new Date();
    fifteenDaysBack.setDate(today.getDate() - 15);
    const formattedDate = fifteenDaysBack.toISOString().split("T")[0];
    const fetchRecentFiles = async () => {
      const response = await fileData();
      setFilesData(
        response.files.filter(
          (file: HomeDataItem) =>
            file.createdOn?.split("T")[0] > formattedDate &&
            file.userId === parseInt(localStorage.getItem("id") ?? "1")
        )
      );
    };

    fetchRecentFiles();
  }, []);

  return (
    <Home
      Header={<Header />}
      Sidebar={<SideBar />}
      Content={<HomeBody HomeData={filesData} />}
    />
  );
};

export default HomePage;
