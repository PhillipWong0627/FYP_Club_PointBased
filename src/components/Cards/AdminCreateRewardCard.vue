<template>
    <div
        class="container mx-auto px-4 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <Toast ref="toast" />
        <div class="h-[450px] flex items-center justify-center" v-if="loading">
            <span class="font-bold text-2xl text-black"> Loading...</span>
            <img class="pl-5" src="@/assets/pandaLoading.gif" alt="panda loading" style="width: 108px; height: 108px" />
        </div>

        <h2 class="text-2xl font-bold mb-4">Create Reward</h2>

        <form @submit.prevent="createReward">
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
            <!-- <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Reward Image URL</label>
                <input v-model="Reward.productImageUrl" type="text" placeholder="Enter Reward Image URL"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div> -->


            <!-- Submit Button -->
            <div class="mb-6">
                <ButtonPress type="submit">Create Reward</ButtonPress>
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
            Reward: {
                productName: '',
                availableStock: 0,
                productDescription: '',
                points: 0,
                productImageUrl: '',
                isActive: true
            },
            loading: false
        };
    },
    methods: {
        // Method to create a new Reward
        async createReward() {
            try {
                this.loading = true;
                const response = await axios.post('/api/v1/admin/reward/create', this.Reward);
                if (response.data.code === 0) {
                    alert("Reward created successfully!");
                    this.$router.push('/admin/rewards');  // Redirect to the Rewards list page
                } else {
                    alert("Error creating Reward: " + response.data.msg);
                }
            } catch (error) {
                console.error("Error creating Reward:", error);
                alert("Failed to create Reward.");
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