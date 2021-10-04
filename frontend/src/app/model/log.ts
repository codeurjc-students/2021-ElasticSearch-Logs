export interface Log {

    id: string;

    agent: string;

    bytes: string;

    clientIp: string;

    event: Map<string, string>;

    extension: string;

    geo: Map<string, string>;

    host: string;

    index: string;

    ip: string

    ip_range: string;

    machine: Map<string, string>;
    
    memory: string;

    message: string;

    phpmemory: string;

    referer: string;

    request: string;

    response: string

    tags: string;

    timestamp: string;

    timestamp_range: string;

    url: string;

    utc_time: string;
}