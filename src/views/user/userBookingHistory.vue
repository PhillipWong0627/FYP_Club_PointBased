<template>
    <div>
        <Navnavbars></Navnavbars>
        <UserNavbar></UserNavbar>
        <main class="profile-page">
            <section class="relative py-16 bg-blueGray-200">
                <div class="container mx-auto">
                    <div class="rounded-t mb-0 px-4 py-3 border-0">
                        <div class="flex flex-wrap items-center">
                            <div class="relative w-full flex justify-between max-w-full flex-grow flex-1">
                                <h2 class="text-2xl font-semibold text-center mb-4">Booking Table</h2>


                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    USER BOOKING TABLE
                </div>
                <div class="container mx-auto">
                    <div class="rounded-t mb-0 px-4 py-3 border-0">
                        <div class="flex flex-wrap items-center">
                            <div class="relative w-full flex justify-between max-w-full flex-grow flex-1">
                                <h2 class="text-2xl font-semibold text-center mb-4">Joined Events</h2>


                            </div>
                        </div>
                    </div>
                    <div class="block w-full overflow-x-auto">
                        <!-- Projects table -->
                        <table class="items-center w-full bg-transparent border-collapse">
                            <thead>
                                <tr>
                                    <th
                                        class="px-6 align-middle border border-solid py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Event Title
                                    </th>
                                    <th
                                        class="px-6 align-middle border border-solid py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Event Description
                                    </th>
                                    <th
                                        class="px-6 align-middle border border-solid py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Event Date
                                    </th>
                                    <th
                                        class="px-6 align-middle border border-solid py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Event Location
                                    </th>
                                    <th
                                        class="px-6 align-middle border border-solid py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Event Image
                                    </th>

                                    <th
                                        class="px-6 align-middle border border-solid py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Event Fee
                                    </th>


                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="i in joinedEvents" :key="i.eventData">

                                    <td
                                        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                                        {{ i.eventTitle }}
                                    </td>
                                    <td
                                        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                                        {{ i.eventDescription }}
                                    </td>
                                    <td
                                        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                                        {{ i.eventDateTime }}

                                    </td>
                                    <td
                                        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                                        <span> {{ i.eventLocation }}
                                        </span>
                                    </td>

                                    <td
                                        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                                        <img style="width: 150px;" :src=i.eventImage alt="Event Image" />
                                    </td>

                                    <td
                                        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                                        <div class="flex items-center">
                                            <span class="mr-2"> {{ i.eventFee }}

                                            </span>

                                        </div>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>

                </div>

            </section>

        </main>

        <footer-component />

    </div>
</template>
<script>
import Navnavbars from "@/components/Navnavbars/navNavBar.vue";
import UserNavbar from '@/components/Navbars/UserNavbar.vue'

import FooterComponent from "@/components/Footers/Footer.vue";
import axios from 'axios';


export default {
    mounted() {
        this.fetchJoinedEvents(); // Fetch the joined events when the component is mounted
    },

    data() {
        return {
            joinedEvents: [], // Stores the joined events

        }
    },
    components: {

        Navnavbars,
        UserNavbar,
        FooterComponent

    },
    props: {
        color: {
            default: "light",
            validator: function (value) {
                // The value must match one of these strings
                return ["light", "dark"].indexOf(value) !== -1;
            },
        },
    },
    methods: {
        async fetchJoinedEvents() {
            const memberId = localStorage.getItem('memberID'); // Get the logged-in member's ID from localStorage
            if (memberId) {
                try {
                    const response = await axios.get(`http://localhost:8080/api/v1/user/${memberId}/joined-events`);
                    this.joinedEvents = response.data.data; // Assign the returned events to the joinedEvents array
                } catch (error) {
                    console.error('Error fetching joined events:', error);
                }
            } else {
                alert('Please log in to view your joined events.');
            }
        },
    },

};
</script>
<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    text-align: left;
    padding: 8px;
    border-bottom: 1px solid #ddd;
}

th {
    background-color: #f2f2f2;
}

tr:hover {
    background-color: #f5f5f5;
}
</style>
