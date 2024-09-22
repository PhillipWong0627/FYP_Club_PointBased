<template>
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
    :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']">
    <Toast ref="toast" />
    <div class="h-[450px] flex items-center justify-center" v-if="loading">
      <span class="font-bold text-2xl text-black"> Loading...</span>
      <img class="pl-5" src="@/assets/pandaLoading.gif" alt="panda loading" style="width: 108px; height: 108px" />
    </div>

    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full flex justify-between px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-lg" :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']">
            Event Tables
          </h3>
          <h3>
            <ButtonPress @click="createEvent()">Create Event</ButtonPress>
          </h3>
        </div>
      </div>
    </div>
    <div class="block w-full overflow-x-auto">
      <!-- Projects table -->
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Event ID
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Event Title
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Event Description
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Event Date
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Event Location
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Event Image
            </th>

            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Event Fee
            </th>

            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Status
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Actions
            </th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="i in eventData" :key="i.eventData">
            <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
              <span class="font-bold">
                {{ i.id }}
              </span>
            </th>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ i.eventTitle }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ i.eventDescription }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ i.eventDateTime }}

            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <span> {{ i.eventLocation }}
              </span>
            </td>

            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <img style="width: 150px;" :src=i.eventImage alt="Event Image" />
            </td>

            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <div class="flex items-center">
                <span class="mr-2"> {{ i.eventFee }}

                </span>

              </div>
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <div class="flex items-center">
                <span class="mr-2"> {{ i.is_active }}

                </span>

              </div>
            </td>

            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
              <ButtonPress @click="EditEvent(i.id)">Edit</ButtonPress>
              <ButtonPress type="submit" @click="DeleteUser(i.id)">
                Delete</ButtonPress>

            </td>

          </tr>

        </tbody>
      </table>
    </div>

  </div>
</template>
<script>
import Toast from '@/components/Toast.vue'; // Make sure the path is correct

import axios from 'axios';


import ButtonPress from "@/components/ButtonPress.vue";
//API
import { getEvents } from '@/service/apiProvider.js';

export default {
  mounted() {
    this.getEventsInfo();

  },
  data() {
    return {
      memberData: [

      ],
      eventData: [],
      loading: false,
    };
  },
  components: {
    ButtonPress,
    Toast,

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

    async getEventsInfo() {
      try {
        const result = await getEvents();
        console.log("Calling Event API");
        console.log(result);

        this.eventData = result;

      } catch (error) {
        console.error(error);
      }
    },
    createEvent() {
      console.log("Create Event ")
      const routeData = this.$router.resolve({
        name: "CreateEvent",

      });

      window.location.href = routeData.href;
    },
    EditEvent(id) {
      console.log("Editing " + id)
      const routeData = this.$router.resolve({
        name: "EditEvent",
        query: {
          EventID: id,
        },
      });

      window.location.href = routeData.href;
    },
    // Method to delete user by ID
    async DeleteUser(id) {
      try {
        const response = await axios.delete(`/api/v1/admin/events/delete/${id}`);
        if (response.data.code === 0) {
          alert('Event deleted successfully!');
          this.getEventsInfo(); // Re-fetch the users after successful deletion
        } else {
          alert('Error deleting user: ' + response.data.msg);
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user.');
      }
    },


  }



};
</script>
