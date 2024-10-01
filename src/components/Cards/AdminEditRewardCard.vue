<template>
    <div
        class="container mx-auto px-4 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <Toast ref="toast" />
        <div class="h-[450px] flex items-center justify-center" v-if="loading">
            <span class="font-bold text-2xl text-black"> Loading...</span>
            <img class="pl-5" src="@/assets/pandaLoading.gif" alt="panda loading" style="width: 108px; height: 108px" />
        </div>
        <h2 class="text-2xl font-bold mb-4 p-4">Update Reward</h2>
        <form @submit.prevent="updateReward">
            <!-- Reward Title -->
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Reward Name</label>
                <input v-model="Reward.productName" type="text" placeholder="Enter Name"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required>
            </div>
            <!-- Available Stock -->
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Available Stock</label>
                <input v-model="Reward.availableStock" type="number" placeholder="Enter Avaiable Stock" min="0"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required>
            </div>
            <!-- Reward productDescription -->
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Reward Description</label>
                <input v-model="Reward.productDescription" type="text" placeholder="Enter Description"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required>
            </div>
            <!-- Reward Fee -->
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Reward Points</label>
                <input v-model="Reward.points" type="number" placeholder="Enter Reward Points" min="0"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required>
            </div>
            <!-- Reward Image URL -->
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Reward Image URL</label>
                <input type="file" @change="onFileChange"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <div v-if="imagePreview">
                    <h3>Image Preview:</h3>
                    <img :src="imagePreview" alt="Image Preview" style="max-width: 300px; max-height: 300px;" />
                </div>

            </div>
            <!-- Submit Button -->
            <div class="mb-6">
                <ButtonPress :disabled="loading" :class="{ 'disabled-button': loading }" type="submit" class=" ">
                    Update Reward
                </ButtonPress>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import Toast from '@/components/Toast.vue'; // Make sure the path is correct
import ButtonPress from "@/components/ButtonPress.vue";

export default {
    mounted() {
        this.fetchRewardData(); // Fetch event data when component is mounted
    },
    components: {
        Toast,
        ButtonPress
    },
    data() {
        return {
            Reward: {
                productName: '',
                availableStock: 0,
                productDescription: '',
                points: 0,
                productImageUrl: '',
                isActive: true
            },
            loading: false,

            RewardID: this.$route.query.RewardID,

            selectedFile: null,
            imagePreview: null, // For image preview
            uploadedImage: null,

        };
    },
    methods: {
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

                this.Reward.productImageUrl = response.data.secure_url;
                alert("Image uploaded successfully.");

                console.log("Image uploaded successfully: ", this.Reward.productImageUrl);
            } catch (error) {
                console.error("Error uploading the image:", error);
            } finally {
                this.loading = false; // Hide loading indicator

            }
        },
        // Fetch event data based on RewardID
        async fetchRewardData() {
            this.loading = true;
            try {
                const response = await axios.get(`/api/v1/admin/reward/getById/${this.RewardID}`);
                console.log(response);
                this.Reward = response.data.data; // Assuming the Reward object is in data.data
            } catch (error) {
                console.error("Error fetching Reward data:", error);
                alert("Failed to fetch Reward data.");
            } finally {
                this.loading = false;
            }
        },
        // Update Reward
        async updateReward() {
            console.log("Reward");
            console.log(this.Reward);
            console.log(this.Reward.productImageUrl);

            try {
                const response = await axios.put(`/api/v1/admin/reward/updateById/${this.RewardID}`, this.Reward);
                if (response.data.code === 0) {
                    alert("Reward updated successfully!");
                    // Redirect or handle success logic here
                    this.$router.push('/admin/rewards');
                } else {
                    alert("Error updating Reward: " + response.data.msg);
                }
            } catch (error) {
                console.error("Error updating Reward:", error);
                alert("Failed to update Reward.");
            }
        }
    },

};
</script>

<style scoped>
.disabled-button {
    background-color: gray;
    cursor: not-allowed;
    opacity: 0.7;
}
</style>