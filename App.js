import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View, PermissionsAndroid, Platform } from "react-native";
import SmsListener from 'react-native-android-sms-listener';

export default function App() {
  async function requestReadSmsPermission() {
    try {
      var granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: "Auto Verification OTP",
          message: "need access to read sms, to verify OTP",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("sms read permissions granted", granted);
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
          {
            title: "Receive SMS",
            message: "Need access to receive sms, to verify OTP",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("RECEIVE_SMS permissions granted", granted);
        } else {
          console.log("RECEIVE_SMS permissions denied");
        }
      } else {
        console.log("sms read permissions denied");
      }
    } catch (err) {
      console.log(err);
    }
  }
  
  useEffect(() => {
     requestReadSmsPermission();
     console.log('Hello');
     const subscribe = SmsListener.addListener(message => {
      console.log('new message', message);
     });
     
     return () => subscribe.remove();
  }, []);
  
  return (
    <View style={styles.container}>
      <Text>Get SMS Android App</Text>
      <Text>API Version {Platform.Version?.toString()}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
