const nodeGeoCoder=require('node-geocoder');
const options = {
    provider:'mapquest',
  httpAdapter:'https',
  
    apiKey:"CpEEaKIKmDqtFP3jVhAPIUWJvTgrMFm8",
    formatter: null 
  };
  
  const geocoder = nodeGeoCoder(options);
  
  
module.exports=geocoder