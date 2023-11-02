import Settings from "./src/screens/Settings";


import * as eva from "@eva-design/eva";

import {ApplicationProvider} from "@ui-kitten/components";
import {Appearance} from "react-native";
import Contacts from "./src/screens/Contacts";
import ManageVoices from "./src/screens/ManageVoices";


export default function App() {
    const colorTheme = Appearance.getColorScheme();
    const theme = colorTheme === "dark" ? eva.dark : eva.light
    return (
        <ApplicationProvider {...eva} theme={theme}>
            <Settings/>
        </ApplicationProvider>
    )
}
