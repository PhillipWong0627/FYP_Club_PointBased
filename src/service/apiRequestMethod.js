import axios from 'axios';


const header = {
  "Content-Type": "application/json; charset=utf-8",
  "accept": "application/json"
}

export async function postRequest(url, body) {
  try {
    const response = await axios.post(url, body, {
      headers: header,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Exception: ${error}`);
  }
}

export async function getRequest(url) {
  try {
    const response = await axios.get(url);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Exception: ${error}`);
  }
}


export async function patchRequest(url, body) {
  try {
    const response = await axios.patch(url, body, {
      headers: header,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Exception: ${error}`);
  }
}
export async function deleteRequest(url) {
  try {
    const response = await axios.delete(url);

    if (response.status === 200) {
      console.log('Response Data:', response.data);

      return response.data
    } else {
      throw new Error(`Error: ${response.status}`);
    }
  } catch (e) {
    console.error(`Exception: ${e.message}`);
  }
}

// export async function postFileRequest(file, url) {
//   try {
//     const formData = new FormData();
//     formData.append('file', file);

//     const response = await axios.post(url, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     if (response.status === 200) {
//       return response.data;
//     } else {
//       throw new Error(`Error: ${response.status}`);
//     }
//   } catch (error) {
//     throw new Error(`Exception: ${error}`);
//   }
// }

export async function getRequestSearchStream(url) {
  try {
    const response = await axios.get(url);


    if (response.status === 200) {
      console.log('Response Data:', response.data);

      return response.data
    } else {
      throw new Error(`Error: ${response.status}`);
    }
  } catch (e) {
    console.error(`Exception: ${e.message}`);
  }

}

export async function deleteLiveStreamDetail(url) {
  try {
    const response = await axios.delete(url);

    if (response.status === 200) {
      console.log('Response Data:', response.data);

      return response.data
    } else {
      throw new Error(`Error: ${response.status}`);
    }
  } catch (e) {
    console.error(`Exception: ${e.message}`);
  }
}

export async function postFileRequest(file, url) {
  {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', "j8c3wtcm");

      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // console.log(response)

      if (response.status === 200) {
        return response;
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      throw new Error(`Exception: ${error}`);
    }
  }
}