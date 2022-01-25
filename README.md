# react-native-scoped-storage
<a href="https://github.com/ammarahm-ed/react-native-scoped-storage/pulls" target="_blank">
<img  src="https://img.shields.io/badge/PRs-welcome-green?color=blue&style=flat-square"/>
</a>
<a href="https://www.npmjs.com/package/react-native-scoped-storage" target="_blank">
<img src="https://img.shields.io/npm/v/react-native-scoped-storage?color=orange&style=flat-square"/>
</a>

Since the release of Android 10, Google has made Scoped Storage the default way to access and read/write files on an Android device but up until Android 11, it was possible to override this by putting android:requestLegacyExternalStorage="true" in AndroidManifest.xml.

However, this is changing fast since the start of 2021. Google is enforcing all apps to use Scoped Storage to store or read files on a user's device. This library provides an API for react-native to use scoped storage in their apps. Scoped storage allows you to prompt the user that you need access to some file/folders. The user can the allow access to their desired location. It is your responsibility to store the uri you recieve for later use.  

Remember, you do not need `WRITE_EXTERNAL_STORAGE` permission in you `AndroidManifest.xml` file using this library. 

Until React Native targets API 29, you do not need this library. But if you are targeting API 30, it's not possible to access user's files and folders without scoped storage.

