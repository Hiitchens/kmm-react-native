import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Image,
  Subtitle,
  Row,
  View,
  Caption,
  Divider,
  TouchableOpacity,
} from '@shoutem/ui';
import { user as userShape } from '../components/shapes';

const { func } = PropTypes;

export default class MemberView extends React.Component {
  static propTypes = {
    user: userShape.isRequired,
    openProfile: func.isRequired,
  };

  constructor(props) {
    super(props);

    this.openUserProfile = this.openUserProfile.bind(this);
  }

  openUserProfile() {
    const { user, openProfile } = this.props;

    openProfile(user);
  }

  render() {
    const { user } = this.props;

    // this is here because Image causes a crash if it receives null as url
    const imageUrl = _.get(user, 'profile.image', undefined);
    const imageUrlSafe = !_.isEmpty(imageUrl) ? imageUrl : undefined;

    return (
      <TouchableOpacity
        key={user.id}
        onPress={this.openUserProfile}
      >
        <View>
          <Row>
            <Image
              styleName="small rounded-corners placeholder"
              source={{ uri: imageUrlSafe }}
            />
            <View styleName="vertical stretch space-between">
              <Subtitle>{_.get(user, 'profile.nick')}</Subtitle>
              <Subtitle
                style={{ fontStyle: 'italic', color: 'gray' }}
              >
                {_.get(user, 'profile.name')}
              </Subtitle>
              <Caption>{_.get(user, 'profile.profession')}</Caption>
            </View>
          </Row>
          <Divider styleName="line" />
        </View>
      </TouchableOpacity>
    );
  }
}
