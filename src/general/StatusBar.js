import { StatusBar } from 'react-native'

const changeStatusBarStyle = (translucent, color, style) =>
{
    StatusBar.setTranslucent(translucent);
    StatusBar.setBackgroundColor(color);
    StatusBar.setBarStyle(style);
    
}

export { changeStatusBarStyle }