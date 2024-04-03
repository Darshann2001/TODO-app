import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomInputWithIconButton from './CustomInputWithIconButton';
import Gif from './Gif';

const TodoList = ({ darkMode, setDarkMode }) => {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState('');
    const [completed, setCompleted] = useState(Array(todos.length).fill(false));
    const [errorMessage, setErrorMessage] = useState('');
    const [categories, setCategories] = useState(['Work', 'Personal', 'Shopping']);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [customTag, setCustomTag] = useState('');
    const [customTags, setCustomTags] = useState([]);
    const [showCustomInput, setShowCustomInput] = useState(false);

    const addTodo = () => {
        const trimmedText = text.trim(); // Remove leading and trailing whitespace
        if (trimmedText !== '') {
            if (editIndex !== null) {
                // Update existing todo if editing
                const updatedTodos = [...todos];
                updatedTodos[editIndex] = { text: trimmedText, category: selectedCategory || 'Uncategorized' };
                setTodos(updatedTodos);
                setEditIndex(null);
            } else {
                // Add new todo
                setTodos([...todos, { text: trimmedText, category: selectedCategory || 'Uncategorized' }]);
                setCompleted([...completed, false]); // Initialize completion status for new todo
            }
            setText('');
            setErrorMessage(''); // Clear error message if input is valid
        } else {
            // Display an error message to the user
            setErrorMessage('Todo cannot be empty');
        }
    };

    const deleteTodo = index => {
        const updatedTodos = [...todos];
        updatedTodos.splice(index, 1);
        setTodos(updatedTodos);

        const updatedCompleted = [...completed];
        updatedCompleted.splice(index, 1);
        setCompleted(updatedCompleted);
    };

    const toggleTodo = index => {
        const updatedCompleted = [...completed];
        updatedCompleted[index] = !completed[index];
        setCompleted(updatedCompleted);
    };

    const editTodo = index => {
        setEditIndex(index);
        setText(todos[index].text); // Pre-fill input with existing todo text
        setSelectedCategory(todos[index].category);
    };

    const handleCategorySelect = (category) => {
        if (selectedCategory === category) {
            // If the clicked category is already selected, deselect it
            setSelectedCategory('');
        } else {
            // Otherwise, select the clicked category
            setSelectedCategory(category);
        }
    };


    // const handleCustomTagSelect = tag => {
    //     setSelectedCategory(tag);
    // };

    const deleteCategory = (category) => {
        if (categories.includes(category)) {
            // If the category is a hardcoded tag, don't delete it
            return;
        }
        // If the category is a custom tag, remove it from the list
        const updatedCustomTags = customTags.filter(tag => tag !== category);
        setCustomTags(updatedCustomTags);
        // Clear selectedCategory if the deleted category was selected
        if (selectedCategory === category) {
            setSelectedCategory('');
        }
    };

    const addCustomTag = () => {
        if (customTag.trim() !== '') {
            if (customTags.includes(customTag)) {
                Alert.alert('Duplicate Tag', 'This tag already exists. Please enter a different tag.');
                // console.log("Before setting empty:", customTag); // Add this line for debugging
                setCustomTag('');
                // console.log("After setting empty:", customTag); // Add this line for debugging
                return;
            }
            setCustomTags([...customTags, customTag]);
            setCustomTag('');
        }
    };

    const getTodoItemBackgroundColor = (priority) => {
        switch (priority) {
            case 1:
                return darkMode ? '#ff9999' : '#ff6666'; // Red for high priority
            case 2:
                return darkMode ? '#ffb366' : '#ff9933'; // Orange for medium priority
            case 3:
                return darkMode ? '#f9f9f9' : '#000000'; // White or black for low priority
            default:
                return darkMode ? '#f9f9f9' : '#000000'; // Default to white or black
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: darkMode ? '#333' : '#fff' }]}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, { backgroundColor: darkMode ? '#444' : '#f9f9f9', color: darkMode ? '#fff' : '#000' }]}
                    onChangeText={setText}
                    value={text}
                    placeholder="Enter todo"
                    onSubmitEditing={addTodo} // Call addOrUpdateTodo when user submits text
                    placeholderTextColor={darkMode ? '#ccc' : '#888'}
                />
                <Button onPress={addTodo} title={editIndex !== null ? 'Update Todo' : 'Add Todo'} />
            </View>
            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
            <View style={styles.categoryContainer}>
                <Text style={[styles.categoryTitle, { color: darkMode ? '#ddd' : '#000' }]}>Categories:</Text>
                <ScrollView horizontal={true} style={styles.categoriesContainer}>
                    <View style={styles.categories}>
                        {/* Render hardcoded categories */}
                        {categories.map(category => (
                            <TouchableOpacity
                                key={category}
                                onPress={() => handleCategorySelect(category)}
                                onLongPress={() => deleteCategory(category)}
                                style={[
                                    styles.tag,
                                    {
                                        backgroundColor: selectedCategory === category ? 'orange' : (darkMode ? '#444' : '#f0f0f0'),
                                        borderColor: darkMode ? '#666' : 'transparent'
                                    }
                                ]}
                            >
                                <Text style={{ color: darkMode ? '#fff' : '#000' }}>{category}</Text>
                            </TouchableOpacity>

                        ))}
                        {/* Render custom tags */}
                        {customTags.map(tag => (
                            <TouchableOpacity
                                key={tag}
                                onPress={() => handleCategorySelect(tag)}
                                onLongPress={() => deleteCategory(tag)}
                                style={[
                                    styles.tag,
                                    {
                                        backgroundColor: selectedCategory === tag ? 'orange' : (darkMode ? '#444' : '#f0f0f0'),
                                        borderColor: darkMode ? '#666' : 'transparent'
                                    }
                                ]}
                            >
                                <Text style={{ color: darkMode ? '#fff' : '#000' }}>{tag}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>

                {/* <TextInput
                    // style={styles.inputCustomTag}
                    onChangeText={setCustomTag}
                    value={customTag}
                    placeholder="Add Custom Tag"
                    onSubmitEditing={addCustomTag}
                /> */}
                {showCustomInput ? <CustomInputWithIconButton
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    customTags={customTags}
                    setCustomTag={setCustomTag}
                    showCustomInput={showCustomInput}
                    setShowCustomInput={setShowCustomInput}
                    customTag={customTag}
                    setCustomTags={setCustomTags}
                    placeholder={'Add Custom Tag'}
                    addCustomTag={addCustomTag}
                // onPress={setShowCustomInput(false)}
                /> :
                    <View style={styles.displayFlex}>
                        <Text style={{ color: darkMode ? '#ddd' : '#000' }}>Click to add tags here -> </Text>
                        <TouchableOpacity onPress={() => setShowCustomInput(true)} style={{ padding: 10 }}>
                            <Ionicons name="add-circle-outline" size={24} color={darkMode ? '#fff' : 'black'} />
                        </TouchableOpacity>
                    </View>
                }
            </View>

            {todos.length > 0 ?
                <FlatList
                    data={todos} style={{ marginTop: 10 }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => toggleTodo(index)}>
                            <View style={[styles.todoItem, { backgroundColor: getTodoItemBackgroundColor(item.priority) }]}>
                                <Text numberOfLines={5} style={{ textDecorationLine: completed[index] ? 'underline line-through' : 'none', color: darkMode ? '#ccc' : '#000' }}>{item.text}</Text>
                                <Text style={[styles.categoryText, { color: darkMode ? '#999' : 'gray' }]}>{item.category}</Text>
                                <View style={styles.buttonContainer}>
                                    <Button
                                        onPress={() => editTodo(index)}
                                        title="✏️"
                                        color={darkMode ? 'black' : 'white'}
                                    // style={styles.iconButton}
                                    // style={{ backgroundColor: darkMode ? 'black' : '#fff' }}
                                    />
                                    <Button
                                        onPress={() => deleteTodo(index)}
                                        title="🗑️"
                                        color={darkMode ? 'black' : 'white'}
                                        style={styles.iconButton}
                                    // style={{ backgroundColor: darkMode ? 'black' : '#fff' }}
                                    />

                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
                :
                <View style={styles.emptyContainer}>
                    <Ionicons name="add-circle" size={64} color={darkMode ? '#fff' : 'black'} />
                    <Text style={[styles.emptyText, { color: darkMode ? 'white' : 'black' }]}>Add todo</Text>
                </View>
                // <Gif darkMode={darkMode} />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    categories: {
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: 'row',
        margin: 0
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginRight: 10,
        paddingHorizontal: 10,
    },
    todoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'lightgray',
        padding: 10,
        marginBottom: 10,
        flex: 1, flexWrap: 'wrap'
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 4
    },
    // iconButton: {
    //     borderRadius: 4,
    //     padding: 10,
    //     marginVertical: 5,
    //     shadowColor: 'black',
    //     shadowOffset: {
    //         width: 0,
    //         height: 2,
    //     },
    //     shadowOpacity: 0.25,
    //     shadowRadius: 3.84,
    //     elevation: 5,
    // },
    categoryTitle: {
        fontSize: 14,
        margin: 2,
    },
    categoryText: {
        fontSize: 12,
        color: 'gray',
        marginBottom: 5,
    },
    inputCustomTag: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 10,
    },
    tag: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 5,
        paddingHorizontal: 10,
        margin: 2,
        borderRadius: 20,
    },
    selectedTag: {
        backgroundColor: 'orange',
        paddingVertical: 5,
        paddingHorizontal: 10,
        margin: 5,
        borderRadius: 20,
    },
    displayFlex: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // borderWidth: 1,
        // borderColor: 'gray',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorMessage: {
        color: 'red',
        marginBottom: 10,
    },
});

export default TodoList;
