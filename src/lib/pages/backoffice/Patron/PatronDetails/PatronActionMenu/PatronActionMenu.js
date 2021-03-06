import {
  ScrollingMenu,
  ScrollingMenuItem,
} from '@components/backoffice/buttons/ScrollingMenu';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PatronActionMenu extends Component {
  render() {
    const { offset } = this.props;
    return (
      <div className="bo-action-menu">
        <ScrollingMenu offset={offset}>
          <ScrollingMenuItem label="Checkout" elementId="patron-checkout" />
          <ScrollingMenuItem label="Ongoing loans" elementId="ongoing-loans" />
          <ScrollingMenuItem
            label="Pending loan requests"
            elementId="loan-requests"
          />
          <ScrollingMenuItem
            label="Ongoing interlibrary loans"
            elementId="ongoing-borrowing-requests"
          />
          <ScrollingMenuItem
            label="Requests for new literature"
            elementId="literature-requests"
          />
          <ScrollingMenuItem label="Loans history" elementId="loans-history" />
          <ScrollingMenuItem
            label="Interlibrary loans history"
            elementId="borrowing-requests-history"
          />
        </ScrollingMenu>
      </div>
    );
  }
}

PatronActionMenu.propTypes = {
  offset: PropTypes.number.isRequired,
};
