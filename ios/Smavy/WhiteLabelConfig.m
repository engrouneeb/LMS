//
//  WhiteLabelConfig.m
//  Smavy
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
  return @"https://classroom.smavy.com";
}

  RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getPrimaryColor) {
    return @"#008000";
  }

  RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getPrimaryTextColor) {
    return @"#FFD700";
  }

  RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getGreetingText) {
    return @"Legends of the Hidden Temple Rocks!";
  }

  @end
