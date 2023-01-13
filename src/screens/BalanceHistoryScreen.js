import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Context } from "../context/WalletContext";
import HistoryListCmp from "../components/HistoryListCmp";


const BalanceHistoryScreen = ({ navigation }) => {
    const { state } = useContext(Context);
    const [histories, setHistories] = useState(state.histories);
    const [categories, setCategories] = useState([{ title: "Hepsi" }]);


    useEffect(() => {
        for (let category of state.categories) {
            if (category.type === "history") {
                setCategories((old) => [...old, category]);
            };
        }
    }, []);

    const filterHistory = (title) => {
        setHistories(state.histories);
        if (title !== "Hepsi") {
            setHistories([]);
            for (let history of histories) {
                if (history.categoryTitle === title) {
                    setHistories((old) => [...old, history]);
                }
            }
        }
    }

    return (
        <View style={styles.container}>
            <Dropdown style={{ width: 100 }} data={categories} labelField="title" valueField="value" placeholder="Hepsi" onChange={(val) => filterHistory(val.title)} />
            <HistoryListCmp data={histories} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: "auto",
        alignItems: "center",
        marginTop: 20
    }
});

export default BalanceHistoryScreen;