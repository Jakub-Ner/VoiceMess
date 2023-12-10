import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';

import * as MediaLibrary from 'expo-media-library';

export default function (filename, content) {
  const fileUri = FileSystem.documentDirectory + filename;
  // content = new Uint8Array(content);

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

  // FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then((data) => {
  //   console.log(data);
  // }).catch(error => {
  //   console.error(error);
  // });
  //
  //
  //
}


