#!/bin/bash
set -e

# Config
WORKSPACE="ios/364WaystoSayNo.xcworkspace"
SCHEME="364WaystoSayNo"
ARCHIVE_PATH="build/364WaystoSayNo.xcarchive"
EXPORT_PATH="build/export"
EXPORT_PLIST="ExportOptions.plist"
TEAM_ID="ZARBU8R8ML"
APPLE_ID="greenhill2022@outlook.com"

# Get current build number
CURRENT_BUILD=$(python3 -c "import json; print(json.load(open('app.json'))['expo']['ios']['buildNumber'])")
VERSION=$(python3 -c "import json; print(json.load(open('app.json'))['expo']['version'])")

echo "Current version: $VERSION (build $CURRENT_BUILD)"
read -p "Enter new build number (or press Enter for $((CURRENT_BUILD + 1))): " BUILD_NUM
BUILD_NUM=${BUILD_NUM:-$((CURRENT_BUILD + 1))}

# Update app.json with new build number
python3 -c "
import json
data = json.load(open('app.json'))
data['expo']['ios']['buildNumber'] = '$BUILD_NUM'
json.dump(data, open('app.json', 'w'), indent=2)
print('Updated app.json to build $BUILD_NUM')
"

echo ""
echo "Building version $VERSION (build $BUILD_NUM)"
echo ""

# Clean old builds
rm -rf build/

# Prebuild native project
echo "Running expo prebuild..."
npx expo prebuild --platform ios --no-install

# Archive
echo "Archiving..."
xcodebuild -workspace "$WORKSPACE" \
  -scheme "$SCHEME" \
  -configuration Release \
  -sdk iphoneos \
  -archivePath "$ARCHIVE_PATH" \
  archive \
  CODE_SIGN_STYLE=Automatic \
  DEVELOPMENT_TEAM="$TEAM_ID" \
  CURRENT_PROJECT_VERSION="$BUILD_NUM" \
  -quiet

echo "Archive succeeded"

# Export IPA
echo "Exporting IPA..."
xcodebuild -exportArchive \
  -archivePath "$ARCHIVE_PATH" \
  -exportPath "$EXPORT_PATH" \
  -exportOptionsPlist "$EXPORT_PLIST" \
  -allowProvisioningUpdates

echo "Export succeeded"

# Upload
echo "Uploading to App Store Connect..."
read -sp "Enter your app-specific password: " APP_PASSWORD
echo ""
xcrun altool --upload-app \
  -f "$EXPORT_PATH/364WaystoSayNo.ipa" \
  -t ios \
  -u "$APPLE_ID" \
  -p "$APP_PASSWORD"

echo "Done! Check App Store Connect for processing status."
