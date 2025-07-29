package com.whitelabeldemo

import android.widget.Toast
import com.facebook.react.bridge.*
import java.util.*

class WhiteLabelConfig(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val appName = "Smavy"

    override fun getName(): String {
        return "WhiteLabelConfig"
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun getAppName(): String {
        return appName
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun getVariantName(): String {
        return "smavylms"
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun getVariantURL(): String {
        return "https://classroom.smavy.com"
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun getPrimaryColor(): String {
        return "#0E2877"
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun getPrimaryTextColor(): String {
        return "#FFD700"
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun getSplashCircleLogoSize(): String {
        return "250"
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun getStartedImageSize(): String {
        return "550"
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun getGreetingText(): String {
        return "Personalised Learning for Your Kids"
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun pass(): WritableMap {
        val colors = mapOf(
            "PRIMARY_COLOR" to "#0E2877",
            "PRIMARY_TEXT_COLOR" to "#0E2877",
            "DAY_1" to "#F98925",
            "DAY_2" to "#22b240",
            "DAY_3" to "#05b4bb",
            "DAY_4" to "#0E2877",
            "DAY_5" to "#3d3b67",
            "DAY_6" to "#12446c",
            "DAY_7" to "#3c4760",
            "CALANDER_ICON_COLOR" to "#324792",
            "THUMBNAIL_BG_COLOR" to "#20317F",
            "PRIMARY_DARK" to "#152156",
            "CYAN" to "#E38B01",
            "BLUE_LITE" to "#2196f370",
            "GREEN" to "#00a652",
            "GREEN_LITE" to "#7fa86150",
            "PURPLE2" to "#004bc0",
            "PURPLE_LITE" to "#9600DC",
            "PURPLE" to "purple",
            "GREY_LITE" to "#eee",
            "GREY_DARK" to "#7f7f82",
            "SHADOW_COLOR" to "rgba(193, 211, 251, 0.5)",
            "QUICK_LINK_1" to "#87CEEB",
            "QUICK_LINK_2" to "#41B3A3",
            "QUICK_LINK_3" to "#6BB1E1",
            "QUICK_LINK_4" to "#B8D7A3",
            "QUICK_LINK_5" to "#AAB2B4",
            "BACKGROUND" to "#E9EEFE",
            "GRADIENT_FIRST_COLOR" to "#0E287740",
            "PINCODE_FIRST" to "#0E2877",
            "PINCODE_SECOND" to "#90c5f4",
            "STUDENT_OVERALL_POINT_BG" to "#3d367bb5",
            "CLOCK2_ICON" to "#5F02FF",
            "CLOCK_ICON" to "#FF02C1",
            "CLASS_ICON" to "#000EF5",
            "PURPLE_ICON" to "purple",
            "PINK_LITE_ICON" to "#F500E9",
            "RED_DARK_ICON" to "#D50000",
            "PURPLE2_ICON" to "#9600DC",
            "BLUE_ICON" to "#0070BF",
            "ASSIGNED_CLASSES" to "#00c9c2",
            "ASSIGNED_CLASSES_BG" to "#29c2ab",
            "COURSES_COMPLETE" to "#0070BF",
            "COURSES_COMPLETE_BG" to "#399def",
            "ACTIVE_STUDENT" to "#548235",
            "ACTIVE_STUDENT_BG" to "#a3ba47",
            "ASSIGN_CLASS_ICONS_UNCHECK_ICON" to "#BBBBBB",
            "CARD_BORDER_COLOR" to "#ccc",
            "LIST_LIST_BORDER_COLOR" to "#888",
            "CHAT_INTERFACE_CHAT_RIGHT" to "#F9892540",
            "TAB_LABEL_ACTIVE" to "#004bc0",
            "TAB_LABEL_NOT_ACTIVE" to "#000000",
            "MODAL_TRANSPARENT_BG" to "rgba(0,0,0,0.7)",
            "NAVIGATION_DRAWER_HOME" to "#20317F",
            "NAVIGATION_DRAWER_COURSES" to "#21B441",
            "NAVIGATION_DRAWER_MESSAGES" to "#EB832D",
            "NAVIGATION_DRAWER_ATTENDANCE" to "#01B4BB",
            "NAVIGATION_DRAWER_KIOSK" to "#4075d3",
            "NAVIGATION_DRAWER_NOTIFICATION" to "#21B441",
            "NAVIGATION_DRAWER_ARTICLES" to "#0077CC",
            "NAVIGATION_DRAWER_REPORTS" to "#20317F",
            "NAVIGATION_DRAWER_TIME_TRACKER" to "#FF02C1",
            "NAVIGATION_DRAWER_LOGOUT" to "#c73434",
            "FARWARD_ICON_COLOR" to "#7f7f82"
        )

        val map = WritableNativeMap()
        colors.forEach { (key, value) ->
            map.putString(key, value)
        }
        return map
    }

    @ReactMethod
    fun print(message: String, duration: Int) {
        Toast.makeText(reactApplicationContext, message, duration).show()
        println("***********************************************************$message")
    }
}
