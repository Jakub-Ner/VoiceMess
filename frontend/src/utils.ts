import { Audio } from "expo-av";
import * as FileSystem from 'expo-file-system';
import { Alert, Linking } from "react-native";


export function getUri(filename: string): string {
  return FileSystem.documentDirectory + filename;
}

export function playAudio(filename: string) {
  Audio.setAudioModeAsync({playsInSilentModeIOS: true}).then(() => {
    const {sound: playbackObject} = Audio.Sound.createAsync(
      {uri: getUri(filename)},
      {shouldPlay: true}
    );
    console.log("Playing audio: ", filename);
  }).catch(error => {
    console.error("Playing audio: ", error);
  });
}

export function postRequest(body, url) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export function backAlert(description: string, onPress: () => void) {
  Alert.alert('Uwaga!', `Czy na pewno chcesz ${description}?`, [
    {
      text: 'Anuluj',
      onPress: () => null,
      style: 'cancel',
    },
    {text: 'Potwierdź', onPress: () => onPress()},
  ]);
  return true;
}

export function redirectToPolicy() {
  Linking.openURL('https://elevenlabs.io/privacy').then(r => console.log(r)).catch(err => console.log(err));
}
