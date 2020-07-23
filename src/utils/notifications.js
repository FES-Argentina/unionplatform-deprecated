import PushNotification from "react-native-push-notification";

export const handleMessage = async (message) => {
  PushNotification.localNotification({
    title: message.data.title,
    message: message.data.body,
    visibility: 'private',
    largeIcon: '',
  });
}
