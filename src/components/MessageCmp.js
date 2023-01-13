import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const MessageCmp = ({ message, rtn }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{message}</Text>
            <Button title="Tamam" onPress={rtn} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 400,
        height: 330,
        margin: "auto",
        alignItems: "center"
    }, title: {
        fontSize: 30,
        marginBottom: 20
    }
});

export default MessageCmp;