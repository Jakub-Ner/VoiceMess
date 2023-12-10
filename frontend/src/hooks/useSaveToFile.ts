import * as FileSystem from 'expo-file-system';
import { playAudio } from "../utils";

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

    playAudio(fileUri);
  }).catch(error => {
    console.error("Saving audio: ", error);
  });
}


