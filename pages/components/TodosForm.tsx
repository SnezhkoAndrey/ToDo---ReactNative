import {
  Button,
  StyleSheet,
  TextInput,
  View,
  SafeAreaView,
  Pressable,
} from "react-native";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

interface TodoFormProps {
  addTodo: (todo: string, date: string) => void;
  changeVisible: () => void;
}

const TodosForm = ({ addTodo, changeVisible }: TodoFormProps) => {
  const [text, setText] = useState("");
  const [date, setDate] = useState<Date>(new Date());

  const handleChangeDate = (event: DateTimePickerEvent, date?: Date) => {
    setDate(date ? date : new Date());
  };

  const handleAdd = () => {
    addTodo(text, String(date));
    setText("");
    changeVisible();
  };
  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.cancelButton} onPress={changeVisible}>
        <MaterialCommunityIcons name="cancel" size={30} color="#913928" />
      </Pressable>
      <TextInput style={styles.input} value={text} onChangeText={setText} />
      <DateTimePicker
        minimumDate={new Date(Date.now())}
        value={date}
        mode="datetime"
        display="spinner"
        onChange={handleChangeDate}
      />
      <Pressable style={styles.addButton} onPress={handleAdd} disabled={!text}>
        <MaterialIcons name="add-task" size={30} color="#28912f" />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#414141",
    position: "relative",
    gap: 20,
  },
  cancelButton: {
    position: "absolute",
    top: 60,
    right: 30,
    paddingVertical: 7,
    paddingHorizontal: 20,
    backgroundColor: "#3d3d3d",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2b2b2b",
  },
  input: {
    height: 50,
    width: 250,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#b8b8b8",
    backgroundColor: "#b8b8b8",
    color: "#2f2f2f",
    padding: 10,
    fontSize: 18,
  },
  addButton: {
    paddingVertical: 7,
    paddingHorizontal: 30,
    backgroundColor: "#3d3d3d",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2b2b2b",
  },
});

export default TodosForm;
