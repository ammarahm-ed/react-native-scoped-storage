# react-native-scoped-storage
<a href="https://github.com/ammarahm-ed/react-native-scoped-storage/pulls" target="_blank">
<img  src="https://img.shields.io/badge/PRs-welcome-green?color=blue&style=flat-square"/>
</a>
<a href="https://www.npmjs.com/package/react-native-scoped-storage" target="_blank">
<img src="https://img.shields.io/npm/v/react-native-scoped-storage?color=orange&style=flat-square"/>
</a>

Starting in Android 11, apps that use the scoped storage model can access only their own app-specific cache files. As soon as React Native targets API 30, all of us will have to use Scoped Storage to access any files stored in the sdcard/phone storage. This library provides an API for react-native devs to start testing out scoped storage in their apps. Remember, you do not need `WRITE_EXTERNAL_STORAGE` permission in you `AndroidManifest.xml` file using this library. 

Scoped storage allows you to prompt the user that you need access to some file/folders. The user can the allow access to their desired location. It is your responsibility to store the uri you recieve for later use.

**Important note**: Until React Native targets API 29, you do not need this library. However you should start testing it out in your apps/projects because soon, we will have to move to this new API for file access.

## Getting started
Install the library

```bash
yarn add react-native-scoped-storage
```
or
```bash
npm install react-native-scoped-storage
```

## Table of contents

### Type aliases

