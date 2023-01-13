import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import AddBalanceScreen from "./src/screens/AddBalanceScreen";
import BalanceScreen from "./src/screens/BalanceScreen";
import LoginScreen from "./src/screens/LoginScreen";
import { Provider } from "./src/context/WalletContext";
import ExpenseHistoryScreen from "./src/screens/ExpenseHistoryScreen";
import BalanceHistoryScreen from "./src/screens/BalanceHistoryScreen";
import AddExpenseScreen from "./src/screens/AddExpenseScreen";

const navigator = createStackNavigator(
  {
    Login: LoginScreen,
    Balance: BalanceScreen,
    AddBalance: AddBalanceScreen,
    AddExpense: AddExpenseScreen,
    ExpHistory: ExpenseHistoryScreen,
    BalHistory: BalanceHistoryScreen
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
      title: "Wallet App",
    },
  }
);

const App = createAppContainer(navigator);

export default () => {
  return (<Provider>
    <App />
  </Provider>);
};
