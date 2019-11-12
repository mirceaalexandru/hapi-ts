export interface ConfigInterface {
    service: {
        host: string,
        port: number
    },
    env: string,
    applicationTTL: number
}