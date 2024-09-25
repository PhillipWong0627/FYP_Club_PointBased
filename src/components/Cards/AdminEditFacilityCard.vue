<template>
    <div
        class="container mx-auto px-4 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <Toast ref="toast" />
        <div class="h-[450px] flex items-center justify-center" v-if="loading">
            <span class="font-bold text-2xl text-black"> Loading...</span>
            <img class="pl-5" src="@/assets/pandaLoading.gif" alt="panda loading" style="width: 108px; height: 108px" />
        </div>
        <h2 class="text-2xl font-bold mb-4 p-4">Update Facility</h2>
        <form @submit.prevent="updateFacility">
            <!-- Facility Title -->
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Facility Name</label>
                <input v-model="facility.facilityName" type="text" placeholder="Enter Facility Name"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required>
            </div>
            <!-- Facility Fee -->
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Total Courts</label>
                <input v-model="facility.totalCourt" type="number" placeholder="Enter Total Courts" min="0"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required>
            </div>
            <!-- Facility Location -->
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Facility Location</label>
                <input v-model="facility.location" type="text" placeholder="Enter Location"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required>
            </div>
            <!-- Facility Fee -->
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Facility Fee</label>
                <input v-model="facility.pricePerHour" type="number" placeholder="Enter Facility Fee" min="0"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required>
            </div>
            <!-- Facility Image URL -->
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">facility Image URL</label>
                <input type="file" @change="onFileChange"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <div v-if="imagePreview">
                    <h3>Image Preview:</h3>
                    <img :src="imagePreview" alt="Image Preview" style="max-width: 300px; max-height: 300px;" />
                </div>

                <!-- <input v-model="facility.facilityImage" type="text" placeholder="Enter Facility Image URL"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"> -->
            </div>
            <!-- Submit Button -->
            <div class="mb-6">
                <ButtonPress type="submit" class=" ">
                    Update Facility
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
        this.fetchFacilityData(); // Fetch event data when component is mounted
    },
    components: {
        Toast,
        ButtonPress
    },
    data() {
        return {
            facility: {
                facilityName: '',
                facilityImage: '',
                totalCourt: 0,
                location: '',
                openingHour: "08:00:00",
                closingHour: "22:00:00",
                facilityType: '',
                pricePerHour: 0.00,
                status: true
            },
            loading: false,

            facilityId: this.$route.query.FacilityID,

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

            const formData = new FormData();
            formData.append("file", this.selectedFile);
            formData.append("upload_preset", "j8c3wtcm"); // Replace with your Cloudinary upload preset

            try {
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/dnzypglvm/image/upload`, // Replace YOUR_CLOUD_NAME with your Cloudinary cloud name
                    formData
                );

                this.facility.facilityImage = response.data.secure_url;
                alert("Image uploaded successfully.");

                console.log("Image uploaded successfully: ", this.facility.facilityImage);
            } catch (error) {
                console.error("Error uploading the image:", error);
            }
        },
        // Fetch event data based on facilityId
        async fetchFacilityData() {
            this.loading = true;
            try {
                const response = await axios.get(`/api/v1/admin/getById/${this.facilityId}`);
                console.log(response);
                this.facility = response.data.data; // Assuming the facility object is in data.data
            } catch (error) {
                console.error("Error fetching facility data:", error);
                alert("Failed to fetch facility data.");
            } finally {
                this.loading = false;
            }
        },
        // Update facility
        async updateFacility() {
            console.log("Faiclity");
            console.log(this.facility);
            console.log(this.facility.facilityImage);

            try {
                const response = await axios.put(`/api/v1/admin/updateById/${this.facilityId}`, this.facility);
                if (response.data.code === 0) {
                    alert("Facility updated successfully!");
                    // Redirect or handle success logic here
                    this.$router.push('/admin/facilities');
                } else {
                    alert("Error updating facility: " + response.data.msg);
                }
            } catch (error) {
                console.error("Error updating facility:", error);
                alert("Failed to update facility.");
            }
        }
    },

};
</script>

<style scoped>
/* Add styles here if needed */
</style>