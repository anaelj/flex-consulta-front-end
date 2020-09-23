import React, { useEffect, useState } from 'react';
// import Griddle from 'griddle-react';
import Griddle from 'griddle-react';
import { Container, Content } from './styles';
import api from '../../services/api';

interface ITransportadoraFormData {
  name: string;
  email: string;
  contato: string;
  telefone: string;
}

interface ITransportadoras {
  transportadora_id: string;
  name: string;
}

interface IGridData {
  name: string;
}

const Profile: React.FC = () => {
  const [transportadoras, setTransportadoras] = useState<IGridData[]>([]);

  useEffect(() => {
    api
      .get<ITransportadoras[]>(
        '/transportadoras/172e5dcf-e99f-49ed-b9cb-bee53761b1da',
      )
      .then(response => {
        const temp = response.data.map(transportadora => {
          return {
            name: transportadora.name,
          };
        });

        setTransportadoras(temp);
        //        console.log(temp);
      });
  }, []);

  return (
    <Container>
      <Griddle
        data={transportadoras}
        columns={['name']}
        components={{
          Filter: () => <span />,
          // hide settings toggle button
          SettingsToggle: () => <span />,
        }}
        styleConfig={{
          icons: {
            TableHeadingCell: {
              sortDescendingIcon: '▼',
              sortAscendingIcon: '▲',
            },
          },
          classNames: {
            Cell: 'griddle-cell',
            Filter: 'griddle-filter',
            Loading: 'griddle-loadingResults',
            NextButton: 'griddle-next-button',
            NoResults: 'griddle-noResults',
            PageDropdown: 'griddle-page-select',
            Pagination: 'griddle-pagination',
            PreviousButton: 'griddle-previous-button',
            Row: 'griddle-row',
            RowDefinition: 'griddle-row-definition',
            Settings: 'griddle-settings',
            SettingsToggle: 'griddle-settings-toggle',
            Table: 'griddle-table',
            TableBody: 'griddle-table-body',
            TableHeading: 'griddle-table-heading',
            TableHeadingCell: 'griddle-table-heading-cell',
            TableHeadingCellAscending: 'griddle-heading-ascending',
            TableHeadingCellDescending: 'griddle-heading-descending',
          },
          styles: {},
        }}
      />
    </Container>
  );
};

export default Profile;
