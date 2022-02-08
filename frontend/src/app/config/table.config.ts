export const COLUMN_DEFS = [
  {
    headerName: '',
    field: 'status',
    width: 60,
    cellRenderer: 'loadingRenderer',
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
