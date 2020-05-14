//jsint esversion:6
module.exports.getDate=()=>{
let date=new Date();
let options={weekday:'long',month:'long',year:'numeric'}
let currenttime=date.toLocaleDateString('hi-IN',options);
return currenttime;
}
module.exports.getDay =()=>{
    let date=new Date();
    let options={weekday:'long'}
    let currenttime=date.toLocaleDateString('hi-IN',options);
    return currenttime;
    }
    