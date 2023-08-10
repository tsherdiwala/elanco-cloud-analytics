import React, { ReactNode, useContext, useEffect, useState } from 'react';
import NetworkState, { Factory } from '../../../../core/utils/resource';
import { ApplicationEntity } from '../../domain/entity/application.entity';
import { getApplications } from '../state/application-list.state';
import { useNavigate } from 'react-router-dom';
import { Box, TableRow, Typography, styled } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export interface ApplicationListProps {
    initialApplication: NetworkState<ApplicationEntity[]>
}

const ApplicationList: React.FC<{}> = (props) => {
    const [applicationState, setApplicationState] = useState<NetworkState<ApplicationEntity[]>>(Factory.createLoading);

    let navigate = useNavigate();

    useEffect(
        () => {
            getApplications((newState) => {
                setApplicationState(newState);
            })
        },
        []
    );


    const getContent = (): ReactNode => {
        switch (applicationState.state) {
            case 'loading':
                return (<div><h4>Loading...</h4></div>);
            case 'failed':
                return (<div><h4>Could not load application list. Error Code: {applicationState.code}</h4></div>);
            case 'success':
                return LoadedList({ applications: applicationState.response, onSelect(application) {
                    navigate(`/application/${application}`)
                }, });

        }
    }


    return (
        <Box sx={{ padding: "10px" }}>
            <Box sx={{
                width: '100%', maxWidth: 500, marginRight: 'auto',
                marginLeft: 'auto',
            }} >
                <Typography variant="h4" gutterBottom>
                    Application List
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Pick on of the application below to view the details
                </Typography>
                <div>
                    {getContent()}
                </div>
            </Box>
        </Box>
    );

}

interface LoadedListProps {
    applications: ApplicationEntity[],
    onSelect: (application: string) => void
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const LoadedList: React.FC<LoadedListProps> = ({ applications, onSelect }: LoadedListProps) => {

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Application Name',
            editable: false,
            flex: 1,
          }
    ];

    const rows = applications;

    return <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        getRowId={(row: ApplicationEntity) => row.name}
        rowSelection={false}
        onRowClick={(row) => {
            onSelect(row.row.name);
        }}
      />
}

export default ApplicationList;