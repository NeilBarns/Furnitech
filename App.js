import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { RootSiblingParent } from 'react-native-root-siblings';
import HomeScreen from './src/screens/Home/HomeScreen'
import { ScaledSheet } from 'react-native-size-matters';

export default function App() {
  let [fontsLoaded] = useFonts({
    'Nunito-Bold': require('./assets/fonts/Nunito-Bold.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return <RootSiblingParent>
      {/* <View style={styles.container}> */}
        {/* <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" /> */}
        <HomeScreen />
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
