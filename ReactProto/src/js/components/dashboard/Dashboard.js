
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { loadDashboard, unloadDashboard } from '../../actions/dashboard';
import { searchSuggestions } from '../../actions/search';
import { navActivate } from '../../actions/nav';
import { indexSelect } from '../../actions/index';
import { showUtilization } from '../../actions/utilization';
import Article from 'grommet/components/Article';
import Header from 'grommet/components/Header';
import Section from 'grommet/components/Section';
import Title from 'grommet/components/Title';
import Search from 'grommet/components/Search';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Meter from 'grommet/components/Meter';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Logo from '../Logo';
import Notifications from '../Notifications';
import DashboardTasks from './DashboardTasks';
import GraphicSizer from '../../utils/GraphicSizer';

const CATEGORY_LABELS = {
  alerts: 'Alert',
  images: 'Image',
  networks: 'Network',
  'os-types': 'OS Type',
  tasks: 'Task',
  'virtual-machines': 'Virtual Machine',
  'virtual-machine-sizes': 'Size'
};

class Suggestion extends Component {
  render () {
    return (
      <Box direction="row" justify="between" responsive={false}>
        {this.props.name}
        <label className="secondary">
          {CATEGORY_LABELS[this.props.category] || this.props.category}
        </label>
      </Box>
    );
  }
}

Suggestion.propTypes = {
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired
};

class Dashboard extends Component {

  constructor (props) {
    super(props);

    this._onClickTitle = this._onClickTitle.bind(this);
    this._onCloseNav = this._onCloseNav.bind(this);
    this._onSearchChange = this._onSearchChange.bind(this);
    this._onSearchSelect = this._onSearchSelect.bind(this);
    this._onClickUtilization = this._onClickUtilization.bind(this);
    this._onGraphicSize = this._onGraphicSize.bind(this);

    this._setDocumentTitle(props);
    this.state = { graphicSize: 'medium' };
  }

  componentDidMount () {
    this.props.dispatch(loadDashboard());
    const container = ReactDOM.findDOMNode(this.refs.utilizationMeters);
    this._graphicSizer = new GraphicSizer(container, this._onGraphicSize);
  }

  componentWillReceiveProps(nextProps) {
    this._setDocumentTitle(nextProps);
    if (this.props.nav.active !== nextProps.nav.active) {
      // The NavSidebar is changing, relayout when it finishes animating.
      // TODO: Convert to an animation event listener.
      this._graphicSizer.layout();
    }
    const suggestions = nextProps.search.suggestions.map((suggestion) => {
      return {
        suggestion: suggestion,
        label: <Suggestion name={suggestion.name} category={suggestion.category} />
      };
    });
    this.setState({ suggestions: suggestions });
  }

  componentWillUnmount () {
    this.props.dispatch(unloadDashboard());
    this._graphicSizer.stop();
  }

  _setDocumentTitle (props) {
    document.title = `Dashboard - ${props.instanceName || ''}`;
  }

  _onClickTitle () {
    this.props.dispatch(navActivate(true));
  }

  _onCloseNav () {
    this.props.dispatch(navActivate(false));
  }

  _onSearchChange (event) {
    this.props.dispatch(searchSuggestions(event.target.value));
  }

  _onSearchSelect (pseudoEvent) {
    const suggestion = pseudoEvent.suggestion.suggestion;
    this.props.dispatch(indexSelect('/' + suggestion.category, suggestion.uri));
  }

  _onClickUtilization (attribute) {
    this.props.dispatch(showUtilization(attribute));
  }

  _onGraphicSize (size) {
    this.setState({ graphicSize: size });
  }

  render () {
    const { dashboard, search, nav: {active: navActive}, instanceName,
      analytics } = this.props;

    let title;
    if (! navActive) {
      title = (
        <Title onClick={this._onClickTitle} a11yTitle="Open Menu">
          <Logo />
          {instanceName}
        </Title>
      );
    }

    let tasks;
    if (dashboard.tasks.count > 0) {
      tasks = (
        <Section pad="medium" full="horizontal">
          <h2>Running Tasks</h2>
          <DashboardTasks tasks={dashboard.tasks} />
        </Section>
      );
    }

    let advancedAnalytics;
    if (analytics && analytics.address) {
      advancedAnalytics = (
        <Anchor href={'http://' + analytics.address} target="advancedAnalytics"
          primary={true}>
          Cloud Optimizer
        </Anchor>
      );
    }

    return (
      <Article ref="content" className="dashboard" pad="none">
        <Header direction="row" justify="between" size="large"
          pad={{horizontal: 'medium'}}>
          {title}
          <Search ref="search" inline={true} responsive={false} className="flex"
            placeHolder="Search"
            defaultValue={search.text} onDOMChange={this._onSearchChange}
            onSelect={this._onSearchSelect}
            suggestions={this.state.suggestions} />
        </Header>
        <Notifications context={{global: true}} includeResource={true}
          includeCategories="alerts" />
        <Section key="utilization" pad="medium" full="horizontal">
          <Header justify="between">
            <h2>Utilization</h2>
            {advancedAnalytics}
          </Header>
          <Tiles ref="utilizationMeters" fill={true}>
            <Tile>
              <Header size="small" justify="center">
                <h3>CPU</h3>
              </Header>
              <Meter type="circle" units="GHz" stacked={true}
                size={this.state.graphicSize}
                series={[
                  {value: 58, label: 'In use', colorIndex: 'accent-1',
                    important: true,
                    onClick: this._onClickUtilization.bind(this, 'memoryUsed')},
                  {value: 42, label: 'Available', colorIndex: 'unset'}
                ]}
                legend={{placement: 'bottom', total: true, align: 'center'}}
                a11yTitleId='cpuTitleId'
                a11yDescId='cpuDescId' />
            </Tile>
            <Tile>
              <Header size="small" justify="center">
                <h3>Memory</h3>
              </Header>
              <Meter type="circle" units="GB" stacked={true}
                size={this.state.graphicSize}
                series={[
                  {value: 127, label: 'In use', colorIndex: 'accent-1',
                    important: true,
                    onClick: this._onClickUtilization.bind(this, 'memoryUsed')},
                  {value: 73, label: 'Available', colorIndex: 'unset'}
                ]}
                legend={{placement: 'bottom', total: true, align: 'center'}}
                a11yTitleId='memoryTitleId'
                a11yDescId='memoryDescId' />
            </Tile>
            <Tile>
              <Header size="small" justify="center">
                <h3>Storage</h3>
              </Header>
              <Meter type="circle" units="TB" stacked={true}
                size={this.state.graphicSize}
                series={[
                  {value: 427, label: 'In use', colorIndex: 'accent-1',
                    important: true,
                    onClick: this._onClickUtilization.bind(this, 'diskUsed')},
                  {value: 573, label: 'Available', colorIndex: 'unset'}
                ]}
                legend={{placement: 'bottom', total: true, align: 'center'}}
                a11yTitleId='storageTitleId'
                a11yDescId='storageDescId' />
            </Tile>
          </Tiles>
        </Section>
        {tasks}
      </Article>
    );
  }

}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  instanceName: PropTypes.string,
  search: PropTypes.object
};

let select = (state, props) => ({
  analytics: state.settings.settings.analytics,
  dashboard: state.dashboard,
  instanceName: state.settings.settings.name,
  nav: state.nav,
  search: state.search
});

export default connect(select)(Dashboard);
