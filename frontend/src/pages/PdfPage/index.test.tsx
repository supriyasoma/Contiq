import React from "react";
import PDFPage from ".";
import { render, screen } from "@testing-library/react";
import { mockFileData, mockUserData } from "../../utils/constants";

jest.mock("axios");

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const longText = `
Lorem ipsum dolor sit amet, consectetur pdf adipiscing elit. Proin nec ex a justo bibendum lacinia. 

Suspendisse potenti. Sed et quam luctus, dictum pdf leo ac, accumsan odio. Nulla facilisi. 

Cras bibendum urna et justo dictum, vitae bibendum nulla dictum
`;

const mockPdfFile = new File([longText], "sample.pdf", {
  type: "application/pdf",
});

jest.mock("../../../public/files/sample.pdf", () => {
  return mockPdfFile;
});

jest.mock("@pdftron/pdfjs-express", () => {
  return jest.fn(() => {
    return Promise.resolve({
      Core: {
        documentViewer: {
          setSearchHighlightColors: jest.fn(),
          addEventListener: jest.fn(),
          setZoomLevel: jest.fn(),
        },
      },
      UI: {
        openElements: jest.fn(),
        iframeWindow: {
          document: {
            createElement: jest.fn(() => {
              return { innerHTML: "", appendChild: jest.fn() };
            }),
            head: { appendChild: jest.fn() },
          },
          addSearchListener: jest.fn(),
          searchTextFull: jest.fn(),
        },
      },
      searchListener: jest.fn(),
    });
  });
});

jest.mock("../../services/api.tsx", () => ({
  get: jest.fn().mockImplementation((url) => {
    if (url.includes("file")) {
      return Promise.resolve({
        data: mockFileData,
      });
    }
    if (url.includes("user")) {
      return Promise.resolve({
        data: mockUserData,
      });
    }
  }),
}));

describe("PdfPage", () => {
  it("should fetches and displays PDF file details", async () => {
    render(<PDFPage />);

    expect(screen.getByText("sample.pdf")).toBeInTheDocument();
  });
});
