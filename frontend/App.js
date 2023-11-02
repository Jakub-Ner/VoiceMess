import * as eva from "@eva-design/eva";
import {ApplicationProvider} from "@ui-kitten/components";
import {Appearance} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import FriendsSettings from "./src/screens/FriendSettings";
import Contacts from "./src/screens/Contacts";
import Settings from "./src/screens/Settings";
import DefaultVoiceSettings from "./src/screens/DefaultVoiceSettings";

const {Navigator, Screen} = createStackNavigator();

const AppNavigator = () => (
    <NavigationContainer>
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name='contact' component={Contacts}/>
            <Screen name='settings' component={Settings}/>
            <Screen name='defaultVoiceSettings' component={DefaultVoiceSettings}/>
            <Screen name='friendsSettings' component={FriendsSettings}/>
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
