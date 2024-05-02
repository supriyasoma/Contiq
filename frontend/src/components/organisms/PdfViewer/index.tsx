import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  SyntheticEvent,
} from "react";
import WebViewer from "@pdftron/pdfjs-express";
import { Box, styled } from "@mui/material";
import { DEFAULT_ZOOM, MAX_ZOOM, MIN_ZOOM } from "../../../utils/constants";
import theme from "../../../theme";
import IconWithTypography from "../../molecules/IconWithTypography";
import MuiTypography from "../../atoms/Typograpy";
import BackIcon from "/public/assets/icons/backIcon.svg";
import { Icon } from "../../atoms/Icons";
import Pagination from "../../molecules/Pagination";
import { SearchPopUp } from "../../molecules/SearchPopUp";
import { pdfStyle } from "./pdfStyles";
import { useNavigate } from "react-router-dom";

export interface PdfViewerProps {
  fileName: string;
  searchKey?: string;
  fileRender: string;
}

const RootBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

const TopBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  padding: `${theme.spacing(7)} ${theme.spacing(6)}`,
}));

const HeadBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-end",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
  cursor: "pointer",
}));

const IconBox = styled(Box)({
  cursor: "pointer",
});

const WebViewerBox = styled(Box)({
  height: "90vh",
});

const PaginationBox = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(5),
  zIndex: 25,
  left: "50%",
  transform: "translateX(-50%)",
}));

const SearchBox = styled(Box)({
  position: "absolute",
  right: theme.spacing(6),
});

const CustomBackIcon = styled(Icon)({
  width: "0.625rem",
  height: "0.9375rem",
});
export type InstanceType = {
  UI?: any;
  Core?: any;
  setPageLabels?: any;
  docViewer?: any;
  Annotations?: any;
};

