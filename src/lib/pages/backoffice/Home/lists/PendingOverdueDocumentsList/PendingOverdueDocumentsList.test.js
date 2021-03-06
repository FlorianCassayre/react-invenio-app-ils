import React from 'react';
import { shallow, mount } from 'enzyme';
import { Settings } from 'luxon';
import { fromISO } from '@api/date';
import { BackOfficeRoutes } from '@routes/urls';
import PendingOverdueDocumentsList from './PendingOverdueDocumentsList';
import * as testData from '@testData/documents.json';

jest.mock('react-router-dom');
let mockViewDetails = jest.fn();

BackOfficeRoutes.documentDetailsFor = jest.fn(pid => `url/${pid}`);

Settings.defaultZoneName = 'utc';
const stringDate = fromISO('2018-01-01T11:05:00+01:00');

describe('PendingOverdueDocumentsList tests', () => {
  let component;
  afterEach(() => {
    mockViewDetails.mockClear();
    if (component) {
      component.unmount();
    }
  });

  it('should load the details component', () => {
    const component = shallow(
      <PendingOverdueDocumentsList
        data={{ hits: [], total: 0 }}
        fetchPendingOverdueDocuments={() => {}}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should fetch documents on mount', () => {
    const mockedFetchDocuments = jest.fn();
    component = mount(
      <PendingOverdueDocumentsList
        data={{ hits: [], total: 0 }}
        fetchPendingOverdueDocuments={mockedFetchDocuments}
      />
    );
    expect(mockedFetchDocuments).toHaveBeenCalled();
  });

  it('should render show a message with no documents', () => {
    component = mount(
      <PendingOverdueDocumentsList
        data={{ hits: [], total: 0 }}
        fetchPendingOverdueDocuments={() => {}}
      />
    );

    expect(component).toMatchSnapshot();
    const message = component
      .find('Message')
      .filterWhere(element => element.prop('data-test') === 'no-results');
    expect(message).toHaveLength(1);
  });

  it('should render documents', () => {
    const data = {
      hits: [
        {
          id: 1,
          updated: stringDate,
          created: stringDate,
          pid: 'document1',
          metadata: {
            ...testData[0],
          },
        },
        {
          id: 2,
          updated: stringDate,
          created: stringDate,
          pid: 'document2',
          metadata: {
            ...testData[1],
          },
        },
      ],
      total: 2,
    };
    component = mount(
      <PendingOverdueDocumentsList
        data={data}
        fetchPendingOverdueDocuments={() => {}}
      />
    );

    expect(component).toMatchSnapshot();
    const rows = component
      .find('TableRow')
      .filterWhere(
        element =>
          element.prop('data-test') === 'document1' ||
          element.prop('data-test') === 'document2'
      );
    expect(rows).toHaveLength(2);

    const footer = component
      .find('TableRow')
      .filterWhere(element => element.prop('data-test') === 'footer');
    expect(footer).toHaveLength(0);
  });
});
