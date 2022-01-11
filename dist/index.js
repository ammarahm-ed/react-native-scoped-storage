var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { NativeModules } from "react-native";
var RNScopedStorage = NativeModules.RNScopedStorage;
/**
 * Open the Document Picker to select a folder. Read/Write Permission will be granted to the selected folder.
 */
export function openDocumentTree(persist) {
    if (persist === void 0) { persist = false; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, RNScopedStorage.openDocumentTree(persist)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
/**
 * Open Document picker to create a file at the user specified location.
 * @param fileName Name of the file to create.
 * @param mime mime of the file to create. eg image/jpeg
 * @param data Data to write to the file once it is created.
 * @param encoding Encoding of the dat you are writing.
 */
export function createDocument(fileName, mime, data, encoding) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, RNScopedStorage.createDocument(fileName, mime, data, encoding || "utf8")];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
/**
 * Open Document picker for the user to select a file.
 * @param readData Do you want to read data from the user specified file?
 * @param encoding Encoding for the file you are reading.
 */
export function openDocument(readData, encoding) {
    if (readData === void 0) { readData = false; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, RNScopedStorage.openDocument(readData, encoding || "utf8")];
        });
    });
}
/**
 * There is a limit to the number of uri permissions your app can persist. Get a list of all the persisted document tree uris so you are remove the ones you are not using or perform other operations.
 */
export function getPersistedUriPermissions() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, RNScopedStorage.getPersistedUriPermissions()];
        });
    });
}
/**
 * Remove a uri from persisted uri list.
 * @param uri The uri you want to remove from persisted uri permissions.
 */
export function releasePersistableUriPermission(uri) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            RNScopedStorage.releasePersistableUriPermission(uri);
            return [2 /*return*/];
        });
    });
}
/**
 * List all files and folders in a directory uri
 * @param uri Path to a directory.
 */
export function listFiles(uri) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, RNScopedStorage.listFiles(uri)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
/**
 * Read file at a given path. The path of the file must be a document tree uri.
 * @param uri Path to the file you want to read.
 * @param encoding Encoding for the file you are reading.
 */
export function readFile(uri, encoding) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, RNScopedStorage.readFile(uri, encoding || "utf8")];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
/**
 * Rename a file or directory at the given path.
 * @param uri Path to the file or directory to rename
 * @param name New name for the file or directory
 */
export function rename(uri, name) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, RNScopedStorage.rename(uri, name)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
/**
 * Delete a file or directory at the given path.
 * @param uri Path to the file or directory to delete
 */
export function deleteFile(uri) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, RNScopedStorage["delete"](uri)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
/**
 * Create a directory at the given path.
 * @param path Uri of the parent directory
 * @param dirName Name of the new directory
 */
export function createDirectory(uri, dirName) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, RNScopedStorage.createDirectory(uri, dirName)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
/**
 * Write to a file at the give directory. If the file does not exist, it will be created.
 * @param path Uri of the directory
 * @param fileName Name of the file
 * @param mime Mime of the file. eg image/jpeg
 * @param data Data you want to write
 * @param encoding Encoding of the data you are writing.
 * @param append Should the data be appended to the existing data in file?
 */
export function writeFile(uri, fileName, mime, data, encoding, append) {
    if (append === void 0) { append = false; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, RNScopedStorage.writeFile(uri, fileName, mime, data, encoding || "utf8", append)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
/**
 * Create a new file at the given directory.
 * @param path Uri of the parent directory
 * @param fileName Name of the new file.
 * @param mime Mime type of the file, e.g. image/jpeg
 */
export function createFile(uri, fileName, mime) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, RNScopedStorage.createFile(uri, fileName, mime)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
/**
 * Get details for a file/directory at a given uri.
 * @param path Uri of the parent directory
 */
export function stat(uri) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, RNScopedStorage.stat(uri)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
