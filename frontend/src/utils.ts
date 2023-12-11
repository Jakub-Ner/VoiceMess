import { Audio } from "expo-av";
import * as FileSystem from 'expo-file-system';


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
