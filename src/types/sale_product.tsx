export interface SaleProduct {
    productId: number,
    productName: string, 
    producrDesc: string,
    quota: number,
    price: number
}

export enum SaleProductEnum {
    SUCCESS = '0000',
    NeedLogin = '0003',
}