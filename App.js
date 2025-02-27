import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { RootSiblingParent } from 'react-native-root-siblings';
import HomeScreen from './src/screens/Home/HomeScreen'
import { ScaledSheet } from 'react-native-size-matters';

//CONTEXTS
import useModalVisibilityGlobal from './src/hooks/useModalVisibilityGlobal';
import useNetInfoGlobal from './src/hooks/useNetInfoGlobal';
import useDeviceDiscoveryGlobal from './src/hooks/useDeviceDiscoveryGlobal';
import useUserManagementGlobal from './src/hooks/useUserManagementGlobal';
import {
  useModalContext,
  useNetInfoContext,
  useDeviceDiscoveryContext,
  useUserManagementContext
} from './src/hooks/ContextProvider';

import app from './src/hooks/FirebaseOperations';



export default function App() {
  let [fontsLoaded] = useFonts({
    'Nunito-Bold': require('./assets/fonts/Nunito-Bold.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
  });

  useEffect(() => {
    app;
  }, [])
  

  const ModalVisibilityGlobal = useModalVisibilityGlobal();
  const NetInfoGlobal = useNetInfoGlobal();
  const DiscoveredDeviceGlobal = useDeviceDiscoveryGlobal();
  const UserManagementGlobal = useUserManagementGlobal();

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return <RootSiblingParent>
      {/* <View style={styles.container}> */}
      {/* <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" /> */}
      <useModalContext.Provider value={ModalVisibilityGlobal}>
        <useNetInfoContext.Provider value={NetInfoGlobal}>
          <useUserManagementContext.Provider value={UserManagementGlobal}>
            <useDeviceDiscoveryContext.Provider value={DiscoveredDeviceGlobal}>
              <HomeScreen />
            </useDeviceDiscoveryContext.Provider>
          </useUserManagementContext.Provider>
        </useNetInfoContext.Provider>
      </useModalContext.Provider>
      {/* </View> */}
    </RootSiblingParent>;
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
