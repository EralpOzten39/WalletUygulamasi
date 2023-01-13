import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import axiosApi from "../api/axiosApi";
import MessageCmp from "../components/MessageCmp";
import { Context } from "../context/WalletContext";

const AddBalanceScreen = ({ navigation, userId }) => {
    const { state } = useContext(Context);
    const [ammount, setAmmount] = useState(0.0);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("Diğer");
    const [submit, setSubmit] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        for (let category of state.categories) {
            if (category.type === "history") {
                setCategories((old) => [...old, category]);
            };
        }
    }, []);

    const addBalance = async () => {
        if (!ammount) {
            setMessage("Sayı Giriniz");
            setSubmit(!submit);
        } else {
            await axiosApi.patch("/wallet/:userId", { userId: state.userData._id, categoryTitle: category, ammount: ammount })
                .then((resp) => {
                    setMessage("Yüklemeniz Başarılı");
                    setSubmit(!submit);

                })
                .catch((err) => {
                    setMessage("Yükleme Başarısız");
                    setSubmit(!submit);
                    throw err;
                });
        }
    }

    return !submit ? (
        <View style={styles.container}>
            <Text style={styles.title}>Eklencek Miktarı Girin</Text>
            <Dropdown style={{ width: 100 }} data={categories} labelField="title" valueField="title" placeholder="Diğer" onChange={(val) => setCategory(val.title)} />
            <TextInput style={styles.input} placeholder="Miktar" onChangeText={(newText) => { setAmmount(parseFloat(newText)) }} />
            <Button title="Ekle" onPress={() => addBalance()}></Button>
        </View>
    ) : (<MessageCmp message={message} rtn={() => { setSubmit(!submit); navigation.navigate("AddBalance"); }} />);
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

export default AddBalanceScreen;