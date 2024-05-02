import theme from "../../../theme";

export const pdfStyle = `.document-content-container,
.LeftPanel,
.content {
  background-color: ${theme.palette.text.white};
}
#Thumbnail-container {
  height: ${theme.spacing(100)} !important;  
  width: ${theme.spacing(75)} !important;    
  border-radius: ${theme.spacing(0.5)};
  margin:  ${theme.spacing(1)},  ${theme.spacing(2)};
}
.Thumbnail .page-label {
  display: none;
}
.Thumbnail .page-image{
  height:19vh !important;
  width:9vw !important;
}
.left-panel-container {
  width: 100%;
  padding: 0 !important
}
.Thumbnail.active .container .page-image {
  border:  ${theme.spacing(0.5)} solid ${theme.palette.primary.main};
}
::-webkit-scrollbar-track{
  background-color: ${theme.palette.grays.gray600};
  width: ${theme.spacing(3.5)};
  border-radius: ${theme.spacing(3)};
}
::-webkit-scrollbar-thumb {
  background-color: ${theme.palette.grays.gray100};
  border-radius: ${theme.spacing(4)};
  height: ${theme.spacing(49)};
  width: ${theme.spacing(1.5)};
}
`;
