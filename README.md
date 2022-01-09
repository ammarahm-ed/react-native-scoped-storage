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

## How this works
Unlike regular file storage on android, scoped storage works differently in that you can only have access to those parts of user's phone storage where the user has allowed you to read/write. Let's see an example:

We will ask the user to give us permission to a folder on their phone were we can read/write data. This folder can be anywhere in the phone. For this purpose will will launch the phone's file manager

```js
import * as ScopedStorage from "react-native-scoped-storage"

let dir = await ScopedStorage.openDocumentTree(true);
```

Once the user selects a directory, we will recieve the information about the directory and its `uri`. Now we can use this `uri` to read/write.

```js
await ScopedStorage.writeFile(dir.uri,"myimage.png","image/png",imageData,"base64");

// We can store this directory in AsyncStorage for later use.
await AsyncStorage.setItem('userMediaDirectory',JSON.stringify(dir));
```
And later if we want to access the uris where we have access to read/write:
```js

// Get the directory we requested earlier
let dir = await AsyncStorage.getItem("userMediaDirectory");
dir = JSON.parse(dir);

// Get list of persisted Uris
const persistedUris = await ScopedStorage.getPersistedUriPermissions();

// Check if the directory uri exists in the list of uris where we have access to read/write.
if (persistedUris.indexOf(dir.uri) !== -1) {

    // If uri is found, we can proceed to write/read data.
    await ScopedStorage.writeFile(dir.uri,"myimage.png","image/png",imageData,"base64");
} else {
    // We can request for permission again and store the new directory if access has been revoked by user here.
}

```
### Asking for directory to store file everytime
This works similar to it does in the browser, if you try to save an image or any asset from the webpage, it will ask you for a location where this file should be stored everytime.

```js
import * as ScopedStorage from "react-native-scoped-storage"

let file = await ScopedStorage.createDocument("myimage.png","image/png",imageBase64Data,"base64");

// Remember that the returned file can have a different name than you provide because user can change it upon saving to a folder.
```


## Table of contents

### Type aliases

