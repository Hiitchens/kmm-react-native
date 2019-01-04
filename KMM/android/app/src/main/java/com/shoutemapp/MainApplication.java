package com.shoutemapp;

import android.support.multidex.MultiDexApplication;

import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.ReactApplication;
import com.RNFetchBlob.RNFetchBlobPackage;
import org.wonday.pdf.RCTPdfView;
import com.shoutem.webview.ShoutemWebViewExtensionPackage;
import com.shoutem.places.ShoutemPlacesExtensionPackage;
import com.shoutem.icalevents.ShoutemIcalEventsExtensionPackage;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import com.xxsnakerxx.flurryanalytics.FlurryAnalyticsPackage;
import com.shoutem.flurry.ShoutemFlurryExtensionPackage;
import com.shoutem.calendar.CalendarManagerPackage;
import com.shoutem.events.ShoutemEventsExtensionPackage;
import com.shoutem.cms.ShoutemCmsExtensionPackage;
import org.reactnative.camera.RNCameraPackage;
import com.shoutem.camera.ShoutemCameraExtensionPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.brentvatne.react.ReactVideoPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.actionsheet.ActionSheetPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.shoutem.application.ShoutemApplicationExtensionPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnative.photoview.PhotoViewPackage;
import com.shoutem.uiaddons.UiAddonsExtensionPackage;
//NativeModuleInjectionMark-mainApplication-import
import com.microsoft.codepush.react.CodePush;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;

import com.airbnb.android.react.maps.MapsPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends MultiDexApplication implements ReactApplication {
    //NativeModuleInjectionMark-mainApplication-body
    
    private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

    protected static CallbackManager getCallbackManager() {
      return mCallbackManager;
    }


    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        //NativeModuleInjectionMark-mainApplication-rnhost-body
        
protected String getJSBundleFile() {
  return CodePush.getJSBundleFile();
}


        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                //NativeModuleInjectionMark-mainApplication-getPackages
                new CodePush(null, getApplicationContext(), BuildConfig.DEBUG),
                new MapsPackage(),
                new MainReactPackage(),
            new RNFetchBlobPackage(),
            new RCTPdfView(),
            new ShoutemWebViewExtensionPackage(),
            new ShoutemPlacesExtensionPackage(),
            new ShoutemIcalEventsExtensionPackage(),
            new GoogleAnalyticsBridgePackage(),
            new FlurryAnalyticsPackage(),
            new ShoutemFlurryExtensionPackage(),
            new CalendarManagerPackage(),
            new ShoutemEventsExtensionPackage(),
            new ShoutemCmsExtensionPackage(),
            new RNCameraPackage(),
            new ShoutemCameraExtensionPackage(),
            new FBSDKPackage(mCallbackManager),
            new ReactVideoPackage(),
            new SplashScreenReactPackage(),
            new ReactNativeRestartPackage(),
            new ActionSheetPackage(),
            new RNDeviceInfo(),
            new ShoutemApplicationExtensionPackage(),
                new VectorIconsPackage(),
                new ImagePickerPackage(),
                new LinearGradientPackage(),
                new UiAddonsExtensionPackage(),

                new PhotoViewPackage()
            );
        }
    };

    protected String getJSMainModuleName() {
        return "index";
    }

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        //NativeModuleInjectionMark-mainApplication-oncreate-end
    }
}
