import color from 'app/assets/styles/color';
import {IProfile} from 'app/types/Story';
import ImageUtil from 'app/utils/ImageUtil';
import React, {useEffect, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const {width, height} = Dimensions.get('screen');
const CardItem = ({
  cardData,
  status,
  ...props
}: {
  cardData: IProfile;
  status: string;
}) => {
  const [currentIndexImage, setCurrentIndexImage] = useState<number>(0);
  return (
    <Animated.View {...props}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="cover"
          source={{uri: cardData.imageUrls[currentIndexImage]}}
          style={styles.image}
        />
      </View>
      <View style={styles.indicatorContainer}>
        {cardData?.imageUrls.map((item, index) => {
          return (
            <View
              style={[
                styles.indicator,
                {
                  backgroundColor:
                    index === currentIndexImage ? color.white : color.black,
                },
              ]}></View>
          );
        })}
      </View>
      <TouchableOpacity
        onPress={() => {
          if (currentIndexImage > 0)
            setCurrentIndexImage(data => {
              return data - 1;
            });
        }}
        style={styles.buttonPreImage}></TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (currentIndexImage < cardData.imageUrls.length - 1)
            setCurrentIndexImage(data => {
              return data + 1;
            });
        }}
        style={styles.buttonNextImage}></TouchableOpacity>
      <View
        style={[
          styles.lineBottom,
          {backgroundColor: status != 'none' ? color.black : color.neutral_5},
        ]}
      />
      <View style={styles.infomationContainer}>
        <Image style={styles.imgBg} source={ImageUtil.images.bg_linear} />
        <View style={styles.infoView}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text
                style={{fontWeight: 'bold', fontSize: 20, color: color.white}}>
                {cardData.name}
                <Text
                  style={{fontWeight: '500', fontSize: 20, color: color.white}}>
                  {' '}
                  {cardData.age}
                </Text>
              </Text>
            </View>
            <View style={styles.moreInfoView}>
              <Image
                style={{width: 20, height: 20}}
                source={ImageUtil.images.ic_arrow_up}
              />
            </View>
          </View>

          {currentIndexImage === 0 && (
            <>
              <Text style={styles.txtIntro}>{cardData.introduce}</Text>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <Image
                  style={{width: 15, height: 15}}
                  source={ImageUtil.images.ic_location}
                />
                <Text
                  style={{fontWeight: '500', fontSize: 14, color: color.white}}>
                  {cardData.distance}km away
                </Text>
              </View>
            </>
          )}

          {currentIndexImage === 1 && (
            <View style={{flexDirection: 'row', marginTop: 10}}>
              {cardData.hobbies?.map(item => {
                return (
                  <View style={styles.hobbyItem}>
                    <Text
                      style={{
                        fontWeight: '500',
                        fontSize: 10,
                        color: color.white,
                      }}>
                      {item}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </View>
      {status === 'like' && (
        <View style={styles.likeOver}>
          <Image
            style={{width: 50, height: 50}}
            source={ImageUtil.images.ic_like}
            resizeMode="contain"
          />
        </View>
      )}
      {status === 'nope' && (
        <View style={styles.unlikeOver}>
          <Image
            style={{width: 50, height: 50}}
            source={ImageUtil.images.ic_unlike}
            resizeMode="contain"
          />
        </View>
      )}
    </Animated.View>
  );
};

export default CardItem;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  indicatorContainer: {
    width: '100%',
    position: 'absolute',
    top: 3,
    left: 0,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  indicator: {
    flex: 1,
    margin: 2,
    height: 4,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: color.white,
  },
  buttonPreImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: width / 2,
  },
  buttonNextImage: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    width: width / 2,
  },
  lineBottom: {
    position: 'absolute',
    bottom: -2,
    height: 20,
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  infomationContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    height: 100,
  },
  imgBg: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: 100,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  moreInfoView: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: color.black,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: color.white,
  },
  infoView: {
    width: '100%',
    position: 'absolute',
    bottom: 10,
    padding: 10,
  },
  hobbyItem: {
    padding: 4,
    paddingHorizontal: 10,
    backgroundColor: color.inactive,
    marginRight: 5,
    borderRadius: 10,
  },
  likeOver: {
    width: 100,
    height: 100,
    position: 'absolute',
    justifyContent: 'center',
    right: 50,
    alignItems: 'center',
  },
  unlikeOver: {
    width: 100,
    height: 100,
    position: 'absolute',
    justifyContent: 'center',
    left: 50,
    alignItems: 'center',
  },
  txtIntro: {
    fontWeight: '500',
    fontSize: 14,
    color: color.white,
    marginTop: 5,
  },
});
