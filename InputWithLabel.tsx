import React, { useCallback, useRef } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	NativeSyntheticEvent,
	TextInputEndEditingEventData
} from "react-native";
import { styles, colors } from "./styles";

interface Props {
	label: string;
	getter: string;
	setter: React.Dispatch<React.SetStateAction<string>>;
	type?:
		| "default"
		| "number-pad"
		| "decimal-pad"
		| "numeric"
		| "email-address"
		| "phone-pad"
		| "url";
}

export default (props: Props) => {
	const ref = useRef(null);

	const handleChange = useCallback(
		(event: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
			const inputText = event.nativeEvent.text;
			props.setter(inputText);
		},
		[props.setter]
	);

	return (
		<View style={inputStyles.textInputContainer}>
			<Text style={styles.baseText}>{props.label}</Text>
			<TextInput
				ref={ref}
				style={inputStyles.textInput}
				onEndEditing={handleChange}
				defaultValue={props.getter}
				keyboardType={props.type ?? "default"}
			/>
		</View>
	);
};

const inputStyles = StyleSheet.create({
	textInputContainer: { paddingVertical: 16 },
	textInput: {
		color: colors.white,
		borderColor: colors.fg.secondary,
		borderWidth: 2,
		borderRadius: 6,
		marginTop: 6,
		paddingVertical: 6,
		paddingHorizontal: 6,
		fontSize: 18
	}
});
