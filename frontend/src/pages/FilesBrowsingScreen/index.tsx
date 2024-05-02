import React, { SetStateAction, useEffect, useState } from "react";
import MuiTypography from "../../components/atoms/Typograpy";
import Home from "../../components/template/Home";
import SideBar from "../../components/organisms/NavBar";
import Header from "../../components/organisms/Header";
import { Stack } from "@mui/material";
import Dropdown from "../../components/atoms/Dropdown";
import {
  FILES_PAGE_CONSTANTS,
  fileTypeOptions,
  publishOptions,
  tabsOne,
} from "../../utils/constants";
import DateSelector from "../../components/atoms/Datepicker";
import { Icon } from "../../components/atoms/Icons";
import SwapIcon from "../../../public/assets/icons/swap.svg";
import ChevronIcon from "../../../public/assets/icons/chevron.svg";
import Agreement from "../../../public/assets/images/fileCard.svg";
import Toggle from "../../../public/assets/icons/toggle.svg";
import NoFileIcon from "../../../public/assets/icons/noFiles.svg";
import theme from "../../theme";
import Tabs from "../../components/atoms/Tabs";
import { FileCard } from "../../components/molecules/FileCard";
import {
  CustomDivider,
  FilesContainer,
  FiltersBox,
  MenuBox,
  NoFilesContainer,
  RevelantBox,
  SubFiltersBox,
  TabsBox,
  TopHeaderBox,
} from "./fileStyles";
import { fileData } from "../../services";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router";
import { UploadFromCloud } from "../../components/organisms/UploadFromCloud";

const fileTabsProps = {
  activeTabColor: theme.palette.primary.main,
  inactiveTabColor: theme.palette.grays.gray200,
  backgroundColor: "white",
  width: "15.9375rem",
};

export interface FilesDataProperties {
  fileId: string;
  fileName: string;
  fileType: string;
  filePath: string;
  userId: number;
  trashed: boolean;
  synced: boolean;
  createdOn: string;
  updatedOn: string;
  content: string;
}

