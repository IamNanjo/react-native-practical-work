import React from "react";
import { TouchableHighlight, Text, StyleSheet } from "react-native";
import type { GestureResponderEvent } from "react-native";

import { colors } from "./styles";

interface Props {
	text: string;
	active: boolean;
	onPress: (event: GestureResponderEvent) => any;
}

export default (props: Props) => (
	<TouchableHighlight
		style={{ ...buttonStyles.button, backgroundColor: props.active ? colors.fg.primary : colors.bg.raise }}
		onPress={props.onPress}
	>
		<Text style={buttonStyles.text}>{props.text}</Text>
	</TouchableHighlight>
);

const buttonStyles = StyleSheet.create({
	button: {
		alignSelf: "flex-start",
		padding: 8,
		borderRadius: 6
	},
	text: {
		alignSelf: "center",
		color: colors.white
	}
});
