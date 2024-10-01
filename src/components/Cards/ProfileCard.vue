<template>
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
    <Toast ref="toast" />
    <div class="h-[450px] flex items-center justify-center" v-if="loading">
      <span class="font-bold text-2xl text-black"> Loading...</span>
      <img class="pl-5" src="@/assets/pandaLoading.gif" alt="panda loading" style="width: 108px; height: 108px" />
    </div>
    <div class="flex flex-wrap justify-center">
      <div class="w-full px-4 flex justify-center ">
        <div class="relative ">
          <img class="shadow-xl rounded-full h-auto align-middle border-none "
            style="width: 140px; height: 140px; object-fit: cover;"
            :src="memberData.avatar ? memberData.avatar : defaultAvatar" />
          <!-- Add upload button here -->
          <label for="upload" class="absolute bottom-0 right-0 cursor-pointer">
            <img src="@/assets/upload-icon.png" style="width: 24px; height: 24px;" />
            <input type="file" id="upload" style="display: none;" @change="onFileChange" />

            <!-- <input type="file" id="upload" style="display: none;" @change="handleImageUpload" /> -->
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
              <input type="text" placeholder="Enter Address"
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
              <textarea v-model="memberData.description" type="text" placeholder="Describe About Yourself"
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
        description: "",
        avatar: "",

      }, // to store the fetched member data


      selectedFile: null,
      imagePreview: null, // For image preview
      uploadedImage: null,

      memberId: localStorage.getItem('memberID'),
      uploadedAvatarUrl: null, // URL of uploaded avatar from Cloudinary
      // Default avatar image
      defaultAvatar: require('@/assets/profile_coach.jpg').default, // Path to your default avatar image

      loading: false,

    };
  },
  methods: {
    // Function to handle the file input change event
    onFileChange(e) {
      // this.selectedFile = e.target.files[0];
      const file = e.target.files[0];
      if (file) {
        this.selectedFile = file;

        // Create a FileReader to read the file and show the preview
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result; // Store the image data for preview
        };
        reader.readAsDataURL(file);
        // Upload the image after selection
        this.uploadImage();

      }

    },

    // Function to upload the image to Cloudinary
    async uploadImage() {

      if (!this.selectedFile) {
        alert("Please select an image to upload.");
        return;
      }
      this.loading = true; // Show loading indicator


      const formData = new FormData();
      formData.append("file", this.selectedFile);
      formData.append("upload_preset", "j8c3wtcm"); // Replace with your Cloudinary upload preset

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dnzypglvm/image/upload`, // Replace YOUR_CLOUD_NAME with your Cloudinary cloud name
          formData
        );
        console.log("This is Response")
        console.log(response);
        console.log(response.status);

        if (response.status === 200) {
          this.uploadedImage = response.data.secure_url;

          // console.log('Image uploaded successfully: ', this.uploadedAvatarUrl);
          alert('Updated To Cloud Succesfully!');

          console.log("Image uploaded successfully: ", this.uploadedImage);
          this.updateAvatar();
        }

      } catch (error) {
        console.error("Error uploading the image:", error);
      } finally {
        this.loading = false; // Hide loading indicator

      }
    },
    // Update avatar using the API call
    async updateAvatar() {

      console.log(this.uploadedImage);
      try {
        const response = await axios.put(`/api/v1/user/${this.memberId}/update-avatar`, {
          avatarUrl: this.uploadedImage
        });

        console.log('Avatar updated successfully:', response);
        this.loading = false; // Show loading indicator

        alert('Avatar updated successfully!');
        // this.fetchMemberData();
        window.location.reload();

      } catch (error) {
        console.error('Error updating the avatar:', error);
        alert('Failed to update the avatar.');
      } finally {
        this.loading = false; // Show loading indicator

      }
    },


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