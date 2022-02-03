export interface Log {
  timestamp: string;
  cluster_id: string;
  message: string;
  host: string;
  log_level: string;
  logger: string;
  node_id: string;
  node_role: string;
  stacktrace: string;
  thread: string;
}
