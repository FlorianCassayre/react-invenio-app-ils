import React, { Component } from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';
import {
  Error,
  ResultsList,
  ReactSearchKit,
  ResultsLoader,
  SearchBar,
  InvenioSearchApi,
} from 'react-searchkit';
import { Error as IlsError, SearchBar as VendorsSearchBar } from '@components';
import { SearchControls } from '@modules/SearchControls';
import { acqVendorApi as vendorApi } from '@api';
import { AcquisitionRoutes } from '@routes/urls';
import { NewButton } from '@components/backoffice/buttons';
import { ExportReactSearchKitResults } from '@components/backoffice';
import { SearchFooter, SearchEmptyResults } from '@modules/SearchControls';
import history from '@history';
import { VendorList } from './VendorList';

export class VendorSearch extends Component {
  searchApi = new InvenioSearchApi({
    axios: {
      url: vendorApi.searchBaseURL,
      withCredentials: true,
    },
  });

  renderSearchBar = (_, queryString, onInputChange, executeSearch) => {
    const helperFields = [
      {
        name: 'name',
        field: 'name',
        defaultValue: '"Test vendor"',
      },
      {
        name: 'email',
        field: 'email',
        defaultValue: '"info@vendor.com"',
      },
      {
        name: 'address',
        field: 'address',
        defaultValue: '"Geneva"',
      },
    ];
    return (
      <VendorsSearchBar
        currentQueryString={queryString}
        onInputChange={onInputChange}
        executeSearch={executeSearch}
        placeholder="Search for vendors"
        queryHelperFields={helperFields}
      />
    );
  };

  renderEmptyResultsExtra = () => {
    return <NewButton text="Add vendor" to={AcquisitionRoutes.vendorCreate} />;
  };

  renderError = error => {
    return <IlsError error={error} />;
  };

  renderVendorList = results => {
    return <VendorList hits={results} />;
  };

  render() {
    return (
      <>
        <Header as="h2">Vendors</Header>
        <ReactSearchKit searchApi={this.searchApi} history={history}>
          <Container fluid className="spaced">
            <SearchBar renderElement={this.renderSearchBar} />
          </Container>
          <Container fluid className="bo-search-body">
            <Grid>
              <Grid.Row columns={2}>
                <ResultsLoader>
                  <Grid.Column width={16}>
                    <Grid columns={2}>
                      <Grid.Column width={8}>
                        <NewButton
                          text="Add vendor"
                          to={AcquisitionRoutes.vendorCreate}
                        />
                      </Grid.Column>
                      <Grid.Column width={8} textAlign="right">
                        <ExportReactSearchKitResults
                          exportBaseUrl={vendorApi.searchBaseURL}
                        />
                      </Grid.Column>
                    </Grid>
                    <SearchEmptyResults extras={this.renderEmptyResultsExtra} />
                    <Error renderElement={this.renderError} />
                    <SearchControls
                      modelName="acqVendors"
                      withLayoutSwitcher={false}
                    />
                    <ResultsList renderElement={this.renderVendorList} />
                    <SearchFooter />
                  </Grid.Column>
                </ResultsLoader>
              </Grid.Row>
            </Grid>
          </Container>
        </ReactSearchKit>
      </>
    );
  }
}
