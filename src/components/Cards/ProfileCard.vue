<template>
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
    <Toast ref="toast" />

    <div class="flex flex-wrap justify-center">
      <div class="w-full px-4 flex justify-center ">
        <div class="relative ">
          <img :src="team2" class="shadow-xl rounded-full h-auto align-middle border-none "
            style="width: 140px; height: 140px; object-fit: cover;" />
          <!-- Add upload button here -->
          <label for="upload" class="absolute bottom-0 right-0 cursor-pointer">
            <img src="@/assets/upload-icon.png" style="width: 24px; height: 24px;" />
            <input type="file" id="upload" style="display: none;" @change="handleImageUpload" />
          </label>

        </div>
      </div>

    </div>

    <div class="rounded-t bg-white mb-0 px-6 py-6">
      <div class="text-center flex justify-between">
        <h6 class="text-blueGray-700 text-xl font-bold">My account</h6>
        <button @click="EditUser(memberData.id)"
          class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          type="button">
          Edit Profile
        </button>
      </div>
    </div>
    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
      <form>
        <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          User Information
        </h6>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                Username
              </label>
              <input type="text"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                v-model="memberData.memberName" />
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                Email address
              </label>
              <input type="email" readonly
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                v-model="memberData.email" />
            </div>
          </div>

        </div>

        <hr class="mt-6 border-b-1 border-blueGray-300" />

        <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          Contact Information
        </h6>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-12/12 px-4">
            <div class="relative w-full mb-3">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                Address
              </label>
              <input type="text"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                v-model="memberData.address" />
            </div>
          </div>
          <div class="w-full lg:w-4/12 px-4">
            <div class="relative w-full mb-3">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                Contact Number
              </label>
              <input type="email"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                v-model="memberData.contact" />
            </div>
          </div>

        </div>

        <hr class="mt-6 border-b-1 border-blueGray-300" />

        <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          About Me
        </h6>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-12/12 px-4">
            <div class="relative w-full mb-3">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                About me
              </label>
              <textarea v-model="memberData.description" type="text"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                rows="4"></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import team2 from "@/assets/img/team-2-800x800.jpg";
import axios from 'axios';
import Toast from '@/components/Toast.vue'; // Make sure the path is correct

export default {
  mounted() {
    this.fetchMemberData(); // Fetch member data when the component is mounted
  },
  components: {
    Toast,
  },

  data() {
    return {
      team2,
      memberData: {
        memberName: "",
        address: "",
        contact: "",
        description: ""

      }, // to store the fetched member data

    };
  },
  methods: {
    async fetchMemberData() {
      const memberId = localStorage.getItem('memberID');
      if (memberId) {
        try {
          const response = await axios.get(`/api/v1/user/getById/${memberId}`);
          console.log(response)
          this.memberData = response.data.data; // assuming the API returns member data in the "data" field
        } catch (error) {
          console.error('Failed to fetch member data:', error);
        }
      } else {
        alert('No member ID found. Please log in.');
      }
    },
    async EditUser(id) {
      console.log(id);
      console.log(this.memberData);
      try {
        const response = await axios.patch(`/api/v1/user/updateById/${id}`, this.memberData);
        if (response.data.code === 0) {
          alert("User updated successfully!");
          // Redirect or handle success logic here
          // Show toast notification after successful update
          this.$refs.toast.showToast("User profile updated successfully!");

        } else {
          alert("Error updating user: " + response.data.msg);
        }
      } catch (error) {
        console.error("Error updating user:", error);
        alert("Failed to update user.");
      }
    }

    // async handleImageUpload(event) {
    //   // Access the selected file
    //   const selectedFile = event.target.files[0];

    //   // send OTP to user phone
    //   const result = await updateProfilePic(selectedFile);

    //   if (result === true) {
    //     // show modal
    //     // this.gobackmypage()

    //     // Set a flag in local storage to show the edit profile modal after refreshing
    //     localStorage.setItem('gobackmypage', 'true');
    //     window.location.reload();

    //   } else if (result === false) {
    //     this.warningMessage = "Please check your network";
    //   } else {
    //     this.warningMessage = result;
    //   }
    // },
  }
};


</script>