**Read my blog:** [Scoped Storage in React Native: New Android 10 API for File System Access](https://blog.notesnook.com/scoped-storage-in-react-native/)


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

- [FileType](modules.md#filetype)

### Functions

- [copyFile](modules.md#copyfile)
- [createDirectory](modules.md#createdirectory)
- [createDocument](modules.md#createdocument)
- [createFile](modules.md#createfile)
- [deleteFile](modules.md#deletefile)
- [getPersistedUriPermissions](modules.md#getpersisteduripermissions)
- [listFiles](modules.md#listfiles)
- [openDocument](modules.md#opendocument)
- [openDocumentTree](modules.md#opendocumenttree)
- [readFile](modules.md#readfile)
- [releasePersistableUriPermission](modules.md#releasepersistableuripermission)
- [rename](modules.md#rename)
- [stat](modules.md#stat)
- [writeFile](modules.md#writefile)

## Type aliases

### FileType

Ƭ **FileType**: `Object`

#### Type declaration

| Name           | Type                          | Description                                 |
|:---------------|:------------------------------|:--------------------------------------------|
| `data`         | `string`                      | data read from the file                     |
| `lastModified` | `number`                      | Last modified date of the file or directory |
| `mime`         | `string`                      | mime type of the file                       |
| `name`         | `string`                      | Name of the file or directory               |
| `path`         | `string`                      | Storage path for the file                   |
| `type`         | ``"file"`` \| ``"directory"`` | -                                           |
| `uri`          | `string`                      | Document Tree Uri for the file or directory |

#### Defined in

[index.ts:5](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/8e5a6b4/index.ts#L5)

## Functions

### copyFile

▸ **copyFile**(`source`, `destination`, `callback`): `Promise`<`void`\>

Create a new file at the given directory.

#### Parameters

| Name          | Type         | Description                                           |
|:--------------|:-------------|:------------------------------------------------------|
| `source`      | `string`     | Source file (Supports file:// & content:// uris)      |
| `destination` | `string`     | Destination file (Supports file:// & content:// uris) |
| `callback`    | () => `void` | -                                                     |

#### Returns

`Promise`<`void`\>

#### Defined in

[index.ts:170](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/8e5a6b4/index.ts#L170)

___

### createDirectory

▸ **createDirectory**(`uri`, `dirName`): `Promise`<[`FileType`](modules.md#filetype)\>

Create a directory at the given path.

#### Parameters

| Name      | Type     | Description               |
|:----------|:---------|:--------------------------|
| `uri`     | `string` | -                         |
| `dirName` | `string` | Name of the new directory |

#### Returns

`Promise`<[`FileType`](modules.md#filetype)\>

#### Defined in

[index.ts:117](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/8e5a6b4/index.ts#L117)

___

### createDocument

▸ **createDocument**(`fileName`, `mime`, `data`, `encoding?`): `Promise`<[`FileType`](modules.md#filetype)\>

Open Document picker to create a file at the user specified location.

#### Parameters

| Name        | Type                                      | Description                                   |
|:------------|:------------------------------------------|:----------------------------------------------|
| `fileName`  | `string`                                  | Name of the file to create.                   |
| `mime`      | `string`                                  | mime of the file to create. eg image/jpeg     |
| `data`      | `string`                                  | Data to write to the file once it is created. |
| `encoding?` | ``"utf8"`` \| ``"base64"`` \| ``"ascii"`` | Encoding of the dat you are writing.          |

#### Returns

`Promise`<[`FileType`](modules.md#filetype)\>

#### Defined in

[index.ts:36](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/8e5a6b4/index.ts#L36)

___

### createFile

▸ **createFile**(`uri`, `fileName`, `mime`): `Promise`<[`FileType`](modules.md#filetype)\>

Create a new file at the given directory.

#### Parameters

| Name       | Type     | Description                            |
|:-----------|:---------|:---------------------------------------|
| `uri`      | `string` | -                                      |
| `fileName` | `string` | Name of the new file.                  |
| `mime`     | `string` | Mime type of the file, e.g. image/jpeg |

#### Returns

`Promise`<[`FileType`](modules.md#filetype)\>

#### Defined in

[index.ts:155](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/8e5a6b4/index.ts#L155)

___

### deleteFile

▸ **deleteFile**(`uri`): `Promise`<`boolean`\>

Delete a file or directory at the given path.

#### Parameters

| Name  | Type     | Description                             |
|:------|:---------|:----------------------------------------|
| `uri` | `string` | Path to the file or directory to delete |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[index.ts:109](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/8e5a6b4/index.ts#L109)

___

### getPersistedUriPermissions

▸ **getPersistedUriPermissions**(): `Promise`<`string`[]\>

There is a limit to the number of uri permissions your app can persist. Get a list of all the persisted document tree uris so you are remove the ones you are not using or perform other operations.

#### Returns

`Promise`<`string`[]\>

#### Defined in

[index.ts:65](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/8e5a6b4/index.ts#L65)

___

### listFiles

▸ **listFiles**(`uri`): `Promise`<[`FileType`](modules.md#filetype)[]\>

List all files and folders in a directory uri

#### Parameters

| Name  | Type     | Description          |
|:------|:---------|:---------------------|
| `uri` | `string` | Path to a directory. |

#### Returns

`Promise`<[`FileType`](modules.md#filetype)[]\>

#### Defined in

[index.ts:81](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/8e5a6b4/index.ts#L81)

___

### openDocument

▸ **openDocument**(`readData?`, `encoding?`): `Promise`<[`FileType`](modules.md#filetype)\>

Open Document picker for the user to select a file.

#### Parameters

| Name        | Type                                      | Default value | Description                                            |
|:------------|:------------------------------------------|:--------------|:-------------------------------------------------------|
| `readData`  | `boolean`                                 | `false`       | Do you want to read data from the user specified file? |
| `encoding?` | ``"utf8"`` \| ``"base64"`` \| ``"ascii"`` | `undefined`   | Encoding for the file you are reading.                 |

#### Returns

`Promise`<[`FileType`](modules.md#filetype)\>

#### Defined in

[index.ts:55](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/8e5a6b4/index.ts#L55)

___

### openDocumentTree

▸ **openDocumentTree**(`persist?`): `Promise`<[`FileType`](modules.md#filetype)\>

Open the Document Picker to select a folder. Read/Write Permission will be granted to the selected folder.

#### Parameters

| Name      | Type      | Default value |
|:----------|:----------|:--------------|
| `persist` | `boolean` | `false`       |

#### Returns

`Promise`<[`FileType`](modules.md#filetype)\>

#### Defined in

[index.ts:25](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/8e5a6b4/index.ts#L25)

___

### readFile

▸ **readFile**(`uri`, `encoding?`): `Promise`<`string`\>

Read file at a given path. The path of the file must be a document tree uri.

#### Parameters

| Name        | Type                                      | Description                            |
|:------------|:------------------------------------------|:---------------------------------------|
| `uri`       | `string`                                  | Path to the file you want to read.     |
| `encoding?` | ``"utf8"`` \| ``"base64"`` \| ``"ascii"`` | Encoding for the file you are reading. |

#### Returns

`Promise`<`string`\>

#### Defined in

[index.ts:90](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/8e5a6b4/index.ts#L90)

___

### releasePersistableUriPermission

▸ **releasePersistableUriPermission**(`uri`): `Promise`<`void`\>

Remove a uri from persisted uri list.

#### Parameters

| Name  | Type     | Description                                                |
|:------|:---------|:-----------------------------------------------------------|
| `uri` | `string` | The uri you want to remove from persisted uri permissions. |

#### Returns

`Promise`<`void`\>

#### Defined in

[index.ts:73](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/8e5a6b4/index.ts#L73)

___

### rename

▸ **rename**(`uri`, `name`): `Promise`<`string`\>

Rename a file or directory at the given path.

#### Parameters

| Name   | Type     | Description                             |
|:-------|:---------|:----------------------------------------|
| `uri`  | `string` | Path to the file or directory to rename |
| `name` | `string` | New name for the file or directory      |

#### Returns

`Promise`<`string`\>

#### Defined in

[index.ts:102](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/8e5a6b4/index.ts#L102)

___

### stat

▸ **stat**(`uri`): `Promise`<`any`\>

Get details for a file/directory at a given uri.

#### Parameters

| Name  | Type     |
|:------|:---------|
| `uri` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[index.ts:182](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/8e5a6b4/index.ts#L182)

___

### writeFile

▸ **writeFile**(`uri`, `data`, `fileName?`, `mime?`, `encoding?`, `append?`): `Promise`<`string`\>

Write to a file at the give directory. If the file does not exist, it will be created.

#### Parameters

| Name        | Type                                      | Default value | Description                                                                |
|:------------|:------------------------------------------|:--------------|:---------------------------------------------------------------------------|
| `uri`       | `string`                                  | `undefined`   | -                                                                          |
| `data`      | `string`                                  | `undefined`   | Data you want to write                                                     |
| `fileName?` | `string`                                  | `undefined`   | Name of the file (Optional if writing to an existing file)                 |
| `mime?`     | `string`                                  | `undefined`   | Mime of the file. eg image/jpeg  (Optional if writing to an existing file) |
| `encoding?` | ``"utf8"`` \| ``"base64"`` \| ``"ascii"`` | `undefined`   | Encoding of the data you are writing.                                      |
| `append`    | `boolean`                                 | `false`       | Should the data be appended to the existing data in file?                  |

#### Returns

`Promise`<`string`\>

#### Defined in

[index.ts:132](https://github.com/ammarahm-ed/react-native-scoped-storage/blob/8e5a6b4/index.ts#L132)

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
