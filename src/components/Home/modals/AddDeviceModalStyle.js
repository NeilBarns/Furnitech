import { ScaledSheet } from 'react-native-size-matters';

const AddDeviceModalStyle = ScaledSheet.create({

    container: {
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
        paddingTop: '50@s',
        paddingHorizontal: '15@s'
    },

    header: {
        padding: '15@s',
        paddingTop: '40@s',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        elevation: 2,
        marginBottom: '10@s'
    },

    addDeviceLabel: {
        fontFamily: 'Nunito-Bold',
        fontSize: '35@s'
    },

    descriptionLabel: {
        fontSize: '12@s',
        marginTop: '10@s',
        lineHeight: '25@s',
        color: 'grey'
    },

    detection: {
        flex: 1,
        width: '100%',
        marginTop: '15@s',
        borderTopWidth: '1@s',
        borderTopColor: '#E6E6E6',
        paddingTop: '20@s'
    },


    checkerCard: {
        marginBottom: '20@s'
    },

    checkerCardMain: {
        backgroundColor: '#89eb86',
        width: '100%',
        borderRadius: '5@s',
        elevation: 1,
        height: '35@s',
        flexDirection: 'row',
        paddingVertical: '5@s'
    },

    checkerCardIconContainer: {
        width: '15%',
        height: '100%',
        padding: '0@s'
    },

    checkerCardIcon: {
        height: '100%',
        width: '100%'
    },

    checkerCardLbl: {
        width: '85%',
        justifyContent: 'center'
    },

    checkerCardMain_negative: {
        backgroundColor: '#f2925e',
        width: '100%',
        borderRadius: '5@s',
        elevation: 1,
        height: '35@s',
        flexDirection: 'row',
        paddingVertical: '5@s'
    },

    checkerCardIconContainer_negative: {
        width: '15%',
        height: '100%',
        padding: '3@s'
    },

    netInfoContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        marginTop: '15@s',
        marginBottom: '25@s'
    },

    ssidPwdContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        marginTop: '5@s'
    },

    detectBtnContainer: {
        marginTop: '20@s',
        width: '100%',
        paddingHorizontal: '20@s'
    },

    detectBtn: {
        backgroundColor: '#d2f25e',
        paddingVertical: '12@s',
        borderRadius: '5@s',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1
    },

    detectBtnLabel: {
        fontWeight: 'bold',
        letterSpacing: '1@s'
    },

    cancelBtnContainer: {
        marginTop: '20@s',
        width: '100%',
        paddingHorizontal: '20@s',
        paddingBottom: '20@s'
    },

    cancelBtn: {
        backgroundColor: '#FFFFFF',
        borderColor: 'black',
        borderWidth: '1@s',
        paddingVertical: '12@s',
        borderRadius: '5@s',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1
    },

    cancelBtnLabel: {
        fontWeight: 'bold',
        letterSpacing: '1@s'
    },

    normalLabel: {
        fontSize: '13@s',
        marginBottom: '5@s'
    },

    bolded: {
        fontWeight: 'bold',
        fontSize: '15@s'
    },

    ssidLabel: {
        fontWeight: 'bold',
        fontSize: '15@s'
    },

    passwordInputContainer: {
        flexDirection: 'row',
        borderWidth: '1.5@s',
        borderColor: '#E6E6E6',
        width: '80%',
        borderRadius: '5@s',
        marginTop: '10@s',
        height: '40@s'
    },

    passwordInput: {
        width: '85%'
    },

    revealPasswordButton: {
        width: '15%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    revealPasswordButtonIcon: {
        fontSize: '20@s'
    },

    cancelButtonContainer: {
        flex: 1,
        justifyContent: 'center',
    },

    saveButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },

    mainContainer: {
        flex: 1
    },

    fileContainer: {
        backgroundColor: 'black',
        alignSelf: 'center',
        height: '400@s',
        width: '100%',
        marginBottom: '10@s'
    },

    descriptionContainer: {
        paddingHorizontal: '5@s'
    },

    documentation: {
        borderColor: 'black',
        // padding: '15@s',
        borderColor: '#7f827e',
        borderBottomWidth: '2@s',
        borderRadius: '5@s',
        marginTop: '10@s',
        marginBottom: '20@s',
        fontSize: '18@s'
    },
});

export default AddDeviceModalStyle;
