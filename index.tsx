import { NativeModules } from 'react-native';

const { RNScopedStorage } = NativeModules;

type FileType = {
    /**Document Tree Uri for the file or directory*/
    uri: string
    /** Name of the file or directory*/
    name: string
    /**Storage path for the file*/
    path: string

    type: "file" | "directory"
    /** Last modified date of the file or directory */
    lastModified: number
    /** data read from the file */
    data: string
    /** mime type of the file */
    mime: string
}

export async function openDocumentTree(): Promise<FileType> {
    return await RNScopedStorage.openDocumentTree()
}

export async function createDocument(fileName: string, mime: string, data: string, encoding: "utf8" | "base64" | "ascii"): Promise<FileType> {

    return await RNScopedStorage.createDocument(fileName, mime, data, encoding)
}

export async function openDocument(readData: boolean): Promise<FileType> {

    return RNScopedStorage.openDocument(readData)
}

export async function getPersistedUriPermissions(): Promise<string[]> {

    return RNScopedStorage.getPersistedUriPermissions()
}

export async function releasePersistableUriPermission(uri: string) {

    RNScopedStorage.releasePersistableUriPermission(uri)
}

export async function listFiles(uri:string):Promise<FileType[]> {

    return await RNScopedStorage.listFiles(uri);
}

export async function readFile(uri:string):Promise<string> {

    return await RNScopedStorage.readFile(uri);
}

export async function rename(uri:string,name:string):Promise<string> {

    return await RNScopedStorage.rename(uri,name);
}

export async function deleteFile(uri:string):Promise<boolean> {

    return await RNScopedStorage.delete(uri);
}

export async function writeFile(fileName: string, mime: string, data: string, encoding: "utf8" | "base64" | "ascii",append:boolean): Promise<boolean> {

    return await RNScopedStorage.writeFile(fileName, mime, data, encoding,append);

}