- [FileType](#filetype)

### Functions

- [createDirectory](#createdirectory)
- [createDocument](#createdocument)
- [createFile](#createfile)
- [deleteFile](#deletefile)
- [getPersistedUriPermissions](#getpersisteduripermissions)
- [listFiles](#listfiles)
- [openDocument](#opendocument)
- [openDocumentTree](#opendocumenttree)
- [readFile](#readfile)
- [releasePersistableUriPermission](#releasepersistableuripermission)
- [rename](#rename)
- [stat](#stat)
- [writeFile](#writefile)

## Type aliases

### FileType

Ƭ **FileType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `string` | data read from the file |
| `lastModified` | `number` | Last modified date of the file or directory |
| `mime` | `string` | mime type of the file |
| `name` | `string` | Name of the file or directory |
| `path` | `string` | Storage path for the file |
| `type` | ``"file"`` \| ``"directory"`` | - |
| `uri` | `string` | Document Tree Uri for the file or directory |

#### Defined in

[index.ts:6](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/fc6aac0/index.ts#L6)

## Functions

### createDirectory

▸ **createDirectory**(`path`, `dirName`): `Promise`<[`FileType`](#filetype)\>

Create a directory at the given path.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Uri of the parent directory |
| `dirName` | `string` | Name of the new directory |

#### Returns

`Promise`<[`FileType`](#filetype)\>

#### Defined in

[index.ts:111](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/fc6aac0/index.ts#L111)

___

### createDocument

▸ **createDocument**(`fileName`, `mime`, `data`, `encoding`): `Promise`<[`FileType`](#filetype)\>

Open Document picker to create a file at the user specified location.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileName` | `string` | Name of the file to create. |
| `mime` | `string` | mime of the file to create. eg image/jpeg |
| `data` | `string` | Data to write to the file once it is created. |
| `encoding` | ``"utf8"`` \| ``"base64"`` \| ``"ascii"`` | Encoding of the dat you are writing. |

#### Returns

`Promise`<[`FileType`](#filetype)\>

#### Defined in

[index.ts:38](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/fc6aac0/index.ts#L38)

___

### createFile

▸ **createFile**(`path`, `fileName`, `mime`): `Promise`<[`FileType`](#filetype)\>

Create a new file at the given directory.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Uri of the parent directory |
| `fileName` | `string` | Name of the new file. |
| `mime` | `string` | Mime type of the file, e.g. image/jpeg |

#### Returns

`Promise`<[`FileType`](#filetype)\>

#### Defined in

[index.ts:136](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/fc6aac0/index.ts#L136)

___

### deleteFile

▸ **deleteFile**(`uri`): `Promise`<`boolean`\>

Delete a file or directory at the given path.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `uri` | `string` | Path to the file or directory to delete |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[index.ts:102](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/fc6aac0/index.ts#L102)

___

### getPersistedUriPermissions

▸ **getPersistedUriPermissions**(): `Promise`<`string`[]\>

There is a limit to the number of uri permissions your app can persist. Get a list of all the persisted document tree uris so you are remove the ones you are not using or perform other operations.

#### Returns

`Promise`<`string`[]\>

#### Defined in

[index.ts:56](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/fc6aac0/index.ts#L56)

___

### listFiles

▸ **listFiles**(`uri`): `Promise`<[`FileType`](#filetype)[]\>

List all files and folders in a directory uri

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `uri` | `string` | Path to a directory. |

#### Returns

`Promise`<[`FileType`](#filetype)[]\>

#### Defined in

[index.ts:74](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/fc6aac0/index.ts#L74)

___

### openDocument

▸ **openDocument**(`readData`, `encoding`): `Promise`<[`FileType`](#filetype)\>

Open Document picker for the user to select a file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readData` | `boolean` | Do you want to read data from the user specified file? |
| `encoding` | ``"utf8"`` \| ``"base64"`` \| ``"ascii"`` | Encoding for the file you are reading. |

#### Returns

`Promise`<[`FileType`](#filetype)\>

#### Defined in

[index.ts:48](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/fc6aac0/index.ts#L48)

___

### openDocumentTree

▸ **openDocumentTree**(`persist`): `Promise`<[`FileType`](#filetype)\>

Open the Document Picker to select a folder. Read/Write Permission will be granted to the selected folder.

#### Parameters

| Name | Type |
| :------ | :------ |
| `persist` | `boolean` |

#### Returns

`Promise`<[`FileType`](#filetype)\>

#### Defined in

[index.ts:26](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/fc6aac0/index.ts#L26)

___

### readFile

▸ **readFile**(`uri`, `encoding`): `Promise`<`string`\>

Read file at a given path. The path of the file must be a document tree uri.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `uri` | `string` | Path to the file you want to read. |
| `encoding` | ``"utf8"`` \| ``"base64"`` \| ``"ascii"`` | Encoding for the file you are reading. |

#### Returns

`Promise`<`string`\>

#### Defined in

[index.ts:84](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/fc6aac0/index.ts#L84)

___

### releasePersistableUriPermission

▸ **releasePersistableUriPermission**(`uri`): `Promise`<`void`\>

Remove a uri from persisted uri list.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `uri` | `string` | The uri you want to remove from persisted uri permissions. |

#### Returns

`Promise`<`void`\>

#### Defined in

[index.ts:65](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/fc6aac0/index.ts#L65)

___

### rename

▸ **rename**(`uri`, `name`): `Promise`<`string`\>

Rename a file or directory at the given path.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `uri` | `string` | Path to the file or directory to rename |
| `name` | `string` | New name for the file or directory |

#### Returns

`Promise`<`string`\>

#### Defined in

[index.ts:94](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/fc6aac0/index.ts#L94)

___

### stat

▸ **stat**(`path`): `Promise`<`any`\>

Get details for a file/directory at a given uri.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Uri of the parent directory |

#### Returns

`Promise`<`any`\>

#### Defined in

[index.ts:145](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/fc6aac0/index.ts#L145)

___

### writeFile

▸ **writeFile**(`path`, `fileName`, `mime`, `data`, `encoding`, `append`): `Promise`<`string`\>

Write to a file at the give directory. If the file does not exist, it will be created.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Uri of the directory |
| `fileName` | `string` | Name of the file |
| `mime` | `string` | Mime of the file. eg image/jpeg |
| `data` | `string` | Data you want to write |
| `encoding` | ``"utf8"`` \| ``"base64"`` \| ``"ascii"`` | Encoding of the data you are writing. |
| `append` | `boolean` | Should the data be appended to the existing data in file? |

#### Returns

`Promise`<`string`\>

#### Defined in

[index.ts:125](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/fc6aac0/index.ts#L125)

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
