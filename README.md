# Adobe Journey Optimizer Content Cards Sample App

A simple React Native Expo application demonstrating Adobe Journey Optimizer Content Cards implementation.

**This app is ready to run out of the box.** If you want to connect it to your own Adobe Journey Optimizer setup, update the configuration settings below.

## Features

- **Content Cards Integration** - Display personalized content from Adobe Journey Optimizer
- **Dark Mode Support** - Light, Dark, and System theme options
- **Custom Track Actions** - Test different track actions to trigger content
- **Real-time Refresh** - Dynamic content updates
- **Cross-platform** - iOS and Android support

## Table of Contents

- [Prerequisites](#prerequisites)
- [Configuration](#configuration-optional---for-your-own-setup)
- [Quick Start](#quick-start)
- [Usage](#usage)
- [Testing](#testing)
- [Documentation](#documentation)

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator / Android Emulator
- Adobe Journey Optimizer setup (only if customizing with your own configuration)

## Configuration (Optional - For Your Own Setup)

**Note: The app works with default demo configuration. Only update these settings if you want to connect to your own Adobe Journey Optimizer setup.**

### 1. Mobile Property App ID

To use your own Adobe Mobile Property, update the App ID in `app/_layout.tsx`:

```typescript
await MobileCore.initializeWithAppId("YOUR_APP_ID_HERE");
```

### 2. Surface Configuration

Configure your content card surface in `app/ContentCardsScreen.tsx`:

```typescript
const surface = 'your surface name'
```

### 3. App Bundle Identifiers

Update your app identifiers in `app.json`:

**iOS Configuration:**
```json
{
  "ios": {
    "supportsTablet": true,
    "bundleIdentifier": "com.yourcompany.yourapp"
  }
}
```

**Android Configuration:**
```json
{
  "android": {
    "package": "com.yourcompany.yourapp"
  }
}
```

### 4. Adobe Extensions

This project uses the developer version of Adobe Experience Platform Messaging extension:

```json
{
  "@adobe/react-native-aepcore": "^7.0.0",
  "@adobe/react-native-aepedge": "^7.0.0",
  "@adobe/react-native-aepedgeconsent": "^7.0.0",
  "@adobe/react-native-aepedgeidentity": "^7.0.0",
  "@adobe/react-native-aepmessaging": "https://gitpkg.now.sh/adobe/aepsdk-react-native/packages/messaging?content-card-ui"
}
```

## Quick Start

This is a simple app that's ready to run. Just follow these steps:

In the root folder:

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Prebuild the project**
   ```bash
   npx expo prebuild
   ```

3. **Run the app**

   a. **For Android:**
   ```bash
   npm run android
   ```

   b. **For iOS:**
      Due to a [known issue](https://github.com/adobe/aepsdk-react-native?tab=readme-ov-file#troubleshooting-and-known-issues):
      ```
      Underlying Objective-C module 'AEPRulesEngine' not found
      ``` 
      We need to add the below code to the `ios/Podfile`:

      ```ruby
      post_install do |installer|
        react_native_post_install(
          installer,
          config[:reactNativePath],
          :mac_catalyst_enabled => false,
          :ccache_enabled => podfile_properties['apple.ccacheEnabled'] == 'true',
        )
        
        # Configure AEP targets to avoid module interface verification issues
        installer.pods_project.targets.each do |t|
          if t.name.start_with?("AEP")
            t.build_configurations.each do |bc|
              bc.build_settings['OTHER_SWIFT_FLAGS'] = '$(inherited) -no-verify-emitted-module-interface'
            end
          end
        end
      end
      ```

      Then run:

      ```bash
      cd ios
      pod install
      cd ..
      npm run ios
      ```

## Usage

### Light/Dark modes Switching
The app includes a theme switcher with three options:
- **Light** - Force light theme
- **Dark** - Force dark theme  
- **System** - Follow device system preference

### Content Cards Display
Content cards will automatically appear when:
- The app launches (fires default `small_image` action)
- You trigger a track action
- Content is configured in Adobe Journey Optimizer for your surface

## Testing

### Available Test Actions

| Action | Template Type | Description |
|--------|---------------|-------------|
| `small_image` | Small Image | Default action fired on app start |
| `large_image` | Large Image | Large format content cards |
| `image_only` | Image Only | Image-focused content cards |

### Testing Flow

1. **Launch the app** - Automatically fires `small_image` action
2. **Switch themes** - Test light/dark mode functionality
3. **Try different actions** - Use the input field to test various track actions
4. **Observe content updates** - Watch content cards appear/refresh

## Documentation

### Content Cards
- [Content Cards Tutorial](https://github.com/adobe/aepsdk-react-native/blob/content-card-ui/packages/messaging/tutorials/ContentCards.md)
- [Adobe Journey Optimizer Documentation](https://experienceleague.adobe.com/docs/journey-optimizer/using/ajo-home.html)

### Expo Development
- [Development builds](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator setup](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator setup](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go) - Limited sandbox for development

### Learning Resources
- [Expo documentation](https://docs.expo.dev/) - Learn fundamentals and advanced topics
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/) - Step-by-step tutorial

## Troubleshooting

### Common Issues

**Content cards not appearing:**
- Verify your App ID is correct
- Check surface configuration matches your Adobe Journey Optimizer setup
- Ensure content campaigns are active and published


## License

This project is licensed under the Apache License, Version 2.0. See the [LICENSE](LICENSE) file for details.

---

**Created using Expo and Adobe Experience Platform**