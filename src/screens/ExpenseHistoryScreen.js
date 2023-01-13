import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Context } from "../context/WalletContext";
import ExpenseListCmp from "../components/ExpenseListCmp";


const ExpenseHistoryScreen = ({ navigation }) => {
    const { state } = useContext(Context);
    const [expenses, setExpenses] = useState(state.expenses);
    const [categories, setCategories] = useState([{ title: "Hepsi" }]);


    useEffect(() => {
        for (let category of state.categories) {
            if (category.type === "expense") {
                setCategories((old) => [...old, category]);
            };
        }
    }, []);

    const filterExpense = (title) => {
        setExpenses(state.expenses);
        if (title !== "Hepsi") {
            setExpenses([]);
            for (let expense of expenses) {
                if (expense.categoryTitle === title) {
                    setExpenses((old) => [...old, expense]);
                }
            }
        }
    }

    return (
        <View style={styles.container}>
            <Dropdown style={{ width: 100 }} data={categories} labelField="title" valueField="value" placeholder="Hepsi" onChange={(val) => filterExpense(val.title)} />
            <ExpenseListCmp data={expenses} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: "auto",
        alignItems: "center",
        marginTop:20
    }
});

export default ExpenseHistoryScreen;