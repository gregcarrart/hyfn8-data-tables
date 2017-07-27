import React from 'react';
import FixedDataTable from 'fixed-data-table';
import GetContainerDimensions from 'react-dimensions'
import TableStore from 'stores/TableStore';
import AdActions from 'actions/AdActions';
import AdMetricsActions from 'actions/AdMetricsActions';
import _ from 'lodash';
import { Link, IndexLink } from 'react-router';
import { connectToStores } from 'fluxible-addons-react';

const {Table, Column, Cell} = FixedDataTable;

const TextCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data[rowIndex][col]}
  </Cell>
);

class TableView extends React.Component {

    componentDidMount () {
        this.context.executeAction(AdActions, {});
        this.context.executeAction(AdMetricsActions, {});
    }

    render () {
        let adData = null;
        let adMetricData = null;
        let dataColumns = null;
        let fixedColumn = null;
        let sortedColumn = [];

        if (this.props.tableState.ads) {
            adData = this.props.tableState.ads.ads;

            if (this.props.tableState.adMetrics) {
                adMetricData = this.props.tableState.adMetrics.rows;

                _.each(adData, function(ad) {
                    _.each(adMetricData, function(adMetric) {
                        if (ad.remote_id == adMetric.remote_id) {
                            sortedColumn.push(adMetric);
                        }
                    });
                });

                dataColumns = this.props.tableState.adMetrics.column_names.map((column, i) => {
                    return (
                        <Column
                            header={<Cell>{column}</Cell>}
                            cell={<TextCell data={sortedColumn} col={column} />}
                            width={100}
                            key={i}
                            flexGrow={1}
                        />
                    )
                });
            }
        }

        return (
            <Table
                rowHeight={50}
                headerHeight={50}
                rowsCount={adData ? adData.length : 0}
                width={this.props.containerWidth}
                height={500}
                {...this.props}>
                <Column
                    header={<Cell>Ad Name</Cell>}
                    cell={<TextCell data={adData ? adData : 0} col="id" />}
                    fixed={true}
                    width={100}
                />
                {dataColumns}
              </Table>
          );

    }
}

TableView.contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
};

TableView = connectToStores(TableView, ['TableStore'], (context) => ({
    tableState: context.getStore('TableStore').getState(),
}));

export default GetContainerDimensions()(TableView);
