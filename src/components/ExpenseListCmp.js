import React from "react";
import { View, Text, SytleSheet, FlatList } from "react-native";
import ExpenseCmp from "./ExpenseCmp";

const ExpenseListCmp = ({ data }) => {
    return (
        <View>
            <FlatList data={data} renderItem={({ item }) => {
                return <ExpenseCmp item={item} />
            }} />
        </View>
    );
};

export default ExpenseListCmp;