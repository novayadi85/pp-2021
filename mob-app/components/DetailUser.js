import React,  { useState, useEffect , useContext } from 'react';
import { ListItem, Avatar, Image, Icon} from 'react-native-elements';
import { View, StyleSheet, ScrollView , SafeAreaView , ActivityIndicator, Text, useWindowDimensions, TouchableOpacity, Linking} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RenderHtml from 'react-native-render-html';
import MapView, {Marker, Geojson} from 'react-native-maps';
import Separator from './Separator';
import mainColor from './Constants'
const Email = ({ containerStyle, onPressEmail, name, email, index }) => (
    <TouchableOpacity onPress={() => onPressEmail(email)}>
      <View style={containerStyle}>
        <View style={styles.iconRow}>
            <MaterialCommunityIcons
                name="email"
                color={'gray'} 
                size={40}
                onPress={() => onPressEmail()}
            />
        </View>
        <View style={styles.emailRow}>
          <View style={styles.emailColumn}>
            <Text style={styles.emailText}>{email}</Text>
          </View>
          <View style={styles.emailNameColumn}>
            {name.length !== 0 && (
              <Text style={styles.emailNameText}>{name}</Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
);


const Address = ({ containerStyle, name, address , city, country }) => (
    <View style={containerStyle}>
    <View style={styles.iconRow}>
        <MaterialCommunityIcons
            name="map-marker"
            color={'gray'} 
            size={40}
        />
    </View>
    <View style={styles.emailRow}>
        <View style={styles.emailColumn}>
        <Text style={styles.emailText}>{address}, {city} {country}</Text>
        </View>
        <View style={styles.emailNameColumn}>
        {name.length !== 0 && (
            <Text style={styles.emailNameText}>{name}</Text>
        )}
        </View>
    </View>
    </View>
);

const Phone = ({ containerStyle, onPressPhone, name, phone, index }) => (
    <TouchableOpacity onPress={() => onPressTel(phone)}>
      <View style={containerStyle}>
        <View style={styles.iconRow}>
            <MaterialCommunityIcons
                name="phone"
                color={'gray'} 
                size={40}
                onPress={() => onPressTel()}
            />
        </View>
        <View style={styles.telRow}>
          <View style={styles.telNumberColumn}>
            <Text style={styles.telNumberText}>{phone}</Text>
          </View>
          <View style={styles.telNameColumn}>
            {name.length !== 0 && (
              <Text style={styles.telNameText}>{name}</Text>
            )}
          </View>
        </View>
        <View style={styles.smsRow}>
          <Icon
            name="textsms"
            underlayColor="transparent"
            iconStyle={styles.smsIcon}
            onPress={() => onPressSms()}
          />
        </View>
      </View>
    </TouchableOpacity>
);

const onPressEmail = email => {
    Linking.openURL(`mailto://${email}?subject=subject&body=body`).catch(err =>
      console.log('Error:', err)
    )
}


const onPressTel = number => {
    Linking.openURL(`tel://${number}`).catch(err => console.log('Error:', err))
}

const onPressSms = () => {
    console.log('sms')
}


const DetailUser = (props) => {
  const { navigate, user } = props;
  const { width } = useWindowDimensions();

  useEffect(() => {
   
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.Detail}>
        <ScrollView>
            <Image
                source={{ uri: user.avatar_url }}
                style={styles.image}
                PlaceholderContent={<ActivityIndicator />}
            />
            <View style={[styles.wrapper]}>
                <Text style={styles.title}>{user.name}</Text>
                <View style={styles.content}>
                    <RenderHtml contentWidth={width} source={{html: user.biodata}} />
                </View>
                <Separator/>
                <Email
                    containerStyle={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        marginBottom: 10,
                        marginTop: 10,
                    }}
                    key={`email-${user.id}`}
                    index={1}
                    name={user.name}
                    email={user.email}
                    onPressEmail={onPressEmail(user.email)}
                />
                <Phone
                    containerStyle={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        marginBottom: 10,
                        marginTop: 10,
                    }}
                    key={`phone-${user.id}`}
                    index={1}
                    name={'Work'}
                    phone={user.phone}
                    onPressEmail={onPressEmail(user.email)}
                />

                <Address containerStyle={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        marginBottom: 10,
                        marginTop: 10,
                    }}
                    key={`address-${user.id}`}
                    index={1}
                    name={'Home'}
                    address={user.address}
                    city={user.city}
                    country={user.country}
                />
            </View>
            <View style={styles.maps}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                    latitude: Number(user.latitude),
                    longitude: Number(user.longitude),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    }}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    showsBuildings={true}
                    zoomEnabled={true}
                    scrollEnabled={true}
                    moveOnMarkerPress={true}
                    zoomControlEnabled={true}/>
                </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  maps: {
    height: 300,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 0,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  image: {
    height: 300,
    width: '100%',
    maxHeight: 360
  },
  Detail: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    overflow: 'scroll',
    paddingTop: 0,
    flex: 1,
    justifyContent: 'center',
  },
  wrapper: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 22,
    color: '#000',
    paddingBottom: 2,
    marginTop: 5,
    marginLeft: 1,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 14,
    color: '#999',
    lineHeight: 16,
    opacity: 0.9,
    marginLeft: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  content: {
    marginTop: 10,
    marginBottom: 10,
  },
  emailColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  emailIcon: {
    color: 'gray',
    fontSize: 30,
  },
  emailNameColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  emailNameText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '200',
  },
  emailRow: {
    flex: 8,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  emailText: {
    fontSize: 16,
  },
  iconRow: {
    flex: 2,
    justifyContent: 'center',
  },
  smsIcon: {
    color: 'darkgray',
    fontSize: 30,
  },
  smsRow: {
    flex: 2,
    justifyContent: 'flex-start',
  },
  telIcon: {
    color: mainColor,
    fontSize: 30,
  },
  telNameColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  telNameText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '200',
  },
  telNumberColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  telNumberText: {
    fontSize: 16,
  },
  telRow: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default DetailUser;