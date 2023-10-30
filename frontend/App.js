import LoginScreen from "./src/screens/LoginScreen";
import KittenUiDemo from "./src/screens/KittenUiDemo";
import Contacts from "./src/screens/Contacts";

import * as eva from "@eva-design/eva";
import {default as theme} from "./theme.json"

import {ApplicationProvider, IconRegistry} from "@ui-kitten/components";
import {Appearance} from "react-native";
import {EvaIconsPack} from "@ui-kitten/eva-icons";


export default function App() {
    const colorTheme = Appearance.getColorScheme();
    const theme = colorTheme === "dark" ? eva.dark : eva.light
    return (
        <ApplicationProvider {...eva} theme={theme}>
            <Contacts/>
        </ApplicationProvider>
    )

}
