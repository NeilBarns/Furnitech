import React from 'react'
import { Text, View, StatusBar, TouchableOpacity, ScrollView, Image } from 'react-native'
import Styles from '../../screens/Home/HomeScreenStyles';

const DHT = () => {
    return (
        <View style={Styles.tempAndHumidityMainContainer}>
            <View style={Styles.tempAndHumidityContainer}>
                <View style={Styles.temperatureContainer}>
                    <Image source={{ uri: 'https://test-iworx.online/assets/temperature.png' }}
                        style={Styles.tempAndHumidityIcons} />
                    <View>
                        <Text style={Styles.tempAndHumidityLabels}>Room temperature</Text>
                        <Text style={Styles.tempAndHumidityValues}>20°C</Text>
                    </View>
                </View>
                <View style={Styles.humidityContainer}>
                    <Image source={{ uri: 'https://test-iworx.online/assets/humid.png' }}
                        style={Styles.tempAndHumidityIcons} />
                    <View>
                        <Text style={Styles.tempAndHumidityLabels}>Room humidity</Text>
                        <Text style={Styles.tempAndHumidityValues}>20%</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default DHT