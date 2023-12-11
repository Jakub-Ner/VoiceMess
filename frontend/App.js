import * as eva from "@eva-design/eva";
import {ApplicationProvider} from "@ui-kitten/components";
import {Appearance, StyleSheet} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';

import FriendsSettings from "./src/screens/FriendSettings";
import Contacts from "./src/screens/Contacts";
import Settings from "./src/screens/Settings";
import DefaultVoiceSettings from "./src/screens/DefaultVoiceSettings";
import LoginScreen from "./src/screens/LoginScreen";
import {useEffect} from "react";
import {addSmsListener, requestSendSmsPermissionsAsync} from "expo-sms-module";
import axios from "axios";
import useSaveToFile from "./src/hooks/useSaveToFile";

Buffer = require('buffer').Buffer;

const {Navigator, Screen} = createStackNavigator();
const IP = "http://192.168.19.218:8080/"
const AppNavigator = () => (
    <NavigationContainer>
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name='login' component={LoginScreen}/>
            <Screen name='contacts' initialParams={{IP: IP}} component={Contacts}/>
            <Screen name='settings' initialParams={{IP: IP}} component={Settings}/>
            <Screen name='defaultVoiceSettings' initialParams={{IP: IP}} component={DefaultVoiceSettings}/>
            <Screen name='friendsSettings' initialParams={{IP: IP}} component={FriendsSettings}/>
        </Navigator>
    </NavigationContainer>
);

function smsListener(message, author) {
    const body = JSON.stringify({
        message: message,
        customer: author
    });

    axios.post(IP + "api/v1/vocoder/generate/", body, {
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => Buffer.from(response.data, 'binary').toString('base64'))
        .then(result => useSaveToFile(`${author}.mp3`, result))
        .catch(error => console.error('Saving audio: ', JSON.stringify(error, null, 2)));
}

export default function App() {
    useEffect(() => {
        requestSendSmsPermissionsAsync()
            .then((result) => {
                console.log("SMS permissions: ", result);
            })
            .catch((error) => {
                console.error("SMS permissions: ", error);
            });

        const sub = addSmsListener(({message, phoneNumber}) => {
            console.log("SMS receied: ", message, phoneNumber)
            smsListener(message, "GBv7mTt0atIp3Br8iCZE", phoneNumber)
        });

        return () => sub.remove();
    }, []);
    const colorTheme = Appearance.getColorScheme();
    const theme = colorTheme === "dark" ? eva.dark : eva.light
    return (
        <ApplicationProvider {...eva} theme={theme}>
            <AppNavigator/>
        </ApplicationProvider>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
