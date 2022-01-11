export declare type FileType = {
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
export declare function openDocumentTree(persist?: boolean): Promise<FileType>;
/**
 * Open Document picker to create a file at the user specified location.
 * @param fileName Name of the file to create.
 * @param mime mime of the file to create. eg image/jpeg
 * @param data Data to write to the file once it is created.
 * @param encoding Encoding of the dat you are writing.
 */
export declare function createDocument(fileName: string, mime: string, data: string, encoding?: "utf8" | "base64" | "ascii"): Promise<FileType>;
/**
 * Open Document picker for the user to select a file.
 * @param readData Do you want to read data from the user specified file?
 * @param encoding Encoding for the file you are reading.
 */
export declare function openDocument(readData?: boolean, encoding?: "utf8" | "base64" | "ascii"): Promise<FileType>;
/**
 * There is a limit to the number of uri permissions your app can persist. Get a list of all the persisted document tree uris so you are remove the ones you are not using or perform other operations.
 */
export declare function getPersistedUriPermissions(): Promise<string[]>;
/**
 * Remove a uri from persisted uri list.
 * @param uri The uri you want to remove from persisted uri permissions.
 */
export declare function releasePersistableUriPermission(uri: string): Promise<void>;
/**
 * List all files and folders in a directory uri
 * @param uri Path to a directory.
 */
export declare function listFiles(uri: string): Promise<FileType[]>;
/**
 * Read file at a given path. The path of the file must be a document tree uri.
 * @param uri Path to the file you want to read.
 * @param encoding Encoding for the file you are reading.
 */
export declare function readFile(uri: string, encoding?: "utf8" | "base64" | "ascii"): Promise<string>;
/**
 * Rename a file or directory at the given path.
 * @param uri Path to the file or directory to rename
 * @param name New name for the file or directory
 */
export declare function rename(uri: string, name: string): Promise<string>;
/**
 * Delete a file or directory at the given path.
 * @param uri Path to the file or directory to delete
 */
export declare function deleteFile(uri: string): Promise<boolean>;
/**
 * Create a directory at the given path.
 * @param path Uri of the parent directory
 * @param dirName Name of the new directory
 */
export declare function createDirectory(uri: string, dirName: string): Promise<FileType>;
/**
 * Write to a file at the give directory. If the file does not exist, it will be created.
 * @param path Uri of the directory
 * @param fileName Name of the file
 * @param mime Mime of the file. eg image/jpeg
 * @param data Data you want to write
 * @param encoding Encoding of the data you are writing.
 * @param append Should the data be appended to the existing data in file?
 */
export declare function writeFile(uri: string, fileName: string, mime: string, data: string, encoding?: "utf8" | "base64" | "ascii", append?: boolean): Promise<string>;
/**
 * Create a new file at the given directory.
 * @param path Uri of the parent directory
 * @param fileName Name of the new file.
 * @param mime Mime type of the file, e.g. image/jpeg
 */
export declare function createFile(uri: string, fileName: string, mime: string): Promise<FileType>;
/**
 * Get details for a file/directory at a given uri.
 * @param path Uri of the parent directory
 */
export declare function stat(uri: string): Promise<any>;
//# sourceMappingURL=index.d.ts.map