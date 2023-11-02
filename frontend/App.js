import Contacts from "./src/screens/Contacts";
import Settings from "./src/screens/Settings";
import DefaultVoiceSettings from "./src/screens/DefaultVoiceSettings";

import * as eva from "@eva-design/eva";

import {ApplicationProvider} from "@ui-kitten/components";
import {Appearance} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


const {Navigator, Screen} = createStackNavigator();

const AppNavigator = () => (
    <NavigationContainer>
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name='contact' component={Contacts}/>
            <Screen name='settings' component={Settings}/>
        </Navigator>
    </NavigationContainer>
);

export default function App() {
    const colorTheme = Appearance.getColorScheme();
    const theme = colorTheme === "dark" ? eva.dark : eva.light
    return (
        <ApplicationProvider {...eva} theme={theme}>
            <DefaultVoiceSettings/>
        </ApplicationProvider>
    )
}