- [FileType](#filetype)

### Functions

- [createDirectory](#createdirectory)
- [createDocument](#createdocument)
- [deleteFile](#deletefile)
- [getPersistedUriPermissions](#getpersisteduripermissions)
- [listFiles](#listfiles)
- [openDocument](#opendocument)
- [openDocumentTree](#opendocumenttree)
- [readFile](#readfile)
- [releasePersistableUriPermission](#releasepersistableuripermission)
- [rename](#rename)
- [writeFile](#writefile)

## Type aliases

### FileType

Ƭ **FileType**: *object*

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | *string* | data read from the file |
| `lastModified` | *number* | Last modified date of the file or directory |
| `mime` | *string* | mime type of the file |
| `name` | *string* | Name of the file or directory |
| `path` | *string* | Storage path for the file |
| `type` | ``"file"`` \| ``"directory"`` | - |
| `uri` | *string* | Document Tree Uri for the file or directory |

Defined in: [index.tsx:5](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/15e8070/index.tsx#L5)

## Functions

### createDirectory

▸ **createDrectory**(`parent`: *string*, `displayName`: *string*): *Promise*<[*FileType*](#filetype)\>

Create a new directory under a parent uri.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parent` | *string* | Uri of the parent directory |
| `displayName` | *string* | Name of the directory to create |

**Returns:** *Promise*<[*FileType*](#filetype)\>

Defined in: [index.tsx:111](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/5d965cb/index.tsx#L111)

___

### createDocument

▸ **createDocument**(`fileName`: *string*, `mime`: *string*, `data`: *string*, `encoding`: ``"utf8"`` \| ``"base64"`` \| ``"ascii"``): *Promise*<[*FileType*](#filetype)\>

Open Document picker to create a file at the user specified location.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileName` | *string* | Name of the file to create. |
| `mime` | *string* | mime of the file to create. eg image/jpeg |
| `data` | *string* | Data to write to the file once it is created. |
| `encoding` | ``"utf8"`` \| ``"base64"`` \| ``"ascii"`` | Encoding of the dat you are writing. |

**Returns:** *Promise*<[*FileType*](#filetype)\>

Defined in: [index.tsx:37](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/15e8070/index.tsx#L37)

___

### deleteFile

▸ **deleteFile**(`uri`: *string*): *Promise*<boolean\>

Delete a file or directory at the given path.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `uri` | *string* | Path to the file or directory to delete |

**Returns:** *Promise*<boolean\>

Defined in: [index.tsx:99](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/15e8070/index.tsx#L99)

___

### getPersistedUriPermissions

▸ **getPersistedUriPermissions**(): *Promise*<string[]\>

There is a limit to the number of uri permissions your app can persist. Get a list of all the persisted document tree uris so you are remove the ones you are not using or perform other operations.

**Returns:** *Promise*<string[]\>

Defined in: [index.tsx:54](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/15e8070/index.tsx#L54)

___

### listFiles

▸ **listFiles**(`uri`: *string*): *Promise*<[*FileType*](#filetype)[]\>

List all files and folders in a directory uri

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `uri` | *string* | Path to a directory. |

**Returns:** *Promise*<[*FileType*](#filetype)[]\>

Defined in: [index.tsx:72](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/15e8070/index.tsx#L72)

___

### openDocument

▸ **openDocument**(`readData`: *boolean*): *Promise*<[*FileType*](#filetype)\>

Open Document picker for the user to select a file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readData` | *boolean* | Do you want to read data from the user specified file? |

**Returns:** *Promise*<[*FileType*](#filetype)\>

Defined in: [index.tsx:46](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/15e8070/index.tsx#L46)

___

### openDocumentTree

▸ **openDocumentTree**(): *Promise*<[*FileType*](#filetype)\>

Open the Document Picker to select a folder. Read/Write Permission will be granted to the selected folder.

**Returns:** *Promise*<[*FileType*](#filetype)\>

Defined in: [index.tsx:25](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/15e8070/index.tsx#L25)

___

### readFile

▸ **readFile**(`uri`: *string*): *Promise*<string\>

Read file at a given path. The path of the file must be a document tree uri.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `uri` | *string* | Path to the file you want to read. |

**Returns:** *Promise*<string\>

Defined in: [index.tsx:81](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/15e8070/index.tsx#L81)

___

### releasePersistableUriPermission

▸ **releasePersistableUriPermission**(`uri`: *string*): *Promise*<void\>

Remove a uri from persisted uri list.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `uri` | *string* | The uri you want to remove from persisted uri permissions. |

**Returns:** *Promise*<void\>

Defined in: [index.tsx:63](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/15e8070/index.tsx#L63)

___

### rename

▸ **rename**(`uri`: *string*, `name`: *string*): *Promise*<string\>

Rename a file or directory at the given path.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `uri` | *string* | Path to the file or directory to rename |
| `name` | *string* | New name for the file or directory |

**Returns:** *Promise*<string\>

Defined in: [index.tsx:91](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/15e8070/index.tsx#L91)

___

### writeFile

▸ **writeFile**(`fileName`: *string*, `mime`: *string*, `data`: *string*, `encoding`: ``"utf8"`` \| ``"base64"`` \| ``"ascii"``, `append`: *boolean*): *Promise*<boolean\>

Write to a file at the given directory. If the file does not exist, it will be created.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileName` | *string* | Name of the file |
| `mime` | *string* | Mime of the file. eg image/jpeg |
| `data` | *string* | Data you want to write |
| `encoding` | ``"utf8"`` \| ``"base64"`` \| ``"ascii"`` | Encoding of the data you are writing. |
| `append` | *boolean* | Should the data be appended to the existing data in file? |

**Returns:** *Promise*<boolean\>

Defined in: [index.tsx:112](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/15e8070/index.tsx#L112)

## Thanks to 
- [rn-fetch-blob](https://github.com/joltup/rn-fetch-blob) for the amazing library. Some part of code is taken from there.

## I want to contribute
That is awesome news! There is alot happening at a very fast pace in this library right now. Every little help is precious. You can contribute in many ways:

- Suggest code improvements on native iOS and Android
- If you have suggestion or idea you want to discuss, open an issue.
- [Open an issue](https://github.com/ammarahm-ed/react-native-scoped-storage/issues/) if you want to make a pull request, and tell me what you want to improve or add so we can discuss

## License
This library is licensed under the [MIT license](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/master/LICENSE).

Copyright © Ammar Ahmed ([@ammarahm-ed](https://github.com/ammarahm-ed))

#
<a href="https://notesnook.com" target="_blank">
<img style="align:center;" src="https://i.imgur.com/EMIqXNc.jpg" href="https://notesnook.com" alt="Notesnook Logo" width="50%" />
</a>
