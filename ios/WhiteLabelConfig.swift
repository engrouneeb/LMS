//
//  WhiteLabelConfig.swift
//  LMSApp
//
//  Created by syed akbar on 11/07/2025.
//

import Foundation

@objc(WhiteLabelConfig)
class WhiteLabelConfig: NSObject {
  
  @objc static func requiresMainQueueSetup() -> Bool {
    return false // or true if accessing UI-related code
  }

  @objc func getAppName() -> String {
    return Bundle.main.object(forInfoDictionaryKey: "CFBundleDisplayName") as? String ?? "DefaultApp"
  }

  @objc func getPrimaryColor() -> String {
    return "#fdf6e3"
  }

  @objc func getPrimaryTextColor() -> String {
    return "#657b83"
  }

  @objc func getGreetingText() -> String {
    return "Welcome"
  }
}
