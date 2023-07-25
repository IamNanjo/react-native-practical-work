import { openDatabase, enablePromise } from "react-native-sqlite-storage";

enablePromise(true);

export type Order = "firstName" | "lastName" | "postalCode";
export interface OrderParams {
	column: Order;
	ascending: boolean;
}

const getDbConnection = async () => {
	const connection = await openDatabase({
		name: "person-data.db",
		location: "default"
	});

	connection.executeSql(
		`
		CREATE TABLE IF NOT EXISTS person (
			firstName TEXT NOT NULL,
			lastName TEXT NOT NULL,
			postalCode INT NOT NULL
		)
	`
	);

	return connection;
};

export const getPeopleFromDb = async (
	{ column, ascending }: OrderParams = { column: "firstName", ascending: true }
) => {
	const connection = await getDbConnection();

	const result = await connection.executeSql(
		`SELECT rowid, firstName, lastName, postalCode
		FROM person
		ORDER BY ${column} ${ascending ? "ASC" : "DESC"}, rowid ASC`
	);

	return result[0].rows.raw();
};

export const addPersonToDb = async (
	firstName: string,
	lastName: string,
	postalCode: string
) => {
	const connection = await getDbConnection();

	const result = await connection.executeSql(
		`INSERT INTO person (firstName, lastName, postalCode)
		VALUES (?, ?, ?)`,
		[firstName, lastName, postalCode]
	);

	return result[0];
};

export const removePersonFromDb = async (rowid: number) => {
	const connection = await getDbConnection();

	const result = await connection.executeSql(
		`DELETE FROM person
		WHERE rowid=?`,
		[rowid]
	);

	return result[0];
};
