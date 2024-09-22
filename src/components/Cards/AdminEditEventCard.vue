<template>
    <div
        class="container mx-auto px-4 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <Toast ref="toast" />
        <div class="h-[450px] flex items-center justify-center" v-if="loading">
            <span class="font-bold text-2xl text-black"> Loading...</span>
            <img class="pl-5" src="@/assets/pandaLoading.gif" alt="panda loading" style="width: 108px; height: 108px" />
        </div>

        <h2 class="text-2xl font-bold mb-4 p-4">Update Event</h2>

        <form @submit.prevent="updateEvent">
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
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Event Image URL</label>
                <input v-model="event.eventImage" type="text" placeholder="Enter Event Image URL"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>



            <!-- Submit Button -->
            <div class="mb-6">
                <ButtonPress type="submit" class=" ">
                    Update Event
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
        this.fetchEventData(); // Fetch event data when component is mounted
    },
    components: {
        Toast,
        ButtonPress
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
            loading: false,

            eventId: this.$route.query.EventID,
        };
    },
    methods: {
        // Fetch event data based on eventId
        async fetchEventData() {
            this.loading = true;
            try {
                const response = await axios.get(`/api/v1/admin/events/${this.eventId}`);
                console.log(response);
                this.event = response.data.data; // Assuming the event object is in data.data
            } catch (error) {
                console.error("Error fetching event data:", error);
                alert("Failed to fetch event data.");
            } finally {
                this.loading = false;
            }
        },
        // Update event
        async updateEvent() {
            try {
                const response = await axios.put(`/api/v1/admin/events/update/${this.eventId}`, this.event);
                if (response.data.code === 0) {
                    alert("Event updated successfully!");
                    // Redirect or handle success logic here
                } else {
                    alert("Error updating event: " + response.data.msg);
                }
            } catch (error) {
                console.error("Error updating event:", error);
                alert("Failed to update event.");
            }
        }
    },

};
</script>

<style scoped>
/* Add styles here if needed */
</style>