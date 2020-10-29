import { ShowMoreItems } from '@components/ShowMoreItems';
import { invenioConfig } from '@config';
import _isEmpty from 'lodash/isEmpty';
import _truncate from 'lodash/truncate';
import PropTypes from 'prop-types';
import React from 'react';
import { List } from 'semantic-ui-react';

const AccessUrl = ({ truncate, url }) => {
  const description = url.description || url.value;
  return (
    <List.Item>
      <List.Icon name="linkify" />
      <List.Content>
        <a href={url.value}>
          {truncate ? _truncate(description, { length: 35 }) : description}{' '}
        </a>
      </List.Content>
    </List.Item>
  );
};

AccessUrl.propTypes = {
  url: PropTypes.shape({
    description: PropTypes.string,
    value: PropTypes.string.isRequired,
    open_access: PropTypes.bool,
  }).isRequired,
  truncate: PropTypes.bool,
};

AccessUrl.defaultProps = {
  truncate: false,
};

export class LiteratureAccessUrls extends React.Component {
  render() {
    const { urls, truncate } = this.props;
    return _isEmpty(urls) ? (
      <p>There are no online resources.</p>
    ) : (
      <ShowMoreItems lines={invenioConfig.DOCUMENTS.frontsiteMaxLinks}>
        {urls.map((url, index) => (
          <AccessUrl key={index} truncate={truncate} url={url} />
        ))}
      </ShowMoreItems>
    );
  }
}

LiteratureAccessUrls.propTypes = {
  urls: PropTypes.arrayOf(AccessUrl.propTypes.url),
  truncate: PropTypes.bool,
};

LiteratureAccessUrls.defaultProps = {
  urls: [],
  truncate: false,
};