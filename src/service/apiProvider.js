import {
  // postRequest,
  getRequest,
  patchRequest,
  deleteRequest,
  // postFileRequest
} from '@/service/apiRequestMethod';

import {
  baseUrl,
  getAllMember,
  addNewMember,
  getMemberById,
  updateMemberById,
  deleteMemberById,
  memberLogin,
  makePayment,
  getAllFacility,

} from '@/utils/apiConfig.js';
import { postRequest } from './apiRequestMethod';

// get user cookie / set cookie

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

export async function addMember(email, username, password, contactNumber, paymentAmount) {
  const url = baseUrl + addNewMember;
  // console.log(url);
  // console.log(contactNumber);
  // console.log(paymentAmount);

  const apiDetails = {
    email: email,
    memberName: username,
    password: password,
    contact: contactNumber,
    points: paymentAmount,
  };
  try {
    const response = await postRequest(url, apiDetails);
    console.log(response);

    const code = response.code;

    if (code === 0) {
      // return data;
      return true;
    } else {
      console.log(`Unsuccessfully register: ${code}`);
      return false;
    }

  } catch (e) {
    console.log(`Unsuccessful in provider: ${e}`);
    return false;
  }
}

export async function getMember(id) {
  const url = baseUrl + getMemberById + "/" + id;
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
      console.log(`get getMember Unsuccessfully: ${code}`);
      return [];
    }

  } catch (e) {
    console.log(`Unsuccessful in provider:getMember ${e}`);
    return [];
  }
}

export async function updateMember(id, name, address, contact, description) {
  const url = baseUrl + updateMemberById + "/" + id;
  console.log(url);

  const apiDetails = {
    memberName: name,
    address: address,
    contact: contact,
    description: description,
  };

  try {
    const response = await patchRequest(url, apiDetails);
    console.log(response);

    const code = response.code;
    const data = response.data;

    if (code === 0) {
      // return data;
      return data;
    } else {
      console.log(`Unsuccessfully updateMember: ${code}`);
      return [];
    }

  } catch (e) {
    console.log(`Unsuccessful in provider:updateMember ${e}`);
    return [];
  }

}

export async function deleteMember(id) {
  const url = baseUrl + deleteMemberById + "/" + id;
  // console.log(url);

  try {
    const response = await deleteRequest(url);
    console.log(response);

    const code = response.code;

    if (code === 0) {
      // return data;
      return true;
    } else {
      console.log(`Unsuccessfully delete: ${code}`);
      return false;
    }

  } catch (e) {
    console.log(`Unsuccessful in provider:delete ${e}`);
    return false;
  }
}




export async function login(email, password) {
  const url = baseUrl + memberLogin;
  const apiDetails = {
    email: email,
    password: password,
  };

  try {
    const response = await postRequest(url, apiDetails);
    console.log(response);

    const code = response.code;
    const data = response.data;

    // console.log("THIS IS DATA");
    // console.log(data);

    if (code === 0) {

      localStorage.setItem('memberID', data['memberID']);
      localStorage.setItem('memberName', data['memberName']);
      localStorage.setItem('email', data['email']);
      localStorage.setItem('points', data['points']);

      return true;
    } else {
      console.log(`Unsuccessfully login: ${code}`);
      return false;
    }

  } catch (e) {
    console.log(`Unsuccessful in provider: ${e}`);
    return false;
  }

}


export async function makePaymentGetPoint(memberID, paymentAmount) {
  const url = baseUrl + makePayment + memberID + 'add-points';

  console.log("Payment URL");
  console.log(url);

  const apiDetails = {
    points: paymentAmount
  };

  try {
    const response = await postRequest(url, apiDetails);
    console.log(response);

    const code = response.code;

    if (code === 0) {
      return true;
    } else {
      console.log(`Unsuccessfully makePayment: ${code}`);
      return false;
    }

  } catch (e) {
    console.log(`Unsuccessful in provider:makePayment  ${e}`);
    return false;
  }

}

export async function getFacility() {
  const url = baseUrl + getAllFacility
  console.log(url);
  try {
    const response = await getRequest(url);

    const code = response.code;
    const data = response.data;
    // console.log(response);
    // console.log(code);
    if (code === 0) {
      // console.log(data);

      return data;
    } else {
      console.log(`get getFacilityInfo Unsuccessfully: ${code}`);
      return [];
    }

  } catch (e) {
    console.log(`Unsuccessful in provider:getFacilityInfo ${e}`);
    return [];
  }

}
