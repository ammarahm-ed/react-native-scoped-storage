package com.ammarahmed.scopedstorage;

import android.annotation.TargetApi;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.UriPermission;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.os.ParcelFileDescriptor;
import android.util.Base64;
import android.util.Log;

import androidx.annotation.RequiresApi;
import androidx.core.content.ContextCompat;
import androidx.documentfile.provider.DocumentFile;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Nullable;

public class RNScopedStorageModule extends ReactContextBaseJavaModule {

    private static final String PATH_TREE = "tree";
    private static final String PRIMARY_TYPE = "primary";
    private static final String RAW_TYPE = "raw";
    private static ReactApplicationContext reactContext = null;
    ActivityEventListener activityEventListener;
    private int REQUEST_CODE = 27867;

    public RNScopedStorageModule(ReactApplicationContext rc) {
        super(reactContext);
        reactContext = rc;
    }

    /**
     * @param uri
     * @return file path of Uri
     */
    public static String getDirectoryPathFromUri(Context context, Uri uri) {

        if ("file".equals(uri.getScheme())) {
            return uri.getPath();
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT
                && isTreeUri(uri)) {

            String treeId = getTreeDocumentId(uri);

            if (treeId != null) {


                String[] paths = treeId.split(":");
                String type = paths[0];
                String subPath = paths.length == 2 ? paths[1] : "";

                if (RAW_TYPE.equalsIgnoreCase(type)) {
                    return treeId.substring(treeId.indexOf(File.separator));
                } else if (PRIMARY_TYPE.equalsIgnoreCase(type)) {
                    return Environment.getExternalStorageDirectory() + File.separator + subPath;
                } else {
                    StringBuilder path = new StringBuilder();
                    String[] pathSegment = treeId.split(":");
                    if (pathSegment.length == 1) {
                        path.append(getRemovableStorageRootPath(context, paths[0]));
                    } else {
                        String rootPath = getRemovableStorageRootPath(context, paths[0]);
                        path.append(rootPath).append(File.separator).append(pathSegment[1]);
                    }

                    return path.toString();
                }
            }
        }
        return null;
    }

