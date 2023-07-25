import React, { useState, useEffect, useCallback } from "react";
import {
	SafeAreaView,
	View,
	StatusBar,
	FlatList,
	ScrollView,
	Text,
	ToastAndroid
} from "react-native";
import {
	getPeopleFromDb,
	addPersonToDb,
	removePersonFromDb,
	type Order,
	type OrderParams
} from "./db";
import { styles, colors } from "./styles";

import type { GestureResponderEvent } from "react-native";
import type { Person } from "./Person";

import InputWithLabel from "./InputWithLabel";
import HorizontalLine from "./HorizontalLine";
import FlatListPersonItem from "./FlatListPersonItem";
import ButtonBase from "./ButtonBase";
import ButtonSort from "./ButtonSort";

export default () => {
	const [firstNameInput, setFirstNameInput] = useState("");
	const [lastNameInput, setLastNameInput] = useState("");
	const [postalCodeInput, setPostalCodeInput] = useState("");
	const [people, setPeople] = useState<Person[]>([]);
	const [order, setOrder] = useState<OrderParams>({
		column: "firstName",
		ascending: true
	});

	const dbInit = useCallback(async () => {
		try {
			const result = await getPeopleFromDb(order);
			setPeople(result);
		} catch (error) {
			console.error(error);
		}
	}, []);

	const changeOrder = async (column: Order) => {
		try {
			let newOrder: OrderParams = { column, ascending: order.ascending };

			if (order.column !== column) newOrder.ascending = true;
			else newOrder.ascending = !newOrder.ascending;

			setOrder(newOrder);

			const result = await getPeopleFromDb(newOrder);
			setPeople(result);
		} catch (error) {
			console.error(error);
		}
	};

	const addPerson = async (event: GestureResponderEvent) => {
		if (
			!firstNameInput.length ||
			!lastNameInput.length ||
			!postalCodeInput.length
		) {
			ToastAndroid.show("Fields cannot be left empty", ToastAndroid.LONG);
			return;
		}

		let postalCodeNum: number;

		try {
			if (!/\d+/.test(postalCodeInput)) throw Error();
			postalCodeNum = Number.parseInt(postalCodeInput, 10);
		} catch {
			ToastAndroid.show("Postal code has to be a number", ToastAndroid.LONG);
			return;
		}

		setPeople([
			...people,
			{
				rowid: people.length + 1,
				firstName: firstNameInput,
				lastName: lastNameInput,
				postalCode: postalCodeNum
			}
		]);

		await addPersonToDb(firstNameInput, lastNameInput, postalCodeInput);

		const result = await getPeopleFromDb(order);
		setPeople(result);

		setFirstNameInput("");
		setLastNameInput("");
		setPostalCodeInput("");
	};

	const removePerson = async (rowid: number) => {
		try {
			await removePersonFromDb(rowid);

			const result = await getPeopleFromDb(order);
			setPeople(result);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		dbInit();
	}, [dbInit]);

	const ListHeader = () => (
		<ScrollView>
			<InputWithLabel
				label="First Name"
				getter={firstNameInput}
				setter={setFirstNameInput}
			/>
			<InputWithLabel
				label="Last Name"
				getter={lastNameInput}
				setter={setLastNameInput}
			/>
			<InputWithLabel
				label="Postal Code"
				getter={postalCodeInput}
				setter={setPostalCodeInput}
				type="phone-pad"
			/>

			<View style={{ marginVertical: 16 }}>
				<ButtonBase text="Add Person" onPress={addPerson} />
			</View>

			<View style={{ marginVertical: 12 }}>
				<HorizontalLine />
			</View>

			<Text style={{ ...styles.baseText, alignSelf: "center" }}>
				Sorting ({order.ascending ? "ASC" : "DESC"})
			</Text>

			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-around",
					marginVertical: 16
				}}
			>
				<ButtonSort
					text="First Name"
					active={order.column === "firstName"}
					onPress={() => changeOrder("firstName")}
				/>
				<ButtonSort
					text="Last Name"
					active={order.column === "lastName"}
					onPress={() => changeOrder("lastName")}
				/>
				<ButtonSort
					text="Postal Code"
					active={order.column === "postalCode"}
					onPress={() => changeOrder("postalCode")}
				/>
			</View>
		</ScrollView>
	);

	const ListBottomPadding = () => <View style={{ height: 50 }}></View>;

	return (
		<SafeAreaView style={styles.safeAreaView}>
			<StatusBar
				barStyle="light-content"
				translucent={true}
				backgroundColor={colors.black}
			/>
			<FlatList
				ListHeaderComponent={ListHeader}
				ListFooterComponent={ListBottomPadding}
				scrollEnabled={true}
				contentInsetAdjustmentBehavior="automatic"
				data={people.map((person: Person) => {
					// Add hold event to each list item
					return { ...person, onHold: () => removePerson(person.rowid) };
				})}
				renderItem={FlatListPersonItem}
				keyExtractor={(p) => p.rowid.toString()}
				style={styles.mainView}
			/>
		</SafeAreaView>
	);
};
