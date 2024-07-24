import { google, drive_v3 } from "googleapis";
import { GOOGLE_DRIVE_KEY_FILE_NAME } from "../utils/env";

const KEYFILEPATH = GOOGLE_DRIVE_KEY_FILE_NAME;
const SCOPES: string[] = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/drive.apps.readonly",
  "https://www.googleapis.com/auth/drive.appdata",
  "https://www.googleapis.com/auth/drive.appfolder",
  "https://www.googleapis.com/auth/drive.metadata",
];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const drive = google.drive({ version: "v3", auth });

export const DriveService = {
  fileExistsInDirectory: async (
    fileName: string,
    parentDirId: string
  ): Promise<boolean> => {
    try {
      const response = await drive.files.list({
        q: `'${parentDirId}' in parents and mimeType = 'application/pdf' and trashed = false`,
        fields: "files(id, name, mimeType)",
        supportsAllDrives: true,
        includeItemsFromAllDrives: true,
      });

      const files = response.data.files || [];

      if (files.map((file) => file.name).includes(fileName)) return true;

      return false;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error in fileExistsInDirectory:", error);
        throw new Error(
          `Failed to check if file exists in directory: ${error.message}`
        );
      } else {
        console.error("An unknown error occurred:", error);
        throw new Error(
          "Failed to check if file exists in directory due to an unknown error."
        );
      }
    }
  },

  createDuplicateInDirectory: async (
    fileId: string,
    parentDirId: string
  ): Promise<void> => {
    try {
      // create a copy of the file
      const copyResponse = await drive.files.copy({
        fileId: fileId,
        fields: "id, parents",
      });
      const duplicateFileId = copyResponse.data.id;
      const duplicateFileParents = copyResponse.data.parents?.join(",");
      if (!!!duplicateFileId || !!!duplicateFileParents) throw new Error();

      // move the copied file to the specified folder
      await drive.files.update({
        fileId: duplicateFileId,
        addParents: parentDirId,
        removeParents: duplicateFileParents,
        fields: "id, parents",
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error in createDuplicateInDirectory:", error);
        throw new Error(
          `Failed to create duplicate in directory: ${error.message}`
        );
      } else {
        console.error("An unknown error occurred:", error);
        throw new Error(
          "Failed to create duplicate in directory due to an unknown error."
        );
      }
    }
  },

  getDirectories: async (
    parentDirId: string
  ): Promise<drive_v3.Schema$File[]> => {
    try {
      const response = await drive.files.list({
        q: `'${parentDirId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
        fields: "files(id, name, mimeType)",
        supportsAllDrives: true,
        includeItemsFromAllDrives: true,
      });

      const directories = response.data.files || [];
      return directories;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error in getDirectories:", error);
        throw new Error(`Failed to get directories: ${error.message}`);
      } else {
        console.error("An unknown error occurred:", error);
        throw new Error("Failed to get directories due to an unknown error.");
      }
    }
  },

  getPdfFiles: async (parentDirId: string): Promise<drive_v3.Schema$File[]> => {
    try {
      const response = await drive.files.list({
        q: `'${parentDirId}' in parents and mimeType = 'application/pdf' and trashed = false`,
        fields: "files(id, name, mimeType)",
        supportsAllDrives: true,
        includeItemsFromAllDrives: true,
      });

      const files = response.data.files || [];
      return files;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error in getFiles:", error);
        throw new Error(`Failed to get files: ${error.message}`);
      } else {
        console.error("An unknown error occurred:", error);
        throw new Error("Failed to get files due to an unknown error.");
      }
    }
  },

  createDirectory: async (
    folderName: string,
    parentFolderId: string
  ): Promise<drive_v3.Schema$File> => {
    try {
      const fileMetadata = {
        name: folderName,
        mimeType: "application/vnd.google-apps.folder",
        parents: [parentFolderId],
      };

      const response = await drive.files.create({
        requestBody: fileMetadata,
        fields: "id, name",
      });

      if (!!!response) throw new Error();

      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error in createDirectory:", error);
        throw new Error(`Failed to create directory: ${error.message}`);
      } else {
        console.error("An unknown error occurred:", error);
        throw new Error("Failed to create directory due to an unknown error.");
      }
    }
  },
};
