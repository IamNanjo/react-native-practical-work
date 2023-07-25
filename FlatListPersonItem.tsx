import React from "react";
import { TouchableHighlight, Text, StyleSheet } from "react-native";
import { styles, colors } from "./styles";
import { Person } from "./Person";

interface PropItem extends Person {
	onHold: () => any;
}
interface Props {
	item: PropItem;
	index: number;
}

export default (props: Props) => (
	<TouchableHighlight
		onLongPress={props.item.onHold}
		style={listItemStyles.container}
	>
		<Text style={{ ...styles.baseText, ...listItemStyles.text }}>
			{props.item.firstName} {props.item.lastName} - {props.item.postalCode}
		</Text>
	</TouchableHighlight>
);

const listItemStyles = StyleSheet.create({
	container: {
		backgroundColor: colors.bg.raise,
		marginVertical: 6,
		paddingVertical: 22,
		borderRadius: 6
	},
	text: {
		alignSelf: "center"
	}
});
