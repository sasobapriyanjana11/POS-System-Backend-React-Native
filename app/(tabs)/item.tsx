import {SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {useState} from "react";
import IItem from "../../models/IItem";
import { Button } from 'react-native-paper';

export default function Item() {
    const [itemId, setItemId] = useState(0);
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);

    const [items, setItem] = useState<IItem[]>([]);

    function handleSubmit() {
        if (!itemId || !name || !quantity || !price) {
            alert("All item fields required");
            return;
        }

        // Duplicate code check
        if (items.some(item => item.itemId === itemId)) {
            alert("Item with this code already exists!");
            return;
        }

        const newItem: IItem = {itemId, name, quantity, price };
        setItem([...items, newItem]);

        clearFields();
    }

    function clearFields() {
        setItemId(0);
        setName('');
        setQuantity(0);
        setPrice(0);
    }

    function handleUpdate() {
        if (!itemId) {
            alert("Enter a code to update the Item!");
            return;
        }

        setItem(prevItems =>
            prevItems.map(item =>
                item.itemId === itemId ? { ...item, name, quantity, price } : item
            )
        );
        alert("Item updated successfully!");
        clearFields();
    }

    function handleDelete() {
        if (!itemId) {
            alert("Enter a code to delete the Item!");
            return;
        }

        const ItemList = items.filter(item => item.itemId !== itemId);
        if (ItemList.length === items.length) {
            alert("No Item found with this code!");
            return;
        }

        setItem(ItemList);
        alert("Item deleted successfully!");

        clearFields();
    }

    return (
        <SafeAreaView style={styles.layout}>
            <View style={styles.container}>
                <View style={styles.dataInput}>
                    <TextInput
                        value={itemId === 0 ? "" : itemId.toString()}
                        onChangeText={(text) => setItemId(Number(text) || 0)}
                        keyboardType="numeric"
                        placeholder="Code"
                        style={styles.input}
                    />
                    <TextInput value={name} onChangeText={setName} placeholder="Name" style={styles.input} />
                    <TextInput
                        value={quantity === 0 ? "" : quantity.toString()}
                        onChangeText={(text) => setQuantity(Number(text) || 0)}
                        keyboardType="numeric"
                        placeholder="Quantity"
                        style={styles.input}
                    />
                    <TextInput
                        value={price === 0 ? "" : price.toString()}
                        onChangeText={(text) => setPrice(Number(text) || 0)}
                        keyboardType="numeric"
                        placeholder="Price"
                        style={styles.input}
                    />

                    <View style={styles.buttonContainer}>
                        <Button theme={{ colors: { primary: 'blue' } }} mode="contained" onPress={handleSubmit} style={styles.button}>
                            Add Item
                        </Button>
                        <Button theme={{ colors: { primary: 'green' } }} mode="contained" onPress={handleUpdate} style={styles.button}>
                            Update Item
                        </Button>
                        <Button theme={{ colors: { primary: 'red' } }} mode="contained" onPress={handleDelete} style={styles.button}>
                            Delete Item
                        </Button>
                    </View>
                </View>

                <ScrollView>
                    <View>
                        {items.map((item, index) => (
                            <View key={index} style={styles.dataDisplay}>
                                <Text>{item.itemId}</Text>
                                <Text>{item.name}</Text>
                                <Text>{item.quantity}</Text>
                                <Text>{item.price}</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        paddingTop: 50,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dataInput: {
        width: '80%',
        padding: 10,
        gap: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        width: '100%',
        borderRadius: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginTop: 20,
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
    },
    dataDisplay: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        gap: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
});
