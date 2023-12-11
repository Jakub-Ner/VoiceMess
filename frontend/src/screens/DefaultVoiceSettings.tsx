import React, { useState } from 'react';
import { Button, Divider, Layout, Radio, RadioGroup, Text } from '@ui-kitten/components';
import { StyleSheet, View } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import useRequest from "../hooks/useRequest";

export default function DefaultVoiceSettings({route, navigation}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const IP = route.params.IP
  const facebookId = route.params.facebookId

  const pickedFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    console.log(result);
    setSelectedFile(result);
  }

  const data = useRequest(`${IP}/api/v1/vocoder/list/${facebookId}`,'GET');
  if (!data) {
    return <></>;
  }
  const vocoders = data.map((vocoder) => vocoder.name);

  console.log(vocoders)

  const triggerDelete = (index) => {
    fetch(`${IP}/api/v1/vocoder/${data[index].eleven_labs_id}/`, {
      method: 'DELETE',
    })
  }

  return (
    <>
      <Layout style={{flex: 1, alignItems: 'flex-start', padding: '10%'}}>
        <Text category='h4' style={{marginBottom: '4%'}}>Moje głosy</Text>
        <View style={styles.container}>
        <RadioGroup
          selectedIndex={selectedIndex}
          onChange={index => setSelectedIndex(index)}
          style={{alignItems: 'flex-start', marginBottom: '20%', width: '100%'}}
        >
          {vocoders.map((vocoderName, index) => (
              <Radio style={styles.button}  key={index} onLongPress={() => console.log(index)}>
              {evaProps => <Text {...evaProps} style={{fontSize: 22}}> {vocoderName}</Text>}
            </Radio>
              )
          )
          }
        </RadioGroup>
          <View style={{backgroundColor: 'pink'}}>
        {vocoders.map((vocoderName, index) => (
            <Button style={styles.buttonRemove}
                    key={index}
                    onPress={()=> triggerDelete(index)}>
              {evaProps => <Text style={{fontSize: 22}} {...evaProps}>xcghchc</Text>}
            </Button>
            )
        )
        }
          </View>
        </View>


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
                    {/*// TODO: Send sample POST /api/v1/vocoder/*/}
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
  container: {
  display: 'flex',
    flexDirection: 'row',
    height: '50%',
    width:'80%',
    backgroundColor: 'green'
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

  buttonRemove: {
    width: '30%',
    height: '10%',
    marginVertical: '8%',
    marginRight: 'auto',
    backgroundColor: 'red'
  },
});
