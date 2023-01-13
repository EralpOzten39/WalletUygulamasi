import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import axiosApi from "../api/axiosApi";
import MessageCmp from "../components/MessageCmp";
import { Context } from "../context/WalletContext";

const AddExpenseScreen = ({ navigation, userId, walletId }) => {
    const { state } = useContext(Context);
    const [title, setTitle] = useState("");
    const [cost, setCost] = useState(0);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("Diğer");
    const [submit, setSubmit] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        for (let category of state.categories) {
            if (category.type === "expense") {
                setCategories((old) => [...old, category]);
            };
        }
    }, []);

    const addExpense = async () => {
        if (!cost) {
            setMessage("Sayı Giriniz");
            setSubmit(!submit);
        } else {
            await axiosApi.post("/expense", { userId: state.userData._id, categoryTitle: category, title: title, cost: cost })
                .then((resp) => {
                    //const newBalance = state.walletData.balance + ammount;
                    //state.walletData.balance = newBalance;
                    setMessage("Harcamanız Başarılı");
                    setSubmit(!submit);
                })
                .catch((err) => {
                    setMessage("Harcama Eklenemedi");
                    setSubmit(!submit);
                    throw err;
                });
        }
    }


    return !submit ? (
        <View style={styles.container}>
            <Text style={styles.title}>Harcama Girin</Text>
            <Dropdown style={{ width: 100 }} data={categories} labelField="title" valueField="value" placeholder="Diğer" onChange={(val) => setCategory(val.title)} />
            <TextInput style={styles.input} placeholder="Başlık" onChangeText={(newText) => { setTitle(newText) }} />
            <TextInput style={styles.input} placeholder="Tutar" onChangeText={(newText) => { setCost(parseFloat(newText)) }} />
            <Button title="Ekle" onPress={() => addExpense()}></Button>
        </View>
    ) : (<MessageCmp message={message} rtn={() => { setSubmit(!submit); navigation.navigate("Expense"); }} />);
}

const styles = StyleSheet.create({
    container: {
        width: 400,
        height: 330,
        margin: "auto",
        alignItems: "center"
    },
    input: {
        borderColor: "black",
        borderWidth: 1,
        height: 50,
        width: 300,
        margin: 10,
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: 20

    },
    button: {
        width: 200,
        height: 40,
        margin: 20
    }, title: {
        fontSize: 20,
        marginBottom: 20
    }
});

export default AddExpenseScreen;