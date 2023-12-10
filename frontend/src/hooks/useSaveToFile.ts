import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';

export default function (filename, content) {
  const fileUri = FileSystem.documentDirectory + filename;
  FileSystem.writeAsStringAsync(
    fileUri,
    content,
    {
      encoding: FileSystem.EncodingType.Base64,
    }
  ).then(() => {
    console.log('Saved content:', content.length);

    Audio.setAudioModeAsync({ playsInSilentModeIOS: true }).then(() => {
      const { sound: playbackObject } = Audio.Sound.createAsync(
        { uri:  fileUri},
        { shouldPlay: true }
      );
    }).catch(error => {
      console.error(error);
    });

  }).catch(error => {
    console.error(error);
  });
}


