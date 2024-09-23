<template>
    <div
        class="container mx-auto px-4 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <Toast ref="toast" />
        <div class="h-[450px] flex items-center justify-center" v-if="loading">
            <span class="font-bold text-2xl text-black"> Loading...</span>
            <img class="pl-5" src="@/assets/pandaLoading.gif" alt="panda loading" style="width: 108px; height: 108px" />
        </div>

        <h2 class="text-2xl font-bold mb-4">Create Facility</h2>

        <form @submit.prevent="createFacility">
            <!-- Facility Title -->
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Facility Name</label>
                <input v-model="facility.facilityName" type="text" placeholder="Enter Facility Name"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required>
            </div>

            <!-- Total Courts -->
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Total Courts</label>
                <input v-model="facility.totalCourt" type="number" placeholder="Enter Total Courts"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required>
            </div>


            <!-- Facility Location -->
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">facility Location</label>
                <input v-model="facility.location" type="text" placeholder="Enter Facility Location"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required>
            </div>
            <!-- Facility Type -->
            <!-- <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Facility Type</label>
                <input v-model="facility.facilityType" type="text" placeholder="Enter Facility Type"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required>
            </div> -->

            <!-- Facility Fee -->
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Facility Fee</label>
                <input v-model="facility.pricePerHour" type="number" placeholder="Enter Facility Fee"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required>
            </div>

            <!-- Facility Image URL -->
            <!-- <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Facility Image URL</label>
                <input v-model="facility.facilityImage" type="text" placeholder="Enter Facility Image URL"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div> -->


            <!-- Submit Button -->
            <div class="mb-6">
                <ButtonPress type="submit">Create Facility</ButtonPress>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import Toast from '@/components/Toast.vue'; // Make sure the path is correct

import ButtonPress from "@/components/ButtonPress.vue";

export default {
    components: {
        ButtonPress,
        Toast,
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
            loading: false
        };
    },
    methods: {
        // Method to create a new facility
        async createFacility() {
            try {
                this.loading = true;
                const response = await axios.post('/api/v1/admin/addFacilities', this.facility);
                if (response.data.code === 0) {
                    alert("Facility created successfully!");
                    this.$router.push('/admin/facilities');  // Redirect to the facilitys list page
                } else {
                    alert("Error creating facility: " + response.data.msg);
                }
            } catch (error) {
                console.error("Error creating facility:", error);
                alert("Failed to create facility.");
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>