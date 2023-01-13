import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ExpenseCmp = ({ item }) => {
    return (
        <View style={styles.container}>
            <Text>Tarih : {item.date.substring(0, 10)}</Text>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.title}>{item.categoryTitle}  -  </Text>
                <Text style={styles.title}>{item.title}  -  </Text>
                <Text style={styles.title}>{item.cost}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        width: 250,
        marginLeft: "auto",
        marginRight: "auto",
        alignItems: "center",
        borderWidth: 1
    },
    title: {
        fontSize: 15
    }
});


export default ExpenseCmp;