    private static String getRemovableStorageRootPath(Context context, String storageId) {
        StringBuilder rootPath = new StringBuilder();
        File[] externalFilesDirs = ContextCompat.getExternalFilesDirs(context, null);
        for (File fileDir : externalFilesDirs) {
            if (fileDir.getPath().contains(storageId)) {
                String[] pathSegment = fileDir.getPath().split(File.separator);
                for (String segment : pathSegment) {
                    if (segment.equals(storageId)) {
                        rootPath.append(storageId);
                        break;
                    }
                    rootPath.append(segment).append(File.separator);
                }
                break;
            }
        }
        return rootPath.toString();
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    public static List<String> getListRemovableStorage(Context context) {

        List<String> paths = new ArrayList<>();

        File[] externalFilesDirs = ContextCompat.getExternalFilesDirs(context, null);
        for (File fileDir : externalFilesDirs) {
            if (Environment.isExternalStorageRemovable(fileDir)) {
                String path = fileDir.getPath();
                if (path.contains("/Android")) {
                    paths.add(path.substring(0, path.indexOf("/Android")));
                }
            }
        }

        return paths;
    }

    public static String getTreeDocumentId(Uri uri) {
        final List<String> paths = uri.getPathSegments();
        if (paths.size() >= 2 && PATH_TREE.equals(paths.get(0))) {
            return paths.get(1);
        }
        return null;
    }

    public static boolean isTreeUri(Uri uri) {
        final List<String> paths = uri.getPathSegments();
        return (paths.size() == 2 && PATH_TREE.equals(paths.get(0)));
    }

    /**
     * String to byte converter method
     *
     * @param data     Raw data in string format
     * @param encoding Decoder name
     * @return Converted data byte array
     */
    private static byte[] stringToBytes(String data, String encoding) {
        if (encoding.equalsIgnoreCase("ascii")) {
            return data.getBytes(Charset.forName("US-ASCII"));
        } else if (encoding.toLowerCase().contains("base64")) {
            return Base64.decode(data, Base64.NO_WRAP);

        } else if (encoding.equalsIgnoreCase("utf8")) {
            return data.getBytes(Charset.forName("UTF-8"));
        }
        return data.getBytes(Charset.forName("US-ASCII"));
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("ON_PERMISSION_GRANTED", "onPermissionGranted");
        return constants;
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    @Override
    public String getName() {
        return "RNScopedStorage";
    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    @ReactMethod
    public void openDocumentTree(final Promise promise) {

        try {

        Intent intent = new Intent();
        intent.setAction(Intent.ACTION_OPEN_DOCUMENT_TREE);


        if (activityEventListener != null) {
            reactContext.removeActivityEventListener(activityEventListener);
            activityEventListener = null;
        }
        activityEventListener = new ActivityEventListener() {
            @Override
            public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
                if (requestCode == REQUEST_CODE && resultCode == Activity.RESULT_OK) {
                    if (data != null) {
                        Uri uri = data.getData();

                        final int takeFlags = data.getFlags()
                                & (Intent.FLAG_GRANT_READ_URI_PERMISSION
                                | Intent.FLAG_GRANT_WRITE_URI_PERMISSION);
                        reactContext.getContentResolver().takePersistableUriPermission(uri, takeFlags);
                        DocumentFile dir = DocumentFile.fromTreeUri(reactContext, uri);
                        WritableMap params = Arguments.createMap();
                        params.putString("uri", uri.toString());
                        params.putString("name", dir.getName());
                        params.putString("path", getDirectoryPathFromUri(reactContext, uri));
                        params.putString("type", dir.isDirectory() ? "directory" : "file");
                        params.putDouble("lastModified", dir.lastModified());
                        promise.resolve(params);
                    }
                }
                reactContext.removeActivityEventListener(activityEventListener);
                activityEventListener = null;
            }

            @Override
            public void onNewIntent(Intent intent) {

            }
        };

        reactContext.addActivityEventListener(activityEventListener);
        reactContext.getCurrentActivity().startActivityForResult(intent, REQUEST_CODE);

    } catch(Exception e) {
        promise.reject("ERROR",e.getMessage());
    }
    }


    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    @ReactMethod
    public void createDocument(final String fileName, final String mimeType, final String data, final String encoding, final Promise promise) {
        try {



        Intent intent = new Intent();
        intent.setAction(Intent.ACTION_CREATE_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType("*/*");

        if (activityEventListener != null) {
            reactContext.removeActivityEventListener(activityEventListener);
            activityEventListener = null;
        }
        activityEventListener = new ActivityEventListener() {
            @Override
            public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
                if (requestCode == REQUEST_CODE && resultCode == Activity.RESULT_OK) {
                    if (intent != null) {
                        Uri uri = intent.getData();

                        final int takeFlags = intent.getFlags()
                                & (Intent.FLAG_GRANT_READ_URI_PERMISSION
                                | Intent.FLAG_GRANT_WRITE_URI_PERMISSION);
                        //reactContext.getContentResolver().takePersistableUriPermission(uri, takeFlags);
                        DocumentFile dir = DocumentFile.fromTreeUri(reactContext, uri);
                        DocumentFile file = dir.createFile(mimeType, fileName);
                        try {
                            ParcelFileDescriptor descriptor = null;
                            descriptor = reactContext.getContentResolver().openFileDescriptor(file.getUri(), "rw");
                            byte[] bytes = stringToBytes(data, encoding);
                            FileOutputStream fout = new FileOutputStream(descriptor.getFileDescriptor());
                            try {
                                fout.write(bytes);
                            } finally {
                                fout.close();
                                descriptor.close();
                            }

                        } catch (FileNotFoundException e) {
                            e.printStackTrace();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }

                        WritableMap params = Arguments.createMap();
                        params.putString("uri", dir.getUri().toString());
                        params.putString("name", dir.getName());
                        params.putString("type", dir.isDirectory() ? "directory" : "file");
                        if (dir.isFile()) {
                            params.putString("mime", dir.getType());
                        }
                        params.putDouble("lastModified", dir.lastModified());
                        promise.resolve(params);
                    }
                }
                reactContext.removeActivityEventListener(activityEventListener);
                activityEventListener = null;
            }

            @Override
            public void onNewIntent(Intent intent) {

            }
        };
        reactContext.addActivityEventListener(activityEventListener);
        reactContext.getCurrentActivity().startActivityForResult(intent, REQUEST_CODE);

        } catch(Exception e) {
            promise.reject("ERROR",e.getMessage());
        }
    }


    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    @ReactMethod
    public void openDocument(final boolean readData, final String encoding, final Promise promise) {

        try {



        Intent intent = new Intent();
        intent.setAction(Intent.ACTION_OPEN_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType("*/*");

        if (activityEventListener != null) {
            reactContext.removeActivityEventListener(activityEventListener);
            activityEventListener = null;
        }
        activityEventListener = new ActivityEventListener() {
            @Override
            public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
                if (requestCode == REQUEST_CODE && resultCode == Activity.RESULT_OK) {
                    if (data != null) {
                        Uri uri = data.getData();
                        final int takeFlags = data.getFlags()
                                & (Intent.FLAG_GRANT_READ_URI_PERMISSION
                                | Intent.FLAG_GRANT_WRITE_URI_PERMISSION);
                        //reactContext.getContentResolver().takePersistableUriPermission(uri, takeFlags);
                        DocumentFile dir = DocumentFile.fromSingleUri(reactContext, uri);
                        WritableMap params = Arguments.createMap();
                        params.putString("uri", uri.toString());
                        params.putString("name", dir.getName());
                        params.putString("path", getDirectoryPathFromUri(reactContext, uri));
                        params.putString("type", dir.isDirectory() ? "directory" : "file");

                        if (dir.isFile()) {
                            params.putString("mime", dir.getType());
                        }
                        params.putDouble("lastModified", dir.lastModified());
                        if (readData) {
                            try {
                                if (encoding != null) {
                                    if (encoding == "ascii") {
                                        WritableArray arr = (WritableArray) readFromUri(uri, encoding);
                                        params.putArray("data", arr);
                                    } else {
                                        params.putString("data", (String) readFromUri(uri, encoding));
                                    }
                                } else {
                                    params.putString("data", (String) readFromUri(uri, "utf8"));
                                }
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        }

                        promise.resolve(params);

                    }
                }
                reactContext.removeActivityEventListener(activityEventListener);
                activityEventListener = null;
            }

            @Override
            public void onNewIntent(Intent intent) {

            }
        };
        reactContext.addActivityEventListener(activityEventListener);
        reactContext.getCurrentActivity().startActivityForResult(intent, REQUEST_CODE);

        } catch(Exception e) {
            promise.reject("ERROR",e.getMessage());
        }


    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    @ReactMethod
    public void getPersistedUriPermissions(Promise promise) {

        List<UriPermission> uriList = reactContext.getContentResolver().getPersistedUriPermissions();

        WritableArray array = Arguments.createArray();
        if (uriList.size() != 0) {
            for (UriPermission uriPermission : uriList) {
                array.pushString(uriPermission.getUri().toString());
            }
        }
        promise.resolve(array);
    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    @ReactMethod
    public void releasePersistableUriPermission(String uri) {

        Uri uriToRevoke = Uri.parse(uri);

        final int takeFlags = (Intent.FLAG_GRANT_READ_URI_PERMISSION
                | Intent.FLAG_GRANT_WRITE_URI_PERMISSION);
        reactContext.getContentResolver().releasePersistableUriPermission(uriToRevoke, takeFlags);
    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    public boolean hasPermission(String string) {
        // list of all persisted permissions for our app
        List<UriPermission> uriList = reactContext.getContentResolver().getPersistedUriPermissions();

        for (UriPermission uriPermission : uriList) {
            String uriString = uriPermission.getUri().toString();
            if (string.startsWith(uriString) && uriPermission.isReadPermission() && uriPermission.isWritePermission()) {
                return true;
            }
        }
        return false;
    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    public DocumentFile mkdir(String path) {
        String baseUri = "";
        String appendUri = "";
        String[] strings = new String[0];

        List<UriPermission> uriList = reactContext.getContentResolver().getPersistedUriPermissions();

        for (UriPermission uriPermission : uriList) {
            String uriString = uriPermission.getUri().toString();
            if (path.startsWith(uriString) && uriPermission.isReadPermission() && uriPermission.isWritePermission()) {
                baseUri = uriString;
                appendUri = path.substring(uriString.length());
                strings = appendUri.split("/");
            }
        }

        Uri uri = Uri.parse(baseUri);
        DocumentFile dir = DocumentFile.fromTreeUri(reactContext, uri);

        for (String string : strings) {
            if (!string.equals("")) {
                DocumentFile childDir = dir.findFile(string);
                if (childDir != null) {
                    dir = childDir;
                } else {
                    dir = dir.createDirectory(string);
                }
            }
        }

        return dir;
    }


    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    private Object readFromUri(Uri uri, String encoding) throws IOException {
        byte[] bytes;
        int bytesRead;
        int length;

        InputStream inputStream =
                reactContext.getContentResolver().openInputStream(uri);

        length = inputStream.available();
        bytes = new byte[length];
        bytesRead = inputStream.read(bytes);
        inputStream.close();

        switch (encoding.toLowerCase()) {
            case "base64":
                return Base64.encodeToString(bytes, Base64.NO_WRAP);
            case "ascii":
                WritableArray asciiResult = Arguments.createArray();
                for (byte b : bytes) {
                    asciiResult.pushInt((int) b);
                }
                return asciiResult;
            case "utf8":
            default:
                return new String(bytes);
        }


    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    @ReactMethod
    public void listFiles(String path, final Promise promise) {
        try {
            boolean hasPermission = hasPermission(path);
            if (!hasPermission) {
                promise.reject("ENOENT", "'" + path + "'does not have permission to read/write");
                return;
            }
            DocumentFile dir = DocumentFile.fromTreeUri(reactContext, Uri.parse(path));
            Log.d("PATH", dir.getUri().toString() + path);

           //  if (dir.getUri().toString() != path) {
           //     dir = mkdir(path);
           // }
            if (!dir.isDirectory()) {
                promise.reject("ENOENT", "'" + path + "'is not a directory.");
                return;
            }

            DocumentFile[] files = dir.listFiles();

            WritableArray array = Arguments.createArray();
            for (DocumentFile file : files) {
                WritableMap fileMap = Arguments.createMap();
                fileMap.putString("uri", file.getUri().toString());
                fileMap.putString("name", file.getName());
                fileMap.putString("type", file.isDirectory() ? "directory" : "file");
                if (file.isFile()) {
                    fileMap.putString("mime", file.getType());
                }
                fileMap.putDouble("lastModified", file.lastModified());

                array.pushMap(fileMap);
            }
            promise.resolve(array);
        } catch (Exception e) {
            promise.reject("EUNSPECIFIED", e.getLocalizedMessage());
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    @ReactMethod
    public void readFile(String path, String encoding, final Promise promise) {
        try {
            boolean hasPermission = hasPermission(path);
            if (!hasPermission) {
                promise.reject("ENOENT", "'" + path + "'does not have permission to read/write");
                return;
            }
            DocumentFile dir = DocumentFile.fromTreeUri(reactContext, Uri.parse(path));

            if (!dir.isFile()) {
                promise.reject("ENOENT", "'" + path + "'is not a file");
                return;
            }
            Uri uri = Uri.parse(path);

            if (encoding != null) {
                if (encoding == "ascii") {
                    WritableArray arr = (WritableArray) readFromUri(uri, encoding);
                    promise.resolve((arr));
                } else {
                    promise.resolve((String) readFromUri(uri, encoding));
                }
            } else {
                promise.resolve((String) readFromUri(uri, "utf8"));
            }
        } catch (Exception e) {
            promise.reject("EUNSPECIFIED", e.getLocalizedMessage());
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    @ReactMethod
    public void rename(String uriString, String name, final Promise promise) {
        try {
            boolean hasPermission = hasPermission(uriString);
            if (!hasPermission) {
                promise.reject("ENOENT", "'" + uriString + "'does not have permission to read/write");
                return;
            }
            DocumentFile dir = DocumentFile.fromTreeUri(reactContext, Uri.parse(uriString));
            dir.renameTo(name);
            promise.resolve(dir.getUri().toString());
        } catch (Exception e) {
            promise.reject("EUNSPECIFIED", e.getLocalizedMessage());
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    @ReactMethod
    public void delete(String path, final Promise promise) {
        try {
            boolean hasPermission = hasPermission(path);
            if (!hasPermission) {
                promise.reject("ENOENT", "'" + path + "'does not have permission to read/write");
                return;
            }
            DocumentFile dir = DocumentFile.fromTreeUri(reactContext, Uri.parse(path));
            dir.delete();
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("EUNSPECIFIED", e.getLocalizedMessage());
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    @ReactMethod
    public void writeFile(String path, String mimeType, String fileName, String data, String encoding, final boolean append, final Promise promise) {
        try {
            int written;
            boolean hasPermission = hasPermission(path);

            if (!hasPermission) {
                promise.reject("ENOENT", "'" + path + "'does not have permission to read/write");
                return;
            }

            DocumentFile dir = DocumentFile.fromTreeUri(reactContext, Uri.parse(path));

            if (!dir.getUri().toString().equals(path)) {
                dir = mkdir(path);
            }

            DocumentFile file = dir.findFile(fileName);
            if (file == null) {
                file = dir.createFile(mimeType, fileName);
            } else {
                if (append) {
                    data = data + readFromUri(file.getUri(), "utf8");
                } else {
                    file.delete();
                    file = dir.createFile(mimeType, fileName);
                }
            }

            if (!file.exists()) {
                promise.reject("ENOENT", "File could not be created");

                return;
            }

            ParcelFileDescriptor descriptor = reactContext.getContentResolver().openFileDescriptor(file.getUri(), "rw");
            byte[] bytes = stringToBytes(data, encoding);
            FileOutputStream fout = new FileOutputStream(descriptor.getFileDescriptor());
            try {
                fout.write(bytes);
                written = bytes.length;
            } finally {
                fout.close();
                descriptor.close();
            }
            promise.resolve(written);
        } catch (FileNotFoundException e) {
            promise.reject("ENOENT", "'" + path + "' does not exist and could not be created, or it is a directory");
        } catch (Exception e) {
            promise.reject("EUNSPECIFIED", e.getLocalizedMessage());
        }
    }


}