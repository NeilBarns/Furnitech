import { scale, ScaledSheet } from 'react-native-size-matters';
import { screenWidth } from '../../general/Dimensions'

const Styles = ScaledSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#E6E6E6'
    },

    header: {
        width: '100%',
        justifyContent: 'space-around',
        paddingTop: '10@s',
        paddingBottom: '8@s'
    },

    headerTop: {
        flexDirection: 'row',
    },

    roomListContainer: {
        marginTop: '10@s'
    },

    selectedHomeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: '15@s',
    },

    logsAddEntityContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    selectedHomeLabel: {
        fontFamily: 'Poppins-Regular',
        fontSize: '20@s'
    },

    selectedHomeIcon: {
        fontSize: '25@s'
    },

    controlContainer: {
        backgroundColor: 'white',
        marginRight: '15@s',
        elevation: 1,
        padding: '10@s',
        borderRadius: '50@s',
        borderWidth: '1@s',
        borderColor: 'black'
    },

    roomContainer: {
        flexDirection: 'row',
        padding: '15@s',
        paddingBottom: '5@s'
    },

    roomLabel: {
        fontSize: '13@s'
    },

    roomDeviceCountRound: {
        backgroundColor: 'white',
        padding: '2@s',
        paddingHorizontal: '3.5@s',
        borderRadius: '50@s',
        marginLeft: '5@s',
        borderWidth: '1@s',
        borderColor: 'black'
    },

    roomDeviceCountLabel: {
        textAlign: 'center',
        fontSize: '9@s'
    },

    tempAndHumidityMainContainer: {
        paddingHorizontal: '15@s',
        paddingTop: '15@s'
    },

    tempAndHumidityContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingVertical: '15@s',
        paddingHorizontal: '8@s',
        backgroundColor: 'white',
        elevation: 1,
        borderRadius: '10@s',
    },

    temperatureContainer: {
        flex: 0.5,
        flexDirection: 'row',
        alignItems: 'center'
    },

    humidityContainer: {
        flex: 0.5,
        flexDirection: 'row',
        alignItems: 'center'
    },

    tempAndHumidityIcons: {
        width: '40@s',
        height: '40@s',
        resizeMode: 'contain',
        marginRight: '5@s'
    },

    tempAndHumidityLabels: {
        fontSize: '12@s',
        color: '#7F7F7F'
    },

    tempAndHumidityValues: {
        fontSize: '24@s'
    },

    deviceScroller: {
        padding: '15@s',
        flexWrap: 'nowrap'
    },

    deviceContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        paddingBottom: '50@s',
    },

    device: {
        padding: '10@s',
        width: (screenWidth / 1.9) - scale(25),
        height: (screenWidth / 2.2) - scale(25)
    },

    actualDevice: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scale(10),
        elevation: 1
    },

    deviceQuickControlContainer: {
        marginTop: '8@s',
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },

    deviceCountContainer: {
        position: 'absolute',
        top: '5@s',
        right: '5@s'
    },

    deviceCountRound: {
        backgroundColor: '#E6E6E6',
        padding: '2@s',
        paddingHorizontal: '6@s',
        borderRadius: '50@s',
        borderWidth: '1@s',
        borderColor: 'black'
    },

    deviceCategoryContainer: {
        marginTop: '5@s',
    },

    deviceCategoryLabel: {
        fontSize: '12@s',
        color: 'black'
    },

    deviceCountLabel: {
        fontSize: '12@s'
    },

    deviceQuickControlLabel: {
        fontFamily: 'Poppins-Regular',
        fontSize: '13@s',
        color: 'blue'
    },

    deviceIcons: {
        width: '35@s',
        height: '35@s',
        resizeMode: 'contain',
    }
})

export default Styles;