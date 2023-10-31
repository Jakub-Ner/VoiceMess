import * as FileSystem from 'expo-file-system';


export const useSaveToFile = () => {
  const fileUri = FileSystem.documentDirectory + 'imageDupa.jpg';
  FileSystem.downloadAsync(
    'https://picsum.photos/200/300',
    fileUri
  )
    .then(({uri}) => {
      console.log('Finished downloading to ', uri);
    }).catch(error => {
    console.error(error);
  });

  FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then((data) => {
    console.log(data);
  }).catch(error => {
    console.error(error);
  });
}

