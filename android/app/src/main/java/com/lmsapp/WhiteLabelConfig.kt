package com.lmsapp
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class WhiteLabelConfig(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val appName: String = reactContext
        .applicationContext
        .resources
        .getString(R.string.app_name)

    override fun getName(): String {
        return "WhiteLabelConfig"
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun getAppName(): String {
        return appName
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun getPrimaryColor(): String {
        return "#fdf6e3"
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun getPrimaryTextColor(): String {
        return "#657b83"
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun getGreetingText(): String {
        return "Welcome"
    }
}
