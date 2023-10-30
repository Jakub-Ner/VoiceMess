import Contacts from "./src/screens/Contacts";

import * as eva from "@eva-design/eva";

import {ApplicationProvider} from "@ui-kitten/components";
import {Appearance} from "react-native";


export default function App() {
    const colorTheme = Appearance.getColorScheme();
    const theme = colorTheme === "dark" ? eva.dark : eva.light
    return (
        <ApplicationProvider {...eva} theme={theme}>
            <Contacts/>
        </ApplicationProvider>
    )

}
