import React, { useState } from 'react';
import { Button, Layout, Radio, RadioGroup, Text, Divider } from '@ui-kitten/components';
import { StyleSheet, View } from "react-native";
import * as DocumentPicker from 'expo-document-picker';


export default function DefaultVoiceSettings() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const pickedFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    console.log(result);
    setSelectedFile(result);
  }

  return (
    <>
      <Layout style={{flex: 1, alignItems: 'flex-start', padding: '10%', marginTop: '8%'}}>
        <Text category='h4' style={{marginBottom: '2%'}}>Moje głosy</Text>
        <RadioGroup
          selectedIndex={selectedIndex}
          onChange={index => setSelectedIndex(index)}
          style={{alignItems: 'flex-start', marginBottom: '20%', width: '100%'}}
        >
          <Radio>
            {evaProps => <Text {...evaProps} style={{fontSize: 22}}> Adam Fronczewski</Text>}
          </Radio>
          <Radio>
            {evaProps => <Text {...evaProps} style={{fontSize: 22}}> Mama</Text>}
          </Radio>
          <Radio>
            {evaProps => <Text {...evaProps} style={{fontSize: 22}}> Krystyna Czubówna</Text>}
          </Radio>
        </RadioGroup>
          <Divider style={{width: '100%', marginBottom: '8%'}}/>

        {!selectedFile
          ? (
            <View style={{alignItems: 'center', width: '100%'}}>
              <Button style={{marginVertical: 7}} onPress={pickedFile}>
                <Text style={{fontSize: 22}}>Wybierz głos</Text>
              </Button>
            </View>
          ) : (
            <>
              <Text style={{fontSize: 22}}>
                Wybrano: <Text style={{fontWeight: 'bold', fontSize: 22}}>{selectedFile.name}</Text>
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Button style={styles.button} onPress={() => console.log("Send sample")}>
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
