package com.whitelabeldemo
import android.widget.Toast
import com.facebook.react.bridge.*
import java.util.HashMap

class WhiteLabelConfig(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val appName: String = "Calimatic EdTech"

    override fun getName(): String {
        return "WhiteLabelConfig"
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun getAppName(): String {
        return appName
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun getVariantName(): String {
        return "calimaticlms"
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun getVariantURL(): String {
        return "Default"
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun getPrimaryColor(): String {
        return "#0076FF"
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun getPrimaryTextColor(): String {
        return "#FFD700"
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun getSplashCircleLogoSize(): String {
        return "200"
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun getStartedImageSize(): String {
        return "400"
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun getGreetingText(): String {
        return "Bring Agility to Learning Institutions"
    }

    @ReactMethod
    fun print(message: String, duration: Int) {
        Toast.makeText(reactApplicationContext, message, duration).show()
        println("***********************************************************$message")
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun pass(): WritableMap {
        val hm = hashMapOf(
            "PRIMARY_COLOR" to "#004BC0",
            "PRIMARY_TEXT_COLOR" to "#004BC0",
            "DAY_1" to "#7396C9",
            "DAY_2" to "#56CCC9",
            "DAY_3" to "#81D3AA",
            "DAY_4" to "#779CFC",
            "DAY_5" to "#45C3F4",
            "DAY_6" to "#94DDCF",
            "DAY_7" to "#63A7B7",
            "CALANDER_ICON_COLOR" to "#324792",
            "THUMBNAIL_BG_COLOR" to "#C1E5FF",
            "PRIMARY_DARK" to "#013992",
            "CYAN" to "#00c9c2",
            "BLUE_LITE" to "#2196f370",
            "GREEN" to "#00a652",
            "GREEN_LITE" to "#7fa86150",
            "PURPLE2" to "#9600DC",
            "PURPLE_LITE" to "#E8B7FF",
            "PURPLE" to "purple",
            "GREY_LITE" to "#eee",
            "GREY_DARK" to "#7f7f82",
            "SHADOW_COLOR" to "rgba(193 ,  211 ,  251 ,  0.5)",
            "BACKGROUND" to "#E9EEFE",
            "PINCODE_FIRST" to "#0070d2",
            "PINCODE_SECOND" to "#90c5f4",
            "STUDENT_OVERALL_POINT_BG" to "#3d367bb5",
            "CLOCK2_ICON" to "#5F02FF",
            "CLOCK_ICON" to "#FF02C1",
            "CLASS_ICON" to "#004BC0",
            "PURPLE_ICON" to "purple",
            "RED_DARK_ICON" to "#D50000",
            "PURPLE2_ICON" to "#9600DC",
            "BLUE_ICON" to "#0070BF",
            "ASSIGNED_CLASSES" to "#00c9c2",
            "ASSIGNED_CLASSES_BG" to "#29c2ab",
            "COURSES_COMPLETE" to "#0070BF",
            "COURSES_COMPLETE_BG" to "#399def",
            "ACTIVE_STUDENT" to "#cdc0fc",
            "ACTIVE_STUDENT_BG" to "#cdc0fc",
            "QUICK_LINK_1" to "#87CEEB",
            "QUICK_LINK_2" to "#41B3A3",
            "QUICK_LINK_3" to "#6BB1E1",
            "QUICK_LINK_4" to "#B8D7A3",
            "QUICK_LINK_5" to "#AAB2B4",
            "ASSIGN_CLASS_ICONS_UNCHECK_ICON" to "#BBBBBB",
            "CARD_GRAY_BORDER" to "#adabab",
            "LIST_LIST_BORDER_COLOR" to "#888",
            "CHAT_INTERFACE_CHAT_RIGHT" to "#0070d263",
            "TAB_LABEL_ACTIVE" to "#004bc0",
            "TAB_LABEL_NOT_ACTIVE" to "#000000",
            "MODAL_TRANSPARENT_BG" to "rgba(0 , 0 , 0 , 0.2)",
            "NAVIGATION_DRAWER_HOME" to "#004BC0",
            "NAVIGATION_DRAWER_COURSES" to "#2ab3fc",
            "NAVIGATION_DRAWER_MESSAGES" to "#6a1b9a",
            "NAVIGATION_DRAWER_ATTENDANCE" to "#3366FF",
            "NAVIGATION_DRAWER_KIOSK" to "#4075d3",
            "NAVIGATION_DRAWER_NOTIFICATION" to "#0077CC",
            "NAVIGATION_DRAWER_ARTICLES" to "#0077CC",
            "NAVIGATION_DRAWER_REPORTS" to "#005FB2",
            "NAVIGATION_DRAWER_TIME_TRACKER" to "#FF02C1",
            "NAVIGATION_DRAWER_LOGOUT" to "#c73434",
            "FARWARD_ICON_COLOR" to "#004BC0"
        )

        val map = WritableNativeMap()
        hm.forEach { (key, value) ->
            map.putString(key, value)
        }
        return map
    }
}
