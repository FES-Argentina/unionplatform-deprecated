import { Notifications } from 'react-native-notifications';

export const handleMessage = async (remoteMessage) => {
  console.log('REMOTE MESSAGE', remoteMessage);
  Notifications.postLocalNotification({
    title: remoteMessage.data.title,
    body: remoteMessage.data.body,
  });
}
