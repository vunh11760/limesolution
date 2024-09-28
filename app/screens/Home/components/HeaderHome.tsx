import color from 'app/assets/styles/color';
import ImageUtil from 'app/utils/ImageUtil';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const HeaderHome = () => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Image style={styles.icon} source={ImageUtil.images.ic_home_active} />
        <Text style={{color: color.primary, fontWeight: 'bold', marginLeft: 2}}>
          tinder
        </Text>
      </View>
      <View
        style={{
          borderWidth: 0.5,
          borderColor: color.white,
          borderRadius: 20,
          padding: 8,
          backgroundColor: color.neutral_4,
        }}>
        <Image
          style={styles.iconThunder}
          source={ImageUtil.images.ic_thunder}
        />
      </View>
    </View>
  );
};

export default HeaderHome;
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.black,
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  icon: {
    width: 20,
    height: 20,
  },
  iconThunder: {
    width: 10,
    height: 10,
  },
});
