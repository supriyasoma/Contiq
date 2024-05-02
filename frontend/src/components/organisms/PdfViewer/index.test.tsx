import { render, screen, fireEvent } from "@testing-library/react";
import PdfViewer from ".";
const longText = `
Lorem ipsum dolor sit amet, consectetur pdf adipiscing elit. Proin nec ex a justo bibendum lacinia. 

Suspendisse potenti. Sed et quam luctus, dictum pdf leo ac, accumsan odio. Nulla facilisi. 

Cras bibendum urna et justo dictum, vitae bibendum nulla dictum
`;

const mockPdfFile = new File([longText], "sample.pdf", {
  type: "application/pdf",
});

jest.mock("../../../../public/files/sample.pdf", () => {
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
    });
  });
});

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("PdfViewer", () => {
  let mockProps: { fileName: string; fileRender: string };

  beforeEach(() => {
    mockProps = {
      fileName: "SampleFile.pdf",
      fileRender: "../../../../public/files/sample.pdf",
    };
  });

  it("should render PdfViewer component with file name", () => {
    render(<PdfViewer {...mockProps} />);
    const fileNameElement = screen.getByText(/SampleFile.pdf/);
    expect(fileNameElement).toBeInTheDocument();
  });

  it("should check the zoom in and zoom out", () => {
    render(<PdfViewer {...mockProps} />);
    const initialZoomValue = screen.getByText("85%");
    expect(initialZoomValue).toBeInTheDocument();
    fireEvent.click(screen.getByAltText("minus"));
    expect(screen.getByText("80%")).toBeInTheDocument();
    fireEvent.click(screen.getByAltText("plus"));
    expect(initialZoomValue).toBeInTheDocument();
  });

  it("should click on the arrows to change the matched sentence", () => {
    render(<PdfViewer {...mockProps} searchKey="pdf" />);
    fireEvent.click(screen.getByTestId("custom-accordion"));
    expect(screen.getByAltText("Line Icon")).toBeInTheDocument();
    fireEvent.click(screen.getByAltText("down-arrow"));
    expect(screen.getByAltText("down-arrow")).toBeInTheDocument();
    fireEvent.click(screen.getByAltText("up-arrow"));
    expect(screen.getByAltText("up-arrow")).toBeInTheDocument();
  });

  it("should copy the matched sentence", () => {
    render(<PdfViewer {...mockProps} searchKey="pdf" />);
    fireEvent.click(screen.getByTestId("custom-accordion"));
    expect(screen.getByAltText("Line Icon")).toBeInTheDocument();
    fireEvent.click(screen.getByAltText("copyIcon"));
    expect(screen.getByText("Text copied")).toBeInTheDocument();
    fireEvent.click(screen.getByAltText("closeIcon"));
    expect(screen.getByText("Text copied")).toBeInTheDocument();
  });

  it("should click on the back button", () => {
    render(<PdfViewer {...mockProps} searchKey="pdf" />);
    fireEvent.click(screen.getByAltText("BackIcon"));
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
