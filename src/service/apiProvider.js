import {
  // postRequest,
  getRequest,
  // patchRequest,
  // postFileRequest
} from '@/service/apiRequestMethod';

import {
  baseUrl,
  getAllMember,
  addNewMember,

} from '@/utils/apiConfig.js';
import { postRequest } from './apiRequestMethod';

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
    } else {
      console.log(`get getUserInfo Unsuccessfully: ${code}`);
      return [];
    }

  } catch (e) {
    console.log(`Unsuccessful in provider: ${e}`);
    return [];
  }
}

export async function addMember(email, username, password) {
  const url = baseUrl + addNewMember;
  console.log(url);

  const apiDetails = {
    email: email,
    memberName: username,
    password: password,
  };
  try {
    const response = await postRequest(url, apiDetails);
    console.log(response);

    const code = response.code;
    const data = response.data;
    // console.log(response);
    // console.log(code);
    // console.log(data);
    if (code === 0) {
      return data;
    } else {
      console.log(`Unsuccessfully register: ${code}`);
      return [];
    }

  } catch (e) {
    console.log(`Unsuccessful in provider: ${e}`);
    return [];
  }
}