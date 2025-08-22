# WebAssembly React Native Demo
<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
</p>

**⚠️ Proof of Concept - Educational Demo Only**

This is a demo showing WebAssembly integration in React Native. Not for production use.

## Screenshots - Demo Running

| **Physical Device** | **iOS Simulator** |
|:---:|:---:|
| Running on iPhone (development prebuild - no teams account needed) | Running on iOS Simulator |
| <img height="400" alt="Demo on physical device" src="https://github.com/user-attachments/assets/6299f3a5-ec52-42b0-8810-b6b66eea2536" /> | <img height="400" alt="Demo on iOS simulator" src="https://github.com/user-attachments/assets/83741fad-572e-455f-9179-531a42f2a062" /> |

## 🚀 How to use

**📋 To see the implementation:** Go to [Pull Request #1](https://github.com/vyk2rr/react-native-wasm-demo/pull/1), checkout the branch, and follow instructions below:

```sh
git checkout feat/webassembly-integration
```

### Install dependencies
```sh
npm install
```

### Run prebuild
```sh
npx expo prebuild
```

### Run on iPhone (physical device)
```sh
npx expo run:ios
```

### Run on iOS Simulator
```sh
npx expo run:ios --simulator
```

> 💡 This demo shows basic WASM integration patterns. Check out the PR to see the implementation details.

> ⚠️ **Note:** Only tested on iOS devices and simulator. Android support not tested.
