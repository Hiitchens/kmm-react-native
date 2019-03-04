package com.shoutemapp;

import android.os.Bundle;
import android.content.Intent;
import com.facebook.react.ReactActivity;
//NativeModuleInjectionMark-mainActivity-import
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        //NativeModuleInjectionMark-mainActivity-onCreate
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Kmm";
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        //NativeModuleInjectionMark-mainActivity-onActivityResult
        super.onActivityResult(requestCode, resultCode, data);
        //NativeModuleInjectionMark-mainActivity-onActivityResult-end
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }
}
