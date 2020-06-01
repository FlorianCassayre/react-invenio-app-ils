import { recordToPidType } from '@api/utils';
import { LiteratureCover } from '@modules/Literature/LiteratureCover';
import { DocumentAuthors } from '@modules/Document/DocumentAuthors';
import { DocumentTitle } from '@modules/Document/DocumentTitle';
import { BackOfficeRoutes } from '@routes/urls';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon } from 'semantic-ui-react';

export class DocumentCard extends Component {
  render() {
    const { data, extra, actions } = this.props;
    const linkTo = BackOfficeRoutes.documentDetailsFor(data.metadata.pid);
    return (
      <Card centered className="bo-relation-card" data-test={data.metadata.pid}>
        <Card.Meta className="discrete">
          {actions}
          {data.metadata.document_type || data.metadata.mode_of_issuance}
        </Card.Meta>
        {recordToPidType(data) === 'docid' ? (
          <LiteratureCover
            size="small"
            url={_get(data, 'metadata.cover_metadata.urls.medium')}
          />
        ) : (
          <Icon name="clone outline" size="huge" color="grey" />
        )}
        <Card.Content>
          <Card.Header as={Link} to={linkTo} target="_blank">
            <DocumentTitle metadata={data.metadata} truncate titleOnly />
          </Card.Header>
          <Card.Meta>
            <DocumentAuthors metadata={data.metadata} />
          </Card.Meta>
        </Card.Content>
        {!_isEmpty(extra) && <Card.Content extra>{extra}</Card.Content>}
      </Card>
    );
  }
}

DocumentCard.propTypes = {
  data: PropTypes.object.isRequired,
  extra: PropTypes.node,
  actions: PropTypes.node.isRequired,
};
DocumentCard.defaultProps = {
  extra: null,
};
