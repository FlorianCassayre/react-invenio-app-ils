import { EditButton } from '@components/backoffice/buttons/EditButton';
import { SeriesDeleteModal } from '../SeriesDeleteModal';
import { BackOfficeRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Divider, Menu } from 'semantic-ui-react';

export default class SeriesActionMenu extends Component {
  constructor(props) {
    super(props);

    this.state = { activeItem: '' };
  }

  render() {
    const { series, relations } = this.props;
    const { activeItem } = this.state;
    const offset = -180;
    return (
      <div className="bo-action-menu">
        <EditButton
          fluid
          to={BackOfficeRoutes.seriesEditFor(series.metadata.pid)}
          text="Edit series"
        />
        <SeriesDeleteModal relations={relations} series={series} />

        <Divider horizontal>Navigation</Divider>

        <Menu pointing secondary vertical fluid className="left">
          <Menu.Item
            name="header"
            active={activeItem === 'header'}
            activeClass="active"
            as={ScrollLink}
            to="metadata"
            spy
            onSetActive={() => this.setState({ activeItem: 'metadata' })}
            offset={offset}
          >
            Metadata
          </Menu.Item>
          <Menu.Item
            name="series-documents"
            active={activeItem === 'series-documents'}
            activeClass="active"
            as={ScrollLink}
            to="series-documents"
            spy
            onSetActive={() =>
              this.setState({ activeItem: 'series-documents' })
            }
            offset={offset}
          >
            Documents
          </Menu.Item>
          {series.metadata.mode_of_issuance === 'MULTIPART_MONOGRAPH' && (
            <Menu.Item
              name="series-serials"
              active={activeItem === 'series-serials'}
              activeClass="active"
              as={ScrollLink}
              to="series-serials"
              spy
              onSetActive={() =>
                this.setState({ activeItem: 'series-serials' })
              }
              offset={offset}
            >
              Part of serials
            </Menu.Item>
          )}
          {series.metadata.mode_of_issuance === 'SERIAL' && (
            <Menu.Item
              name="series-monographs"
              active={activeItem === 'series-monographs'}
              activeClass="active"
              as={ScrollLink}
              to="series-monographs"
              spy
              onSetActive={() =>
                this.setState({ activeItem: 'series-monographs' })
              }
              offset={offset}
            >
              Multipart monographs
            </Menu.Item>
          )}
          <Menu.Item
            name="series-relations"
            active={activeItem === 'series-relations'}
            activeClass="active"
            as={ScrollLink}
            to="series-relations"
            spy
            onSetActive={() =>
              this.setState({ activeItem: 'series-relations' })
            }
            offset={offset}
          >
            Relations
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

SeriesActionMenu.propTypes = {
  relations: PropTypes.object.isRequired,
  series: PropTypes.object.isRequired,
};
