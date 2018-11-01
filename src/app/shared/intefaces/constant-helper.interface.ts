export declare interface ConstantHelper {
    service_name: string;

    url(action: string): string;

    msg(action: string): string;

    notification(type: string, message: string): void
}
