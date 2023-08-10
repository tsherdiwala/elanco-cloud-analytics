import React, { ReactNode, useContext, useEffect, useState } from 'react';
import NetworkState, { Factory } from '../../../../core/utils/resource';
import { ApplicationEntity } from '../../domain/entity/application.entity';
import { getApplications } from '../state/application-list.state';
import { Link } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography, styled } from '@mui/material';

export interface ApplicationListProps {
    initialApplication: NetworkState<ApplicationEntity[]>
}

const ApplicationList: React.FC<{}> = (props) => {
    const [applicationState, setApplicationState] = useState<NetworkState<ApplicationEntity[]>>(Factory.createLoading);

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
                return LoadedList({ applications: applicationState.response });

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
    applications: ApplicationEntity[]
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


const LoadedList: React.FC<LoadedListProps> = ({ applications }: LoadedListProps) => {

    return <TableContainer component={Paper}>
        <Table aria-label="customized table">
            <TableBody>
                {applications.map((application) =>
                    <StyledTableRow key={application.name}>
                        <TableCell>
                            <Link to={`/application/${application.name}`} >
                                {application.name}
                            </Link>
                        </TableCell>

                    </StyledTableRow>
                )}
            </TableBody>
        </Table>
    </TableContainer>;

}

export default ApplicationList;