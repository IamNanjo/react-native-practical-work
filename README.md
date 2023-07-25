# Practical work

## Assignment

Make a React Native application by which you can add person data having at least firstname, lastname and postal code into a FlatList (and devices database as well). There should also be buttons by which to order the data by firstname, lastname or postal code.

## Features

- 3 inputs for filling out the first name, last name and postal code.
  This information can be saved to an SQLite database on the device by pressing the `Add Person` button
  once none of the 3 inputs are empty (postal code has to be a number).

- The list of people can be sorted by using the 3 buttons above the list. Sorting order can be seen right next to the `Sorting` title (ASC or DESC meaning ascending or descending).
  This sorting is done in the SQLite database and if both values match it uses the rowid as the secondary column for sorting.

- People can also be removed from the list by holding the list item.

## Execution

I used TypeScript to speed up the development and I also separated the application to multiple different components so I will explain their purpose in this chapter.

### App

The App component contains the app state, logic as well as the main application structure.

### ButtonBase

Just a basic button that runs the onPress function given as a prop once clicked. Contains the text from the text prop inside the button.

### ButtonSort

Almost the same as ButtonBase but smaller to allow 3 buttons next to each other. Also has an `active` prop to highlight the currently selected button.

### FlatListPersonItem

FlatList item that shows the details of the person (firstName lastName - postalCode)

Gets the item from props (passed by the data attribute on FlatList).

The item is a person's details as well as an onHold function because the data list is edited using Array.Map in the FlatList's data attribute.

### HorizontalLine

Just a simple horizontal line to separate sections of the app

### InputWithLabel

TextInput with a label on top of it. Updates state once editing ends using a useCallback hook

#### Props

- `label`: The content of the `Text` above the `TextInput` that explains what the input is for
- `getter`: Gets the initial value for the `TextInput`
- `setter`: setState function to update state
- `type`: Optional parameter that changes the keyboardType of the `TextInput` (phone-pad for postal code, default for others)

## Problems

The development of this application was quite simple for me as I had used
React quite a bit before and there are lots of similarities between React and React Native.

The most significant problem occurred when I wanted to make the FlatList scrollable.
I first tried doing this by wrapping the whole application in a ScrollView element but this resulted in an error since FlatList itself inherits properties from ScrollView.
After a while I found that having the inputs in the ListHeaderComponent would fix this problem as this allows the FlatList to handle scrolling throughout the entire application.

The next problem I ran into after that was that the scrolling was getting cut off and I could not figure out a good reason for that and found online that many other people have a similar problem.
Most people recommended using a bottom padding on the element or a `flex: 1` style on the container but none of that worked for me. Finally I realized that you can also add a ListFooterComponent to the FlatList which allows me to add a `View` element at the bottom of the list which acts as the padding.

## Additional notes

1. Return you source code plus the document in one zip file into the Moodle (see the Task below).
