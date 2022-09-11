import {CustomerList,BookList, EventList, OrdersList, CommunityList} from "./interfaces"
import type { ColumnsType } from 'antd/es/table';
import React from 'react'
import { Tag } from "antd";

export const book_columns:ColumnsType<BookList> = [
  {
    title:"Book Name",
    key:"book-name",
    dataIndex:"book_name",
    width:600,
    align:"left",
   
  },
  {
    title:"Author",
    key:"author",
    width:400,
    dataIndex:"author"
  },
  {
    title:"Faculty",
    key:"faculty",
    dataIndex:"faculty"
  },
  {
    title:"Department",
    key:"department",
    dataIndex:"department"
  },
  {
    title:"Level",
    key:"level",
    dataIndex:"level"
  },
  {
    title:"Sem",
    key:"semester",
    dataIndex:"semester"
  },
  {
    title:"Format",
    key:"fmt",
    dataIndex:"fmt"
  },
  {
    title:"Quantity",
    key:"qty",
    dataIndex:"qty"
  },
  {
    title:"Price",
    key:"price",
    dataIndex:"price"
  },
  {
    title:"Status",
    key:"status",
    dataIndex:"status"
  }
]

export const customer_columns:ColumnsType<CustomerList> = [
  {
    title:"First Name",
    key:"first_name",
    dataIndex:"first_name",
    align:"left",
   
  },
  {
    title:"Last Name",
    key:"last_name",
    dataIndex:"last_name"
  },
  {
    title:"Faculty",
    key:"faculty",
    dataIndex:"faculty"
  },
  {
    title:"Department",
    key:"department",
    dataIndex:"department"
  },
  {
    title:"School",
    key:"school",
    dataIndex:"school"
  },
  {
    title:"Email",
    key:"email",
    dataIndex:"email"
  },
]

export const events_columns:ColumnsType<EventList>=[
  {
    title:"Event Name",
    key:"event_name",
    dataIndex:"name",
    align:"left",
    width:300
  },
  {
    title:"Description",
    key:"desc",
    dataIndex:"description",
    align:'center',
    width:400
  },
  {
    title:"No. Of Reg",
    key:"no_of_reg",
    dataIndex:"no_of_reg",
    width:150
  },
  {
    title:"Location",
    key:"location",
    dataIndex:"location",
    width:150
  },
  {
    title:"Date",
    key:"date",
    dataIndex:"event_date",
    width:150
  },
  {
    title:"Time",
    key:"time",
    dataIndex:"event_time",
    width:150
  },
]
export const ordersTable:ColumnsType<OrdersList>=[
  {
    title:"Phone No",
    key:"dephonesc",
    dataIndex:"phone_number",
    align:'center',
    width:150
  },
  {
    title:"Email",
    key:"email",
    dataIndex:"createdBy",
    align:'center',
    width:150
  },
  {
    title:"Location",
    key:"location",
    dataIndex:"shipping_location",
    width:150
  },
  {
    title:"Price",
    key:"total",
    dataIndex:"payment_price",
    width:150
  },
  {
    title:"Status",
    key:"status",
    dataIndex:"status",
    width:150
  },
  {
    title:"Delivered By",
    key:"delivered_by",
    dataIndex:"delivered_by",
    width:150
  },
  {
    title:"Date",
    key:"date",
    dataIndex:"date",
    width:150
  },
]

export const community_columns:ColumnsType<CommunityList>=[
  {
    title:"Name",
    key:"name",
    dataIndex:"title",
    align:'center',
    width:300
  },
  {
    title:"No Of Members",
    key:"members",
    dataIndex:"members",
    width:150,
    align:'center',
  },
  {
    title:"Date",
    key:"date",
    dataIndex:"createdAt",
    width:150
  },
  {
    title:"Status",
    key:"status",
    dataIndex:"status",
    width:150,
    render:(_,obj)=>{
      const {status} = obj
      let color = status?.toLowerCase() == "pending"?"orange"
      :status?.toLowerCase()  === "approved"?"green"
      :status?.toLowerCase()  === "declined"?"red"
      :status?.toLowerCase()  === "suspended" && "grey"
      return(
          <Tag color={color as string} className={`capitalize text-xs p-2 rounded-xl`}>
             {status}
          </Tag>
      )
    }
  },
]
