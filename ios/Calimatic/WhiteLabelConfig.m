//
//  WhiteLabelConfig.m
//  LMSApp
//
//  Created by syed akbar on 11/07/2025.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface WhiteLabelConfig : NSObject <RCTBridgeModule>
@end

@implementation WhiteLabelConfig

// Register the module with React Native
RCT_EXPORT_MODULE();

// Synchronous methods
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getAppName) {
  return [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleDisplayName"];
}
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getVariantURL) {
  return @"Default";
}
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getVariantName) {
  return @"calimaticlms";
}
 
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getPrimaryColor) {
  return @"#0076ff";
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getPrimaryTextColor) {
  return @"#0076FF";
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getGreetingText) {
  return @"LMS Bringing Agility to Learning Institutes";
}
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getSplashCircleLogoSize) {
  return @"200";
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(pass) {
  return @{ @"PRIMARY_COLOR" :  @"#004BC0",
              @"PRIMARY_TEXT_COLOR":@"#004BC0",
              @"DAY_1" :  @"#7396C9",
              @"DAY_2" :  @"#56CCC9",
              @"DAY_3" :  @"#81D3AA",
              @"DAY_4" :  @"#779CFC",
              @"DAY_5" :  @"#45C3F4",
              @"DAY_6" :  @"#94DDCF",
              @"DAY_7" :  @"#63A7B7",
              @"CALANDER_ICON_COLOR" :  @"#324792",
              @"THUMBNAIL_BG_COLOR" : @"#004BC0",
              @"PRIMARY_DARK" : @"#013992",
              @"CYAN" : @"#00c9c2",
              @"BLUE_LITE" : @"#2196f370",
              @"GREEN" : @"#00a652",
              @"GREEN_LITE" : @"#7fa86150",
              @"PURPLE2" : @"#9600DC",
              @"PURPLE_LITE" : @"#E8B7FF",
              @"PURPLE" : @"purple",
              @"GREY_LITE" : @"#eee",
              @"GREY_DARK" : @"#7f7f82",
              @"SHADOW_COLOR" : @"rgba(193 ,  211 ,  251 ,  0.5)",
              @"BACKGROUND" : @"#E9EEFE",
              @"PINCODE_FIRST" : @"#0070d2",
              @"PINCODE_SECOND" : @"#90c5f4",
              @"STUDENT_OVERALL_POINT_BG" : @"#3d367bb5",
              @"CLOCK2_ICON" : @"#5F02FF",
              @"CLOCK_ICON" : @"#FF02C1",
              @"CLASS_ICON" : @"#004BC0",
              @"PURPLE_ICON" : @"purple",
              @"RED_DARK_ICON" : @"#D50000",
              @"PURPLE2_ICON" : @"#9600DC",
              @"BLUE_ICON" : @"#0070BF",
              @"ASSIGNED_CLASSES" : @"#00c9c2",
              @"ASSIGNED_CLASSES_BG" : @"#29c2ab",
              @"COURSES_COMPLETE" : @"#0070BF",
              @"COURSES_COMPLETE_BG" : @"#399def",
              @"ACTIVE_STUDENT" : @"#cdc0fc",
              @"ACTIVE_STUDENT_BG" : @"#cdc0fc",
              @"QUICK_LINK_1":@"#87CEEB",
              @"QUICK_LINK_2":@"#41B3A3",
              @"QUICK_LINK_3":@"#6BB1E1",
              @"QUICK_LINK_4":@"#B8D7A3",
              @"QUICK_LINK_5":@"#AAB2B4",
              @"ASSIGN_CLASS_ICONS_UNCHECK_ICON" :  @"#BBBBBB",
              @"CARD_GRAY_BORDER" :  @"#adabab",
              @"LIST_LIST_BORDER_COLOR" :  @"#888",
              @"CHAT_INTERFACE_CHAT_RIGHT" :  @"#0070d263",
              @"TAB_LABEL_ACTIVE" :  @"#004bc0",
              @"TAB_LABEL_NOT_ACTIVE" :  @"#000000",
              @"MODAL_TRANSPARENT_BG" :  @"rgba(0 , 0 , 0 , 0.2)",
              @"NAVIGATION_DRAWER_HOME" : @ "#004BC0",
              @"NAVIGATION_DRAWER_COURSES" : @"#2ab3fc",
              @"NAVIGATION_DRAWER_MESSAGES" : @"#6a1b9a",
              @"NAVIGATION_DRAWER_ATTENDANCE" : @"#3366FF",
              @"NAVIGATION_DRAWER_KIOSK" : @"#4075d3",
              @"NAVIGATION_DRAWER_NOTIFICATION" : @"#0077CC",
              @"NAVIGATION_DRAWER_ARTICLES" : @"#0077CC",
              @"NAVIGATION_DRAWER_REPORTS" : @"#005FB2",
              @"NAVIGATION_DRAWER_TIME_TRACKER" : @"#FF02C1",
              @"NAVIGATION_DRAWER_LOGOUT" : @"#c73434",
              @"FARWARD_ICON_COLOR" :  @"#004BC0",
    };
}
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getStartedImageSize) {
  return @"400";
}

@end