const PdfViewer = ({ fileName, searchKey, fileRender }: PdfViewerProps) => {
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [resultsPageNumber, setResultsPageNumber] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(
    resultsPageNumber[0] ?? 1
  );
  const [currentZoomLevel, setCurrentZoomLevel] =
    useState<number>(DEFAULT_ZOOM);
  const [docViewerState, setDocViewerState] = useState<{
    getZoomLevel: () => number;
    getPageCount: () => number;
    getCurrentPage: () => number;
    zoomTo: (zoomLevel: number) => void;
    setCurrentPage: (pageNum: number) => void;
  }>({
    getZoomLevel: () => DEFAULT_ZOOM,
    getPageCount: () => 1,
    getCurrentPage: () => 1,
    zoomTo: () => Object,
    setCurrentPage: (pageNum: number) => Object,
  });
  const [isAccordionOpen, setIsAccordionOpen] = useState<boolean>(true);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [matchedSentenceIndex, setMatchedSentenceIndex] = useState<number>(0);
  const navigate = useNavigate();

  const handleAccordion = (event: Event | SyntheticEvent<any, Event>) => {
    event.stopPropagation();
    setIsAccordionOpen(!isAccordionOpen);
  };

  const handleSnackbarOpen = (event: Event | SyntheticEvent<any, Event>) => {
    event.stopPropagation();
    setIsSnackbarOpen(true);
    if (searchKey) {
      navigator.clipboard?.writeText(searchResults[matchedSentenceIndex]);
    }
    setTimeout(() => setIsSnackbarOpen(false), 1000);
  };

  const handleSnackbarClose = (event: Event | SyntheticEvent<any, Event>) => {
    if (event) {
      event.stopPropagation();
    }
    setIsSnackbarOpen(false);
  };

  const upArrowClick = (event: Event | SyntheticEvent<any, Event>) => {
    event.stopPropagation();
    if (matchedSentenceIndex <= 0) {
      setMatchedSentenceIndex(0);
    } else {
      setMatchedSentenceIndex(matchedSentenceIndex - 1);
      docViewerState.setCurrentPage(
        resultsPageNumber[matchedSentenceIndex - 1]
      );
    }
  };

  const downArrowClick = (event: Event | SyntheticEvent<any, Event>) => {
    event.stopPropagation();
    if (matchedSentenceIndex >= searchResults.length - 1) {
      setMatchedSentenceIndex(searchResults.length - 1);
    } else {
      setMatchedSentenceIndex(matchedSentenceIndex + 1);
      docViewerState.setCurrentPage(
        resultsPageNumber[matchedSentenceIndex + 1]
      );
    }
  };

  const getFileNameWithoutExtension = (fileName: string): string => {
    const index = fileName.lastIndexOf(".");
    return index !== -1 ? fileName.substring(0, index) : fileName;
  };

  const handleBackIcon = () => {
    navigate(-1);
  };

  const handleZoom = useCallback(
    (newZoomLevel: number) => {
      newZoomLevel = Math.min(Math.max(newZoomLevel, MIN_ZOOM), MAX_ZOOM);
      setCurrentZoomLevel(newZoomLevel);
      docViewerState.zoomTo(newZoomLevel);
    },
    [docViewerState]
  );

  const handleZoomIn = useCallback(() => {
    handleZoom(currentZoomLevel - 0.05);
  }, [currentZoomLevel, handleZoom]);

  const handleZoomOut = useCallback(() => {
    handleZoom(currentZoomLevel + 0.05);
  }, [currentZoomLevel, handleZoom]);

  const setDocumentViewerColors = (docViewer: any) => {
    docViewer.setSearchHighlightColors({
      searchResult: "rgba(255,215,73,0.25)",
      activeSearchResult: "rgba(255,215,73,0.25)",
    });
  };

  const addPageNumberUpdatedListener = (docViewer: any) => {
    docViewer.addEventListener("pageNumberUpdated", (pageNumber: number) => {
      setCurrentPage(pageNumber);
    });
  };

  const handleDocumentLoadedEvent = async (
    instance: any,
    documentViewer: any
  ) => {
    setDocViewerState(documentViewer);
    const searchPattern = `(?:^|(?<=[.!?\\s]))\\s*(["']?)(?:\\.)?\\s*((?:[^.!?]*\\b${searchKey}\\w*\\b[^.!?]*[^A-Za-z0-9\\s])|[^.!?]*\\b${searchKey}\\w*\\b)`;
    instance.UI.addSearchListener(searchListener);

    instance.UI.searchTextFull(searchPattern, {
      regex: true,
      wholeWord: true,
    });
  };

  const handleDocumentLoaded = (instance: InstanceType) => {
    const { docViewer, UI } = instance;

    if (docViewer && UI) {
      const iframeDoc = UI.iframeWindow.document;
      UI.openElements(["leftPanel"]);

      setDocumentViewerColors(docViewer);
      addPageNumberUpdatedListener(docViewer);

      docViewer.addEventListener("documentLoaded", async () => {
        await handleDocumentLoadedEvent(instance, docViewer);
      });

      const iframeStyle = document.createElement("style");
      iframeStyle.innerHTML = pdfStyle;
      iframeDoc.head.appendChild(iframeStyle);
    }
  };

  const searchListener = function (
    searchValue: string,
    options: any,
    results: any
  ) {
    const pageNumberResults = results.map(
      (element: { pageNum: number }) => element.pageNum
    );
    const dhResults = results.map((element: { QL: any }) => element.QL);
    setSearchResults(dhResults);
    setResultsPageNumber(pageNumberResults);
  };

  useEffect(() => {
    const webViewerElement = viewerRef.current;
    const webViewerIframe = document.querySelector(
      "iframe[title='webviewer']"
    ) as HTMLIFrameElement;

    webViewerIframe === null &&
      WebViewer(
        {
          path: "/webviewer",
          initialDoc: fileRender,
          disabledElements: [
            "ribbons",
            "toolsHeader",
            "header",
            "leftPanelTabs",
            "thumbnailsSizeSlider",
            "leftPanelResizeBar",
            "contextMenuPopup",
            "textPopup",
            "pageNavOverlay",
            "searchPanel",
          ],
        },
        webViewerElement
      ).then(handleDocumentLoaded);
  }, [searchKey, fileRender]);

  return (
    <RootBox data-testid="Pdf-viewer">
      <TopBox>
        <HeadBox>
          <IconWithTypography
            IconComponent={
              <CustomBackIcon
                src={BackIcon}
                alt="BackIcon"
                onClick={handleBackIcon}
              />
            }
            TextComponent={
              <MuiTypography
                text={fileName}
                typoVariant="h2"
                sx={{ color: theme.palette.text.black }}
              />
            }
            gap={"1.25rem"}
            direction={"row"}
            alignDirection="center"
          />
        </HeadBox>
        {searchKey ? (
          <SearchBox>
            <SearchPopUp
              pageOf={currentPage}
              numberOfPages={docViewerState.getPageCount()}
              fileName={getFileNameWithoutExtension(fileName)}
              searchedWord={searchKey}
              searchedResultsList={searchResults}
              isAccordionOpen={isAccordionOpen}
              accordionClick={handleAccordion}
              copy={isSnackbarOpen}
              openSnackBar={handleSnackbarOpen}
              closeSnackBar={handleSnackbarClose}
              matchedIndex={matchedSentenceIndex}
              currentWord={
                searchResults.length === 0 ? 0 : matchedSentenceIndex + 1
              }
              upArrowClick={upArrowClick}
              downArrowClick={downArrowClick}
            />
          </SearchBox>
        ) : null}
      </TopBox>
      <Box>
        <WebViewerBox data-testid="webviewer" ref={viewerRef}></WebViewerBox>
      </Box>
      <PaginationBox>
        <Pagination
          currentPage={currentPage}
          totalPages={docViewerState.getPageCount()}
          zoomValue={Math.round(currentZoomLevel * 100)}
          zoomIn={handleZoomIn}
          zoomOut={handleZoomOut}
        />
      </PaginationBox>
    </RootBox>
  );
};

export default PdfViewer;
