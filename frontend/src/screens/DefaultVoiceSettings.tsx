import React, { useState } from 'react';
import { Button, Divider, Layout, Radio, RadioGroup, Text } from '@ui-kitten/components';
import { Alert, StyleSheet, View } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';
import useVocoders from "../hooks/useVocoders";
import { backAlert } from "../utils";
import { getUserDefaultVocoderIndex, useUserDefaultVocoder } from "../hooks/useDefaultVocoder";
import { FileSystemUploadType, uploadAsync } from "expo-file-system";

export const MIN_VOICE_DURATION = 60; // seconds
export const MAX_VOICE_DURATION = 120; // seconds
export default function DefaultVoiceSettings({route, navigation}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [filename, setFilename] = useState("");
  const IP = route.params.IP
  const facebookId = route.params.facebookId

  const pickedFile = async () => {
    // only .mp3 files should be allowed
    try {
      let result = await DocumentPicker.getDocumentAsync({type: 'audio/mpeg'});
      if (result.type !== 'success') {
        return;
      }
      setFilename(result.name);
      const audio = new Audio.Sound();
      await audio.loadAsync({uri: result.uri});
      audio.getStatusAsync()
        .then((result) => {
          const duration = (result.durationMillis / 1000);
          if (duration < MIN_VOICE_DURATION || duration > MAX_VOICE_DURATION) {
            Alert.alert(
              'Błąd',
              `Wybrany plik ma długość ${duration} sekund, a powinien mieć od ${MIN_VOICE_DURATION} do ${MAX_VOICE_DURATION} sekund.`,
              [{text: 'OK'}],
              {cancelable: false},
            );
            return;
          }
          console.log("File duration: " + duration);
          setSelectedFile(result);
        })
        .catch(() => console.log('error'));
    } catch (err) {
      console.error('Error picking a file:', err);
    }
  }

  const deleteVocoderAlert = (index) => {
    backAlert(`usunąć głos ${data[index].name}`, () => triggerDelete(index));
  }

  const [vocoders, setVocoders, data, setData] = useVocoders(IP, facebookId);
  const [defaultVocoder, setDefaultVocoder] = useUserDefaultVocoder(IP, facebookId);
  const selectedIndex = getUserDefaultVocoderIndex(vocoders, data, defaultVocoder);

  if (!vocoders) {
    return <></>;
  }


  const triggerDelete = (index) => {
    fetch(`${IP}/api/v1/vocoder/one/${data[index].eleven_labs_id}/`, {
      method: 'DELETE',
    })
    setData(data.filter((vocoder, i) => i !== index));
    setVocoders(vocoders.filter((vocoder, i) => i !== index));
  }

  const sendSample = async () => {
    try {
      setSelectedFile(null)
      uploadAsync(`${IP}/api/v1/vocoder/create/${facebookId}`, selectedFile.uri, {
        fieldName: filename,
        httpMethod: 'POST',
        uploadType: FileSystemUploadType.MULTIPART,
        headers: {
          'Content-Type': 'text/html',
        },
      }).then((response) => {
        console.log('new vocoder: ', response.body)
      }).catch((error) => {
        console.error('Error:', JSON.stringify(error));
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Layout style={{flex: 1, alignItems: 'flex-start', padding: '10%'}}>
        <Text category='h4' style={{marginBottom: '15%'}}>Moje głosy</Text>
        <Text category='h5' style={{marginBottom: '5%'}}>Domyślny głos</Text>
        <View style={styles.container}>
          <RadioGroup
            selectedIndex={selectedIndex}
            onChange={index => setDefaultVocoder(data[index].eleven_labs_id)}
            style={{alignItems: 'flex-start', marginBottom: '20%', width: '100%'}}
          >
            {vocoders.map((vocoderName, index) => (
                <Radio style={styles.button} key={index} onLongPress={() => console.log(data[index]?.name)}>
                  {evaProps => <Text {...evaProps} style={{fontSize: 22}}> {vocoderName}</Text>}
                </Radio>
              )
            )
            }
          </RadioGroup>
          <View>
            {vocoders.map((vocoderName, index) => (
                <Button style={styles.buttonRemove}
                        key={index}
                        appearance={'outline'}
                        onPress={() => deleteVocoderAlert(index)}>
                  {evaProps => <Text {...evaProps}>X</Text>}
                </Button>
              )
            )
            }
          </View>
        </View>


        <Divider style={{width: '100%', marginBottom: '8%'}}/>
        <Text category='h5' style={{marginBottom: '4%'}}>Sklonuj nowy głos</Text>

        {!selectedFile
          ? (
            <Button style={{marginVertical: 7}} onPress={pickedFile}>
              <Text style={{fontSize: 22}}>Wybierz próbkę</Text>
            </Button>
          ) : (
            <>
              <Text style={{fontSize: 22}}>
                Wybrano: <Text style={{fontWeight: 'bold', fontSize: 22}}>{filename}</Text>
              </Text>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: '10%',
                paddingVertical: '3%'
              }}>
                <Button style={styles.buttonNew} status='success' onPress={sendSample}>
                  <Text style={{fontSize: 22}}>Wyślij próbkę</Text>
                </Button>
                <Button style={styles.buttonNew} onPress={pickedFile}>
                  <Text style={{fontSize: 22}}>Zmień próbkę</Text>
                </Button>
              </View>
            </>
          )}
      </Layout>

    </>
  );
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '40%',
    width: '80%',
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'left',
  },
  button: {
    marginStart: '5%',
    width: '80%',
    marginRight: 'auto',
  },
  buttonNew: {
    marginEnd: '5%',
  },
  buttonRemove: {
    height: '10%',
    marginRight: 'auto',
  },
});
