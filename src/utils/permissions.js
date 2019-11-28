import { PermissionsAndroid, TouchableHighlight, View } from 'react-native';

export async function requestStoragePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Almacenamiento',
        message: 'La aplicación necesita acceso al almacenamiento para crear el PDF.',
        buttonPositive: 'Aceptar',
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
    return false;
  } catch (err) {
    console.warn(err);
  }
}


