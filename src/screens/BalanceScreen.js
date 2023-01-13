import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import axiosApi from "../api/axiosApi";
import MessageCmp from "../components/MessageCmp";
import { Context } from "../context/WalletContext";

const BalanceScreen = ({ navigation }) => {
    const { state } = useContext(Context);
    const [balance, setBalance] = useState("Yükleniyor...");
    const [submit, setSubmit] = useState(false);
    const [message, setMessage] = useState("");

    //Kategorileri Getir
    useEffect(() => {
        axiosApi.get("/category")
            .then((resp) => {
                resp = resp.data;
                if (resp.isSuccess) {
                    state.categories = resp.body;
                } else {
                    console.log("Kategoriler Getirilemedi");
                }
            })
            .catch((err) => {
                console.log("Bağlantı Hatası");
                throw err;
            });

    }, []);

    //Kullanıcı Cüzdanını Getir
    useEffect(() => {
        axiosApi.post("/wallet/:userId", { userId: state.userData._id })
            .then((resp) => {
                resp = resp.data;
                if (resp.isSuccess) {
                    state.walletData = resp.body;
                    setBalance(state.walletData.balance);
                } else {
                    setBalance("Cüzdan Bulunamadı");
                }
            })
            .catch((err) => {
                setBalance("Bağlantı Hatası");
                throw err;
            });
    }, [balance]);

    //Bakiye Geçmişini Getir ve Bakiye Geçmişi Ekranına Git
    const navHistory = async () => {
        await axiosApi.post("/history/:walletId", { walletId: state.walletData._id })
            .then((resp) => {
                resp = resp.data;
                if (resp.isSuccess) {
                    state.histories = resp.body;
                    navigation.navigate("BalHistory");
                } else {
                    setMessage("Hata");
                    setSubmit(!submit);
                }
            })
            .catch((err) => {
                setMessage("Bağlantı Hatası");
                setSubmit(!submit);
                throw err;
            });
    }

    //Harcama Geçmişini Getir ve Harcama Geçmişi Ekranına Git
    const navExpense = async () => {
        await axiosApi.post("/expense/:walletId", { walletId: state.walletData._id })
            .then((resp) => {
                resp = resp.data;
                if (resp.isSuccess) {
                    state.expenses = resp.body;
                    navigation.navigate("ExpHistory");
                } else {
                    setMessage("Hata");
                    setSubmit(!submit);
                }
            })
            .catch((err) => {
                setMessage("Bağlantı Hatası");
                setSubmit(!submit);
                throw err;
            });
    }

    //Çıkış Yap
    const logout = () => {
        state.userData = {};
        state.walletData = {};
        state.expenses = {};
        state.histories = {};
        navigation.navigate("Login");
    }

    return !submit ? (
        <View style={styles.container}>
            <Text style={styles.title}>Bakiye : {balance}</Text>
            <View style={styles.button}>
                <Button title="Yenile" onPress={() => setBalance("Yükleniyor...")} />
                <Button title="Bakiye Yükle" onPress={() => { navigation.navigate("AddBalance") }} />
                <Button title="Harcama Ekle" onPress={() => { navigation.navigate("AddExpense") }} />
                <Button title="Bakiye Yükleme Geçmişi" onPress={() => navHistory()} />
                <Button title="Harcama Geçmişi" onPress={() => navExpense()} />
                <Button title="Çıkış Yap" onPress={() => logout()} />
            </View>
        </View>
    ) : (<MessageCmp message={message} rtn={() => { setSubmit(!submit); navigation.navigate("Balance"); }} />);
}

const styles = StyleSheet.create({
    container: {
        width: 400,
        height: 300,
        margin: "auto",
        alignItems: "center"
    },
    button: {
        width: 250,
        height: 40,
        margin: 20
    }, title: {
        fontSize: 30,
        marginBottom: 10
    }
});

export default BalanceScreen;