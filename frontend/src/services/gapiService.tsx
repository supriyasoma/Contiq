import { gapi } from "gapi-script";
import { DISCOVERY_DOCS, SCOPE } from "../utils/constants";

export const initClient = () => {
  gapi.client
    .init({
      apiKey: process.env.REACT_APP_API_KEY,
      clientId: process.env.REACT_APP_CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPE,
    })
    .then(
      (data: any) => {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      },
      (error: any) => console.log(error)
    );
};

const updateSigninStatus = (isSignedIn: boolean) => {
  if (isSignedIn) {
    listFiles();
  } else {
    gapi.auth2.getAuthInstance().signIn();
  }
};

export const listFiles = async (searchTerm = null) => {
  try {
    const response = await gapi.client.drive.files.list({
      fields: "files",
    });
    const res = JSON.parse(response.body);
    const folderData = res.files.filter(
      (file: any) => file?.mimeType.split(".").pop()?.toLowerCase() === "folder"
    );
    const files = res.files.filter((file: any) =>
      file?.mimeType.split(".").pop()?.toLowerCase().includes("pdf")
    );

    const foldersWithFiles = folderData
      .filter((folder: any) =>
        files.some((file: any) => file.parents.includes(folder.id))
      )
      .map((folder: any) => ({
        folderName: folder.name,
        fileNames: files
          .filter((file: any) => file.parents.includes(folder.id))
          .map((file: any) => ({
            fileName: file.name,
            fileId: file.id,
          })),
      }));

    const folderOfFiles = folderData.filter((folder: any) =>
      files.some((file: any) => file.parents.includes(folder.id))
    );

    const folderNamesArray = folderOfFiles.map((file: any) => file.name);
    return { folderNamesArray, foldersWithFiles };
  } catch (error) {
    console.log(error);
    return { folderNames: [], foldersWithFiles: [] };
  }
};
