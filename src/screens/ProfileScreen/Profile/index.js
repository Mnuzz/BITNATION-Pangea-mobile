import React, { Component } from 'react';
import {
  Image,
  View,
  ScrollView,
  Text,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';


import styles from './styles';
import BackgroundImage from '../../../components/common/BackgroundImage';
import AssetsImage from '../../../global/AssetsImages';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import Colors from '../../../global/colors';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import i18n from '../../../global/i18n';

const EDIT_BUTTON = 'EDIT_BUTTON';

class ProfileScreen extends NavigatorComponent {

  constructor(props) {
    super(props);

    this.props.navigator.setButtons(
      {
        leftButtons: [],
        rightButtons: [{
          title: i18n.t('screens.profile.editButton'),
          id: EDIT_BUTTON,
          buttonColor: Colors.navigationButtonColor,
        }],
      },
    );
  }

  onNavBarButtonPress(id) {
    if (id === EDIT_BUTTON) {
      this.props.onStartEditing();
    }
  }

  onBottomTabReselected() {
    this.props.makeStepForTestingMode();
  }

  onDidDisappear() {
    this.props.resetStepsForTestingMode();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.testingModeActive !== this.props.testingModeActive) {
      Alert.alert(
        i18n.t('testingMode.changeActiveAlert.title', {
          onOff: this.props.testingModeActive ?
            i18n.t('enums.onOff.on') :
            i18n.t('enums.onOff.off'),
        }),
      );
    }
  }

  render() {
    return (
      <View style={styles.bodyContainer}>
        {/* TITLE OF SCREEN */}
        <View style={styles.titleContainer}>
          <View style={styles.titleBarLarge}>
            <Text style={styles.largeTitle}>{i18n.t('screens.profile.title')}</Text>
          </View>
        </View>
        {this._buildHeader()}
      </View>
    );
  }

  _buildHeader() {
    const { user } = this.props;

    const avatarSource = user.avatar ?
      { uri: `data:image/gif;base64,${user.avatar}` } :
      AssetsImage.Placeholder.avatar;

    return (
      <View style={styles.header}>
        <Image source={avatarSource} style={styles.avatarLarge}/>
        <Text style={styles.nameText}>{user.name.trim()}</Text>
        <Text style={styles.infoText}>{user.location.trim()}</Text>
        <Text style={styles.ethAddress}>{user.ethAddress}</Text>
      </View>
    );
  }

}

ProfileScreen.propTypes = {
  navigator: PropTypes.object,
  user: PropTypes.object.isRequired,
  onStartEditing: PropTypes.func.isRequired,
};


export default ProfileScreen;
