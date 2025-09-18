/*
Copyright 2025 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    viewBg: '#f0f0f0',
    modeBg: '#fff',
    panel: '#fff',
    panelBorder: '#e1e5e9',
    inputBg: '#f9f9f9',
    inputBorder: '#ddd',
    placeholderText: '#999',
    mutedText: '#666',
    errorText: '#d32f2f',
    successText: '#34C759',
    buttonPrimary: '#007AFF',
    buttonText: '#fff',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    viewBg: '#2c2c2e',
    modeBg: '#3a3a3c',
    panel: '#1c1c1e',
    panelBorder: '#3a3a3c',
    inputBg: '#2c2c2e',
    inputBorder: '#48484a',
    placeholderText: '#8e8e93',
    mutedText: '#8e8e93',
    errorText: '#ff453a',
    successText: '#30d158',
    buttonPrimary: '#0a84ff',
    buttonText: '#fff',
  },
};
