import React, { useState } from 'react';
import { Button, Divider, Layout, Radio, RadioGroup, Text } from '@ui-kitten/components';
import { StyleSheet, View } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import useGetRequest from "../hooks/useGetRequest";

export default function DefaultVoiceSettings() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const pickedFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    console.log(result);
    setSelectedFile(result);
  }

  const data = useGetRequest("http://192.168.14.7:8080/api/v1/vocoder/"); // TODO use const IP from config and search by facebook_id
  if (!data) {
    return <></>;
  }
  const vocoders = data.map((vocoder) => vocoder.name);
  return (
    <>
      <Layout style={{flex: 1, alignItems: 'flex-start', padding: '10%'}}>
        <Text category='h4' style={{marginBottom: '4%'}}>Moje głosy</Text>
        <RadioGroup
          selectedIndex={selectedIndex}
          onChange={index => setSelectedIndex(index)}
          style={{alignItems: 'flex-start', marginBottom: '20%', width: '100%'}}
        >
          {vocoders.map((vocoderName, index) => (
            <Radio key={index}>
              {evaProps => <Text {...evaProps} style={{fontSize: 22}}> {vocoderName}</Text>}
            </Radio>))
          }
        </RadioGroup>

        <Divider style={{width: '100%', marginBottom: '8%'}}/>
        <Text category='h4' style={{marginBottom: '4%'}}>Sklonuj nowy głos</Text>

        {!selectedFile
          ? (
            <Button style={{marginVertical: 7}} onPress={pickedFile}>
              <Text style={{fontSize: 22}}>Wybierz próbkę</Text>
            </Button>
          ) : (
            <>
              <Text style={{fontSize: 22}}>
                Wybrano: <Text style={{fontWeight: 'bold', fontSize: 22}}>{selectedFile.name}</Text>
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Button style={styles.button} onPress={() => console.log("Send sample")}> // TODO: Send sample POST /api/v1/vocoder/
                  <Text style={{fontSize: 22}}>Wyślij próbkę</Text>
                </Button>
                <Button style={styles.button} onPress={pickedFile}>
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
  text: {
    fontWeight: 'bold', // Ustawienie pogrubionej czcionki
    textAlign: 'left',
    // fontSize: 16
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white'
  },
  button: {
    marginVertical: 7,
    flex: 1,
    marginStart: '5%',
  },
});
