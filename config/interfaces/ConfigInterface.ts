export interface ConfigInterface {
    projectName: string,
    version: string,
    service: {
        host: string,
        port: number
    },
    env: string
}