# App Assets

A mobile app built with Expo and React Native that bundles several small games and their assets.

## Games

- **8 Ball:** a game with a home screen, play and searching screens, stakes, settings, and tutorials. Assets are in `app/8ball/`.
- **Tic-Tac-Toe (TTT):** a game with a home screen, settings modal, and player components. Integration notes are in:
  - [TTT_INTEGRATION_GUIDE.md](TTT_INTEGRATION_GUIDE.md)
  - [TTT_INTEGRATION_CHECKLIST.md](TTT_INTEGRATION_CHECKLIST.md)
  - [TTT_UI_IMPROVEMENTS.md](TTT_UI_IMPROVEMENTS.md)

## Tech stack

- Expo and React Native
- Expo Router for navigation
- Supabase for the backend

## Getting started

```bash
npm install
npx expo start
```

Then open the app in Expo Go, an Android emulator, or an iOS simulator.

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the Expo development server |
| `npm run android` | Open the app on Android |
| `npm run ios` | Open the app on iOS |
| `npm run web` | Open the app in the browser |
| `npm run lint` | Run ESLint |
