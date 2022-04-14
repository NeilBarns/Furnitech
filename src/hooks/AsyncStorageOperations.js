import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorageOperations = () => {

    const initializeStorage = async () => {
        await AsyncStorage.clear()
        await AsyncStorage.setItem('@userID', 'NeilBarns');
        // let keys = []
        // try {
        //     keys = await AsyncStorage.getAllKeys()
        // } catch (e) {
        //     // read key error
        // }

        // const keys = await AsyncStorage.getItem('@userID');
    }

    const getUserID = async () => {
        const userID = await AsyncStorage.getItem('@userID');
        return userID;
    }



    return {
        initializeStorage,
        getUserID
    }
}

export default AsyncStorageOperations