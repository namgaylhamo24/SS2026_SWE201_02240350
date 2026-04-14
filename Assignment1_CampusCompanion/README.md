# Campus Companion – React Native App

## Overview

Campus Companion is a mobile application built with React Native and Expo for new students at the College of Science and Technology, RUB. The app provides quick access to important campus information including key contacts, weekly class schedules, and notice board announcements. It features multi-screen navigation with a bottom tab bar and stack navigator, a light/dark theme toggle, and a clean responsive UI suitable for different Android and iOS screen sizes.

### Main Features
- **Home Screen** – App entry point with navigation buttons and light/dark theme toggle
- **Contacts Screen** – List of important campus contacts using FlatList; tap any contact to view full details
- **Contact Detail Screen** – Shows contact info with tap-to-call and tap-to-email actions
- **Schedule Screen** – Weekly class timetable with room and time details
- **Notice Board Screen** – Campus announcements with category tags and dates

---

## Installation & Running the App

### Prerequisites
- Node.js (v18 or later)
- Expo Go app installed on your Android/iOS device, or an emulator/simulator

### Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Assignment1_CampusCompanion
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the app**
   ```bash
   npx expo start --clear
   ```

4. **Run on device**
   - Scan the QR code with the Expo Go app (Android/iOS)
   - Or press `a` for Android emulator, `i` for iOS simulator

---

## Known Issues / Limitations

- The college logo uses the default Expo `icon.png` placeholder. Replace `assets/icon.png` with the actual college logo for a production version.
- Tap-to-call and tap-to-email use placeholder contact details and may not connect to real numbers.
- The app has been tested on Android. iOS layout may need minor adjustments for notch/safe area on older devices.