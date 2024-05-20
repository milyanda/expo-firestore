import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { db } from "./firebaseConfig"; // Import the Firestore instance
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore"; // Import Firestore functions

export default function App() {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "notes"));
      const notesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(notesList);
    } catch (error) {
      console.error("Error fetching notes: ", error);
    }
  };

  const addNote = async () => {
    if (noteText.trim() === "") {
      alert("Note cannot be empty");
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "notes"), {
        text: noteText,
        created: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
      setNoteText("");
      fetchNotes();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const deleteNote = async (id) => {
    try {
      await deleteDoc(doc(db, "notes", id));
      console.log("Document deleted with ID: ", id);
      fetchNotes();
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  const renderNoteItem = ({ item }) => (
    <View style={styles.noteCard}>
      <View style={styles.noteItem}>
        <Text style={styles.noteText}>{item.text}</Text>
        <TouchableOpacity
          onPress={() => deleteNote(item.id)}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes App</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a new note"
        value={noteText}
        onChangeText={setNoteText}
      />
      <TouchableOpacity onPress={addNote} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Note</Text>
      </TouchableOpacity>
      <FlatList
        data={notes}
        renderItem={renderNoteItem}
        keyExtractor={(item) => item.id}
        style={styles.notesList}
        contentContainerStyle={styles.notesListContent}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    paddingHorizontal: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
  addButton: {
    height: 40,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: "100%",
    marginBottom: 20,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
  },
  notesList: {
    width: "100%",
  },
  notesListContent: {
    paddingBottom: 20,
  },
  noteCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  noteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  noteText: {
    fontSize: 16,
    flex: 1,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: "white",
  },
});

// import { StatusBar } from "expo-status-bar";
// import { useEffect } from "react";
// import { Button, StyleSheet, Text, TextInput, View } from "react-native";
// import {
//   db,
//   collection,
//   addDoc,
//   getDocs,
//   getFirestore,
// } from "./firebaseConfig";

// export default function App() {
//   useEffect(() => {
//     readData();
//     // try {
//     //   const docRef = await addDoc(collection(db, "employees"), {
//     //     firstName: "Milyanda",
//     //     lastName: "Vania",
//     //     born: 2001,
//     //   });
//     //   console.log("Document written with ID: ", docRef.id);
//     // } catch (e) {
//     //   console.error("Error adding document: ", e);
//     // }
//   }, []);

//   const readData = async () => {
//     const querySnapshot = await getDocs(collection(db, "users"));
//     querySnapshot.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots
//       console.log(`${doc.id} => ${doc.data()}`);
//       console.log(doc.data());
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput placeholder="Add a Note"></TextInput>
//       <Button title="Add"></Button>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",

//   },
// });
