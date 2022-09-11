export interface BookColums{
    title:string,
    key?:string,
    colSpan?:number,
    dataIndex:string,
}
export interface BookReviewProps{
    isAnswered?:boolean
}
export interface BookList{
    key:string | number
    book_name:string,
    author:string,
    faculty:string,
    department:string,
    level:string | number,
    semester:string | number,
    fmt:string,
    qty:string | number,
    price:string | number,
    status:string,

}
export interface CustomerList{
    key?:string | number
    first_name?:string,
    last_name?:string,
    faculty?:string,
    department?:string,
    email?:string | number,
    school?:string | number,
    phone_no?:string|number,
    [key:string]:any,
    profile_picture?:string,
}
export interface EventList{
    key?:string | number
    name?:string,
    description?:string,
    location?:string,
    no_of_reg?:string,
    event_date?:string | number,
    event_time?:string | number,
    [key:string]:any,
}

export interface CommunityList{
    key?:string | number
    title?:string,
    createdAt?:string,
    status?:string,
    members?:any,
    [key:string]:any,
}

export interface OrdersList{
    key?:string | number
    phone?:string,
    email?:string,
    shipping_location?:string,
    payment_price?:string | number,
    status?:string|number,
    delivered_by?:string,
    createdAt:string
    [key:string]:any,
}