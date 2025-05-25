import { Text, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import AddGoals from "./Components/AddGoals";
import ListGoals from "./Components/ListGoals";
import Store from "./store/Store";
import GoalSample from "./Components/GoalSample";

const App = () => {
  return (
    <Provider store={Store}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.header}>🎯 Welcome to Goal Tracker</Text>
          <AddGoals />
          <View style={styles.divider} />
          <ListGoals />
          <View style={styles.divider} />
          <GoalSample />
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: '#333',
  },
  divider: {
    height: 20,
  },
});

export default App;
