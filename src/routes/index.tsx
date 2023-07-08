import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";
import Toast from 'react-native-toast-message'
import { TopMessage } from "../components/TopMessage";
import { useSafeAreaInsets } from "react-native-safe-area-context";

//aqui usei o Toast customizado, reutilizando meu componente <TopMessage>

export function Routes(){

    const insets = useSafeAreaInsets();
    return(
        <NavigationContainer>
            <AppRoutes/>

            <Toast 
            config={{info: ({text1}) => <TopMessage title={String(text1)} /> }}
            topOffset={insets.top}
            />
        </NavigationContainer>
    )
}