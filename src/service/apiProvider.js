import {
    // postRequest,
    getRequest,
    // patchRequest,
    // postFileRequest
  } from '@/service/apiRequestMethod';
  
  import{
    baseUrl,
    getAllMember,

  } from '@/utils/apiConfig.js';

  // get stream details
export async function getMemberInfo() {

    const url = baseUrl + getAllMember
    console.log(url);
    try {
      const response = await getRequest(url);
  
      const code = response.code;
      const data = response.data;
      // console.log(response);
      // console.log(code);
      // console.log(data);
      if (code === 0) {
        return data;
      }else {
        console.log(`get getUserInfo Unsuccessfully: ${code}`);
        return [];
      }
  
    } catch (e) {
      console.log(`Unsuccessful in provider: ${e}`);
      return [];
    }
  }