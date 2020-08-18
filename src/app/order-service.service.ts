import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {
  keyC:string; //stores the key of the COD order plans being pushedd
  keyO:string; //stores the key of the order plan being pushed
  keySc:string; //stores the key of the COD order services being pushedd
  keySo:string; //stores the key of the order service being pushed
  constructor(private db:AngularFireDatabase) { }

  //adds the unique key of the booked plan to the data of the user's db who has booked that order so that we can get the complete info the booked plan
  addOrders(id,BookingKey)
  {
     this.db.list('/users/'+id+'/Orders').push({ "BookingKey": BookingKey});
  }

  //adds the unique key of the booked service to the data of the user's db who has booked that order
  addServices(id,BookingKey)
  {
     this.db.list('/users/'+id+'/Services').push({ "BookingKey": BookingKey});
  }

//pushes the booked plans to the database under Orders table and also pushes the unique key to the user's database so that the booked plan can be called lateron
  create(userkey,value)
  {
    this.keyO=this.db.list('Orders').push(value).key; //stores the key while pushing so that it can be saved in the user's database
    this.addOrders(userkey,this.keyO);
  }

  //pushes the booked stores to the database under OrdersService table and also pushes the unique key to the user's database so that the booked service can be called lateron
  createService(userkey,value)
  {
    this.keySo=this.db.list('OrdersService').push(value).key; //stores the key while pushing so that it can be saved in the user's database
    this.addServices(userkey,this.keySo);
  }

  
  createCOD(value,userKey)
  {
    //for the COD orders we make the unique key of the key-value pair as the orderid as it will be unique in all cases
     this.keyC=this.db.list('Orders').push(value).key;
    this.db.object('Orders/'+this.keyC).update({"order_id":this.keyC});
    //we also add that key to the user's database
    this.addOrders(userKey,this.keyC);
  }

  //documentation same as the above function
  createCODService(value,userKey)
  {
     this.keySc=this.db.list('OrdersService').push(value).key;
    this.db.object('OrdersService/'+this.keySc).update({"order_id":this.keySc});
    this.addServices(userKey,this.keySc);
  }
  //gets all the booked plans to be converted to the csv format
  getOrders(){
    return this.db.list('/Orders').valueChanges();
  }

  //gets all the booked services till date
  getServices()
  {
    return this.db.list('/OrdersService').valueChanges();
  }

  //get the information of all the partners
  getPartners()
  {
    return this.db.list('/Partners').valueChanges();
  }

  //download the bookedplans csv
  downloadFile(data, filename='data') {
    //we set all the fields of we want in our csv file
    let csvData = this.ConvertToCSV(data, ['first','second','BookingDate','order_id','Mode','Name','Phone','email', 'PlanName', 'Price', 'RegNum','startDate','endDate','selectday1','selectday2','selectday3','Time1','Time2', 'Time3','Validity','Vehicle','WashDays','razorpay_payment_id','Pincode','Address']);
    
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
        dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
}

//download service of the bookedServices table
downloadFileService(data, filename='data') {
  let csvData = this.ConvertToCSV(data, ['first','second','BookedAt','order_id','Mode','Name','Phone','email', 'ServiceName','Price', 'RegNum','Date','Time','Vehicle','razorpay_payment_id','Pincode','Address']);
  let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
  let dwldLink = document.createElement("a");
  let url = URL.createObjectURL(blob);
  let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
  if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
  }
  dwldLink.setAttribute("href", url);
  dwldLink.setAttribute("download", filename + ".csv");
  dwldLink.style.visibility = "hidden";
  document.body.appendChild(dwldLink);
  dwldLink.click();
  document.body.removeChild(dwldLink);
}

//get all tthe partners data 
downloadFilePartners(data, filename='data') {
  let csvData = this.ConvertToCSV(data, ['first','second','name','Phone','Email','Address']);
  let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
  let dwldLink = document.createElement("a");
  let url = URL.createObjectURL(blob);
  let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
  if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
  }
  dwldLink.setAttribute("href", url);
  dwldLink.setAttribute("download", filename + ".csv");
  dwldLink.style.visibility = "hidden";
  document.body.appendChild(dwldLink);
  dwldLink.click();
  document.body.removeChild(dwldLink);
}


//function to convert the data to CSV
ConvertToCSV(objArray, headerList) {
     let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
     let str = '';
     let row = 'S.No,';
for (let index in headerList) {
         row += headerList[index] + ',';
     }
     row = row.slice(0, -1);
     str += row + '\r\n';
     for (let i = 0; i < array.length; i++) {
         let line = (i+1)+'';
         for (let index in headerList) {
            let head = headerList[index];
line += ',' + array[i][head];
         }
         str += line + '\r\n';
     }
     return str;
 }

 
}
