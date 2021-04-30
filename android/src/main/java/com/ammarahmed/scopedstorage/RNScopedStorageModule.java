
package com.ammarahmed.scopedstorage;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class RNScopedStorageModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public RNScopedStorageModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNScopedStorage";
  }

  @ReactMethod
  public void setItem(String key, String value, Promise promise) {
   
  }

  

  

}