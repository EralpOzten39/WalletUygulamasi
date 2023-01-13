import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import HistoryCmp from "./HistoryCmp";

const HistoryListCmp = ({ data }) => {
    return (
        <View style={styles.container}>
            <FlatList data={data} renderItem={({ item, index }) => {
                return <HistoryCmp item={item} />
            }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: "auto",
        alignItems: "center"
    }
});

export default HistoryListCmp;