import Toast from 'react-native-toast-message';
import { ErrorToast, SuccessToast } from 'react-native-toast-message';

export const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props) => (
        <SuccessToast
            {...props}
            contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 10 }}
            text1Style={{
                fontSize: 18,
                fontWeight: 'bold',
                marginBottom: 5
            }}
            text2Style={{
                fontSize: 13,
            }}
        />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props) => (
        <ErrorToast
            {...props}
            text1Style={{
                fontSize: 17
            }}
            text2Style={{
                fontSize: 15
            }}
        />
    ),
    /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.
  
      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
    tomatoToast: ({ text1, props }) => (
        <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
            <Text>{text1}</Text>
            <Text>{props.uuid}</Text>
        </View>
    )
};

export const DeviceAdded = (discoveredWifiDeviceCategory) => {
    Toast.show({
        type: 'success',
        text1: 'Device Added',
        text2: `Device added to ${discoveredWifiDeviceCategory} category 🦾`,
        position: 'bottom',
        bottomOffset: 80
    });
}