import React from 'react';
import { ListItem, Avatar } from 'react-native-elements'
import { View, StyleSheet, ScrollView , RefreshControl, ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
const ListItems = (item) => {
    const navigation = useNavigation();
    const { id, data } = item;
    
    return (data.name != null) ? (
        <ListItem key={id} bottomDivider onPress={() => {
                navigation.navigate('Details', data );
            }}>
                <Avatar rounded containerStyle={{ backgroundColor: "#BDBDBD" }} title={(data.name) ? data.name.charAt(0) : "A"}/>
                <ListItem.Content>
                <ListItem.Title>{data.name}</ListItem.Title>
                <ListItem.Subtitle>{data.subtitle}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>): null;

}

export default ListItems;