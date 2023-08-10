import React, { Fragment, ReactNode, useContext, useEffect, useState } from 'react';
import NetworkState, { Factory } from '../../../../core/utils/resource';
import { getApplicationDetail } from '../state/application-detail.state';
import { ApplicationDetailDataEntity, ApplicationDetailEntity } from '../../domain/entity/application-detail.entity';
import { Box, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { allMonths, getMonth } from '../../../../core/utils/date-util';

interface ApplicationDetailProps {
    name: string
}

const ApplicationDetail: React.FC<{ props: ApplicationDetailProps }> = ({ props }: { props: ApplicationDetailProps }) => {

    const [applicationState, setApplicationState] = useState<NetworkState<ApplicationDetailEntity>>(Factory.createLoading);

    useEffect(
        () => {
            getApplicationDetail(
                props.name,
                (newState) => {
                    setApplicationState(newState);
                }
            )
        },
        []
    );

    const getContent = (): ReactNode => {
        switch (applicationState.state) {
            case 'loading':
                return (<div>
                    <Typography variant="h4" gutterBottom>{props.name}</Typography>
                    <h4>Loading...</h4>
                </div>);
            case 'failed':
                return (<div><h4>Could not load application list. Error Code: {applicationState.code}</h4></div>);
            case 'success':
                return LoadedContent({ applicationDetail: applicationState.response });

        }
    }

    return <Box sx={{ padding: "10px" }}>
        <Box sx={{ maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
            {getContent()}
        </Box>
    </Box>;
}

interface LoadedContentProps {
    applicationDetail: ApplicationDetailEntity
}

const LoadedContent: React.FC<LoadedContentProps> = ({ applicationDetail }: LoadedContentProps) => {

    return <Fragment>
        <Typography variant="h4" gutterBottom>
            {applicationDetail.name}
        </Typography>

        <Typography variant="caption" gutterBottom>Consumed month-wise resource consumption</Typography>

        <Box sx={{ width: '100%' }}>
            <ApplicationUsageGraph applicationDetail={applicationDetail} />
        </Box>

        <Box sx={{ width: '100%' }}>
            <ApplicationUsageTable applicationDetail={applicationDetail} />
        </Box>
    </Fragment>;
}

interface ApplicationUsageGraph {
    applicationDetail: ApplicationDetailEntity
}

const ApplicationUsageGraph: React.FC<ApplicationUsageGraph> = ({ applicationDetail }: ApplicationUsageGraph) => {

    const sortedData = [...applicationDetail.data].sort((a, b) => a.timestamp - b.timestamp);

    const axisData: string[] = allMonths;

    const dataObject: { [key: string]: number[] } = {};


    for (let index = 0; index < sortedData.length; index++) {
        const data = sortedData[index];

        const monthIndex = (new Date(data.timestamp)).getMonth();

        let previousValue: number = 0;
        try {
            previousValue = dataObject[data.serviceName][monthIndex];
        } catch (e) {
            // do nothing
        }

        if (!dataObject[data.serviceName]) {
            dataObject[data.serviceName] = [];
        }

        dataObject[data.serviceName][monthIndex] = previousValue + data.quantityConsumed;
    }

    const fillEmptyMonthEntries = (data: number[]): number[] => {
        const updatedEntries = [];

        for (let index = 0; index < allMonths.length; index++) {
            updatedEntries[index] = data[index] ?? 0;

        }

        return updatedEntries;
    }

    const seriesData = Object.keys(dataObject).map(key => {
        return {
            data: fillEmptyMonthEntries(dataObject[key]),
            label: key
        }
    })

    return <BarChart
        legend={{ hidden: true }}
        sx={{ marginLeft: 'auto', marginRight: 'auto' }}
        xAxis={[{ scaleType: 'band', data: allMonths }]}
        series={seriesData}
        height={300}
    />;

}

interface ApplicationUsageTableProps {
    applicationDetail: ApplicationDetailEntity
}

const ApplicationUsageTable: React.FC<ApplicationUsageTableProps> = ({ applicationDetail }: ApplicationUsageTableProps) => {

    const sortedData = [...applicationDetail.data].sort((a, b) => a.timestamp - b.timestamp);

    const formatDate = (date: Date): string => {
        return `${date.getDate()}-${getMonth(date)}-${date.getFullYear()}`;
    }

    const columns: GridColDef[] = [
        {
            field: 'timestamp',
            headerName: 'Date',
            editable: false,
            valueFormatter: (value) => {
                return formatDate(new Date(value.value))
            }
        },
        {
            field: 'serviceName',
            headerName: 'Service Name',
            editable: false,
            flex: 1,
        },
        {
            field: 'quantityConsumed',
            headerName: 'Quantity Consumed',
            editable: false,
            width:200
        }
    ];

    const rows = sortedData;



    return (
        <Fragment>
            <Typography variant="subtitle2" gutterBottom>Detailed logs for utilization:</Typography>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                getRowId={(row: ApplicationDetailDataEntity) => row.id}
                rowSelection={false}
            />
        </Fragment>
    )
}

export default ApplicationDetail;