const FilesBrowsingScreen = () => {
  const [filesData, setFilesData] = useState<FilesDataProperties[]>([]);
  const [filteredFilesData, setFilteredFilesData] = useState<
    FilesDataProperties[]
  >([]);
  const [fileType, setFileType] = useState<string>("");
  const [isFileTypeMenuOpen, setIsFileTypeMenuOpen] = useState<boolean>(false);
  const [publishSetting, setPublishSetting] = useState<string>("");
  const [isPublishMenuOpen, setIsPublishMenuOpen] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>("");
  const [isStartDateOpen, setIsStartDateOpen] = useState<boolean>(false);
  const [endDate, setEndDate] = useState<string>("");
  const [isEndDateOpen, setIsEndDateOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleMenuOpen = () => {
    setIsFileTypeMenuOpen(!isFileTypeMenuOpen);
  };

  const handleFileTypeChange = (event: any) => {
    const typeValue = event.target.value;
    setFileType(typeValue);
    handleFilterFilesData(typeValue, publishSetting, startDate, endDate);
  };

  const handleFileTypeClear = () => {
    setFileType("");
    handleFilterFilesData("", publishSetting, startDate, endDate);
  };

  const handlePublishMenuOpen = () => {
    setIsPublishMenuOpen(!isPublishMenuOpen);
  };

  const handlePublishChange = (event: any) => {
    const publishValue = event.target.value;
    setPublishSetting(publishValue);
    handleFilterFilesData(fileType, publishValue, startDate, endDate);
  };

  const handlePublishClear = () => {
    setPublishSetting("");
    handleFilterFilesData(fileType, "", startDate, endDate);
  };

  const handleStartDate = (value: SetStateAction<string>) => {
    const startDateValue = value;
    setStartDate(startDateValue);
    handleFilterFilesData(
      fileType,
      publishSetting,
      startDateValue.toString(),
      endDate
    );
  };

  const handleEndDate = (value: SetStateAction<string>) => {
    const endDateValue = value;
    setEndDate(endDateValue);
    handleFilterFilesData(
      fileType,
      publishSetting,
      startDate,
      endDateValue.toString()
    );
  };

  const handleFilterFilesData = (
    typeValue: string,
    publishValue: string,
    startDateValue: string,
    endDateValue: string
  ) => {
    const filteredResponse = filesData?.filter((file) => {
      const typeFilteration =
        typeValue === "" ||
        file.fileType.toLowerCase() === typeValue.toLowerCase();
      const publishFilteration =
        publishValue === "" ||
        (file.userId === parseInt(localStorage.getItem("id") ?? "1") &&
          publishValue === FILES_PAGE_CONSTANTS.publishValueText);

      let dateFilteration;
      if (startDateValue !== "" && endDateValue !== "") {
        const startDate = new Date(startDateValue);
        const endDate = new Date(endDateValue);
        endDate.setDate(endDate.getDate() + 1);
        const fileDate = new Date(file.createdOn);

        dateFilteration = fileDate >= startDate && fileDate <= endDate;
      } else if (startDateValue === "" && endDateValue === "") {
        dateFilteration = true;
      } else {
        dateFilteration = false;
      }
      return typeFilteration && publishFilteration && dateFilteration;
    });

    setFilteredFilesData(filteredResponse);
  };

  const handleFetchingData = async () => {
    const responseData = await fileData();
    setFilesData(responseData?.files);
    setFilteredFilesData(responseData?.files);
  };

  const handlePdf = (id: number, name: string) => {
    navigate(`${id}/${name}`);
  };

  useEffect(() => {
    handleFetchingData();
  }, []);

  return (
    <Home
      Sidebar={<SideBar selectedItem={FILES_PAGE_CONSTANTS.pageHeader} />}
      Header={<Header />}
      Content={
        <Stack width={"100%"}>
          <TopHeaderBox>
            <MuiTypography
              text={FILES_PAGE_CONSTANTS.pageHeader}
              typoVariant="h2"
            />
            <UploadFromCloud />
          </TopHeaderBox>
          <FiltersBox>
            <SubFiltersBox>
              <Dropdown
                menuOpen={isFileTypeMenuOpen}
                options={fileTypeOptions}
                placeholder={FILES_PAGE_CONSTANTS.fileTypePlaceholder}
                header={FILES_PAGE_CONSTANTS.fileTypePlaceholder}
                value={fileType}
                handleChange={handleFileTypeChange}
                handleClear={handleFileTypeClear}
                handleMenu={handleMenuOpen}
              />
              <DateSelector
                label={FILES_PAGE_CONSTANTS.startDateLabel}
                date={startDate}
                setDate={handleStartDate}
                open={isStartDateOpen}
                setOpen={setIsStartDateOpen}
                maxDate={endDate}
                minDate="1 January 1996"
              />
              <DateSelector
                label={FILES_PAGE_CONSTANTS.endDateLabel}
                date={endDate}
                setDate={handleEndDate}
                open={isEndDateOpen}
                setOpen={setIsEndDateOpen}
                minDate={startDate}
              />
              <Dropdown
                menuOpen={isPublishMenuOpen}
                options={publishOptions}
                placeholder={FILES_PAGE_CONSTANTS.publishSettingPlaceholder}
                header={FILES_PAGE_CONSTANTS.publishSettingHeader}
                value={publishSetting}
                handleChange={handlePublishChange}
                handleClear={handlePublishClear}
                handleMenu={handlePublishMenuOpen}
              />
            </SubFiltersBox>
            <MenuBox>
              <RevelantBox>
                <Icon
                  src={SwapIcon}
                  alt={FILES_PAGE_CONSTANTS.swapIconAltText}
                />
                <MuiTypography
                  text={FILES_PAGE_CONSTANTS.mostRevelantText}
                  typoVariant="body1"
                />
                <Icon
                  src={ChevronIcon}
                  alt={FILES_PAGE_CONSTANTS.chevronIconAltText}
                />
              </RevelantBox>
              <Icon
                src={Toggle}
                alt={FILES_PAGE_CONSTANTS.toggleBoxAltText}
                height="36px"
              />
            </MenuBox>
          </FiltersBox>
          <TabsBox>
            <Tabs tabs={tabsOne} {...fileTabsProps} onTabSelect={() => {}} />
            <CustomDivider />
          </TabsBox>
          {!isEmpty(filteredFilesData) ? (
            <FilesContainer>
              {filteredFilesData
                .slice()
                .reverse()
                .map((card) => (
                  <FileCard
                    key={card.fileId}
                    handleDoubleClick={() => {
                      handlePdf(card.userId, card.fileName);
                    }}
                    pdfImage={Agreement}
                    data-testid={`file-card-${card.fileId}`}
                    fileName={card.fileName}
                  />
                ))}
            </FilesContainer>
          ) : (
            <NoFilesContainer>
              <Icon
                src={NoFileIcon}
                alt={FILES_PAGE_CONSTANTS.notAvailableAltText}
              />
              <MuiTypography
                text={FILES_PAGE_CONSTANTS.noFilesText}
                typoVariant="subtitle1"
              />
            </NoFilesContainer>
          )}
        </Stack>
      }
    />
  );
};

export default FilesBrowsingScreen;
