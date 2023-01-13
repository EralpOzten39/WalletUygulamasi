import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import axiosApi from "../api/axiosApi";
import MessageCmp from "../components/MessageCmp";
import { Context } from "../context/WalletContext";

const LoginScreen = ({ navigation }) => {
    const { state } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submit, setSubmit] = useState(false);
    const [message, setMessage] = useState("");

    const login = async () => {
        await axiosApi.post("/user/signin", { email: email, password: password })
            .then((resp) => {
                resp = resp.data;
                if (resp.isSuccess) {
                    state.userData = resp.body;
                    navigation.navigate("Balance");
                } else {
                    setMessage("Hata");
                    setSubmit(!submit);
                }
            })
            .catch((err) => {
                setMessage("Bağlantı Hatası");
                setSubmit(!submit);
            });
    }

    const register = async () => {
        await axiosApi.post("/user/signup", { email: email, password: password })
            .then((resp) => {
                resp = resp.data;
                if (resp.isSuccess) {
                    setMessage("Kaydınız Başarılı");
                } else if (!resp.isSuccess) {
                    setMessage("Kayıt Başarısız");
                } else {
                    setMessage("Hatalı");
                }
            })
            .catch((err) => {
                setMessage("Bağlantı Hatası");
                throw err;
            });
        setSubmit(!submit);
    }

    return !submit ? (
        <View style={styles.container}>
            <Text style={styles.title}>Giriş</Text>
            <TextInput style={styles.input} placeholder="Email" onChangeText={(newText) => setEmail(newText)} />
            <TextInput secureTextEntry={true} style={styles.input} placeholder="Şifre" onChangeText={(newText) => setPassword(newText)} />
            <View style={styles.button}>
                <Button title="Giriş" onPress={() => login()} />
                <Button title="Kayıt" onPress={() => register()} />
            </View>
        </View >
    ) : (<MessageCmp message={message} rtn={() => { setSubmit(!submit); navigation.navigate("Login"); }} />);
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
        fontSize: 30,
        marginBottom: 20
    }
});

export default LoginScreen;