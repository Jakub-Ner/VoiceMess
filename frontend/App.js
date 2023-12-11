import * as eva from "@eva-design/eva";
import {ApplicationProvider} from "@ui-kitten/components";
import {Appearance, View, StyleSheet, Text} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';

import FriendsSettings from "./src/screens/FriendSettings";
import Contacts from "./src/screens/Contacts";
import Settings from "./src/screens/Settings";
import DefaultVoiceSettings from "./src/screens/DefaultVoiceSettings";

import useRequest from "./src/hooks/useRequest";
import LoginScreen from "./src/screens/LoginScreen";
// import * as ExpoSmsModule from 'expo-sms-module';


const {Navigator, Screen} = createStackNavigator();
const IP = "http://192.168.43.34:8080"
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

export default function App() {
    const colorTheme = Appearance.getColorScheme();
    const theme = colorTheme === "dark" ? eva.dark : eva.light
    return (
        <ApplicationProvider {...eva} theme={theme}>
            <AppNavigator/>
        </ApplicationProvider>
    )
}



function Shit() {
    return (
        <View style={styles.container}>
            <Text>{ExpoSmsModule.hello()}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
