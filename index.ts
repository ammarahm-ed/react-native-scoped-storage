import { NativeModules } from "react-native";

const { RNScopedStorage } = NativeModules;

export type FileType = {
  /**Document Tree Uri for the file or directory*/
  uri: string;
  /** Name of the file or directory*/
  name: string;
  /**Storage path for the file*/
  path: string;

  type: "file" | "directory";
  /** Last modified date of the file or directory */
  lastModified: number;
  /** data read from the file */
  data: string;
  /** mime type of the file */
  mime: string;
};

/**
 * Open the Document Picker to select a folder. Read/Write Permission will be granted to the selected folder.
 */
export async function openDocumentTree(persist = false): Promise<FileType> {
  return await RNScopedStorage.openDocumentTree(persist);
}

/**
 * Open Document picker to create a file at the user specified location.
 * @param fileName Name of the file to create.
 * @param mime mime of the file to create. eg image/jpeg
 * @param data Data to write to the file once it is created.
 * @param encoding Encoding of the dat you are writing.
 */
export async function createDocument(
  fileName: string,
  mime: string,
  data: string,
  encoding?: "utf8" | "base64" | "ascii"
): Promise<FileType> {
  return await RNScopedStorage.createDocument(
    fileName,
    mime,
    data,
    encoding || "utf8"
  );
}

/**
 * Open Document picker for the user to select a file.
 * @param readData Do you want to read data from the user specified file?
 * @param encoding Encoding for the file you are reading.
 */
export async function openDocument(
  readData = false,
  encoding?: "utf8" | "base64" | "ascii"
): Promise<FileType> {
  return RNScopedStorage.openDocument(readData, encoding || "utf8");
}

/**
 * There is a limit to the number of uri permissions your app can persist. Get a list of all the persisted document tree uris so you are remove the ones you are not using or perform other operations.
 */
export async function getPersistedUriPermissions(): Promise<string[]> {
  return RNScopedStorage.getPersistedUriPermissions();
}

/**
 * Remove a uri from persisted uri list.
 * @param uri The uri you want to remove from persisted uri permissions.
 */
export async function releasePersistableUriPermission(uri: string) {
  RNScopedStorage.releasePersistableUriPermission(uri);
}

/**
 * List all files and folders in a directory uri
 * @param uri Path to a directory.
 */
export async function listFiles(uri: string): Promise<FileType[]> {
  return await RNScopedStorage.listFiles(uri);
}

/**
 * Read file at a given path. The path of the file must be a document tree uri.
 * @param uri Path to the file you want to read.
 * @param encoding Encoding for the file you are reading.
 */
export async function readFile(
  uri: string,
  encoding?: "utf8" | "base64" | "ascii"
): Promise<string> {
  return await RNScopedStorage.readFile(uri, encoding || "utf8");
}

/**
 * Rename a file or directory at the given path.
 * @param uri Path to the file or directory to rename
 * @param name New name for the file or directory
 */
export async function rename(uri: string, name: string): Promise<string> {
  return await RNScopedStorage.rename(uri, name);
}
/**
 * Delete a file or directory at the given path.
 * @param uri Path to the file or directory to delete
 */
export async function deleteFile(uri: string): Promise<boolean> {
  return await RNScopedStorage.delete(uri);
}
/**
 * Create a directory at the given path.
 * @param path Uri of the parent directory
 * @param dirName Name of the new directory
 */
export async function createDirectory(
  uri: string,
  dirName: string
): Promise<FileType> {
  return await RNScopedStorage.createDirectory(uri, dirName);
}
/**
 * Write to a file at the give directory. If the file does not exist, it will be created.
 * @param path Uri of the directory
 * @param data Data you want to write
 * @param fileName Name of the file (Optional if writing to an existing file)
 * @param mime Mime of the file. eg image/jpeg  (Optional if writing to an existing file)
 * @param encoding Encoding of the data you are writing.
 * @param append Should the data be appended to the existing data in file?
 */
export async function writeFile(
  uri: string,
  data: string,
  fileName?: string,
  mime?: string,
  encoding?: "utf8" | "base64" | "ascii",
  append = false
): Promise<string> {
  return await RNScopedStorage.writeFile(
    uri,
    fileName,
    mime,
    data,
    encoding || "utf8",
    append
  );
}
/**
 * Create a new file at the given directory.
 * @param path Uri of the parent directory
 * @param fileName Name of the new file.
 * @param mime Mime type of the file, e.g. image/jpeg
 */
export async function createFile(
  uri: string,
  fileName: string,
  mime: string
): Promise<FileType> {
  return await RNScopedStorage.createFile(uri, fileName, mime);
}

/**
 * Create a new file at the given directory.
 * @param source Source file (Supports file:// & content:// uris)
 * @param destination Destination file (Supports file:// & content:// uris)
 * @param mime Callback to recieve final result
 */
export async function copyFile(
  source: string,
  destination: string,
  callback: () => void
) {
  RNScopedStorage.copyFile(source, destination, callback);
}

/**
 * Get details for a file/directory at a given uri.
 * @param path Uri of the parent directory
 */
export async function stat(uri: string) {
  return await RNScopedStorage.stat(uri);
}
