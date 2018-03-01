
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import IndexList from 'grommet-index/components/List';
import ActivityListItem from '../activity/ActivityListItem';
import ActivityItem from '../activity/ActivityItem';

class ActiveGlobalListItem extends ActivityListItem {
}

ActiveGlobalListItem.defaultProps = {
  includeResource: true
};

class DashboardTasks extends Component {

  constructor () {
    super();
    this._onSelect = this._onSelect.bind(this);
    this.state = {};
  }

  _onSelect (selection) {
    this.setState({ selection: selection });
  }

  render () {
    const { selection } = this.state;
    let activityItem;
    if (selection) {
      activityItem = (
        <ActivityItem uri={selection} onClose={this._onSelect.bind(this, null)} />
      );
    }
    return (
      <div>
        <IndexList itemComponent={ActiveGlobalListItem} result={this.props.tasks}
          onSelect={this._onSelect} />
        {activityItem}
      </div>
    );
  }
}

DashboardTasks.propTypes = {
  tasks: PropTypes.object
};

export default connect()(DashboardTasks);
