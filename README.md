# Voice Mess

## Backend

**Dependencies**
- [JDK 21](https://www.oracle.com/java/technologies/downloads/#jdk21-windows)
  

## Frontend

**Install npm packages**
```
npm install
```

### Commands

`npm start` - launch server to test basic stuff via Expo Go, without using actual app build
`npm run dev` - requires installing [latest buid](https://expo.dev/accounts/jakubner/projects/VoiceMess/builds). Enables to test any feature, if the phone is not recognized, try connecting via USB with USB-debugging
`npm run build` - build the app on expo servers

## TODO
### Front
- [ ]  baza danych
- [ ]  ustawienie kontaktu
- [ ]  dodaj nowy głos
- [ ]  uruchomienie audio
- [ ]  [dodanie probki glosu](https://docs.expo.dev/versions/latest/sdk/document-picker/)
- [ ]  komunikacja z backendem:
  - [ ] wysłanie (tekst, głos), otrzymamy audio
  - [ ] wysłanie (nazwaW, probkaGlosu), otrzymamy nazwaW
