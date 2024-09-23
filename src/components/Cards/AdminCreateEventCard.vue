<template>
    <div
        class="container mx-auto px-4 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <Toast ref="toast" />
        <div class="h-[450px] flex items-center justify-center" v-if="loading">
            <span class="font-bold text-2xl text-black"> Loading...</span>
            <img class="pl-5" src="@/assets/pandaLoading.gif" alt="panda loading" style="width: 108px; height: 108px" />
        </div>

        <h2 class="text-2xl font-bold mb-4">Create Event</h2>

        <form @submit.prevent="createEvent">
            <!-- Event Title -->
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Event Title</label>
                <input v-model="event.eventTitle" type="text" placeholder="Enter Event Title"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required>
            </div>

            <!-- Event Description -->
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Event Description</label>
                <textarea v-model="event.eventDescription" placeholder="Enter Event Description"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required></textarea>
            </div>

            <!-- Event DateTime -->
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Event Date and Time</label>
                <input v-model="event.eventDateTime" type="text" placeholder="Enter Event DateTime"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required>
            </div>

            <!-- Event Location -->
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Event Location</label>
                <input v-model="event.eventLocation" type="text" placeholder="Enter Event Location"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required>
            </div>

            <!-- Event Fee -->
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Event Fee</label>
                <input v-model="event.eventFee" type="number" placeholder="Enter Event Fee"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required>
            </div>

            <!-- Event Image URL -->
            <!-- <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Event Image URL</label>
                <input v-model="event.eventImage" type="text" placeholder="Enter Event Image URL"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div> -->


            <!-- Submit Button -->
            <div class="mb-6">
                <ButtonPress type="submit">Create Event</ButtonPress>
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
            event: {
                eventTitle: '',
                eventDescription: '',
                eventDateTime: '',
                eventLocation: '',
                eventFee: 0,
                eventImage: '',
                isActive: false
            },
            loading: false
        };
    },
    methods: {
        // Method to create a new event
        async createEvent() {
            try {
                this.loading = true;
                const response = await axios.post('/api/v1/admin/events/create', this.event);
                if (response.data.code === 0) {
                    alert("Event created successfully!");
                    this.$router.push('/admin/events');  // Redirect to the events list page
                } else {
                    alert("Error creating event: " + response.data.msg);
                }
            } catch (error) {
                console.error("Error creating event:", error);
                alert("Failed to create event.");
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