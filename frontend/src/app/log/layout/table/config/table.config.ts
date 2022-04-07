import { DatePipe } from '@angular/common';

export const TABLE_STYLES = {
    fontSize: {
        small: 12,
        normal: 14,
        large: 16,
    },
    rowHeight: {
        small: 33,
        normal: 50,
        large: 71,
    },
    logLevel: {
        ERROR: 'primary',
        INFO: 'secondary',
        WARN: 'secondary',
    },
};

export const COLUMN_DEFS = [
    {
        headerName: '#',
        field: 'status',
        width: 60,
        valueGetter: 'node.id',
        cellRenderer: (params: any) => {
            return params.value !== undefined
                ? ''
                : '<img width="50px" height="50px" src="/assets/img/loading.gif"></img>';
        },
        cellStyle: {
            display: 'flex',
            'justify-content': 'center',
            'align-items': 'center',
        },
        wrapText: false,
        suppressMovable: true,
    },
    {
        headerName: 'Timestamp',
        field: 'timestamp',
        width: 260,
        cellRenderer: (params: any) => {
            const datepipe: DatePipe = new DatePipe('en-US');
            let formattedDate = datepipe.transform(
                params.value,
                'HH:mm:ss - dd/MM/YYYY'
            );
            return formattedDate;
        },
    },
    {
        headerName: 'Log Level',
        field: 'log_level',
        width: 120,
    },
    {
        headerName: 'Message',
        field: 'message',
        width: 500,
    },
    {
        headerName: 'Host',
        field: 'host',
        width: 250,
    },
    {
        headerName: 'Cluster ID',
        field: 'cluster_id',
        width: 250,
    },

    {
        headerName: 'Logger',
        field: 'logger',
        width: 250,
    },
    {
        headerName: 'Node ID',
        field: 'node_id',
        width: 250,
    },
    {
        headerName: 'Node Role',
        field: 'node_role',
        width: 250,
    },
    {
        headerName: 'Stacktrace',
        field: 'stacktrace',
        width: 250,
    },
    {
        headerName: 'Thread',
        field: 'thread',
        width: 200,
    },
];
