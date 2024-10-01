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
            Facility Tables
          </h3>
          <h3>
            <ButtonPress @click="createFacility()">Create Facility</ButtonPress>
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
              Facility ID
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Facility Name
            </th>
            <!-- <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Facility Type
            </th> -->
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Location
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Price (PerHour)
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Facility Image
            </th>

            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Total Court
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
          <tr v-for="i in facilityData" :key="i.facilityData">
            <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
              <span class="font-bold">
                {{ i.facilityID }}
              </span>
            </th>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ i.facilityName }}
            </td>
            <!-- <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ i.facilityType }}
            </td> -->
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ i.location }}

            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ i.pricePerHour }}

            </td>

            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <img style="width: 150px;" :src=i.facilityImage alt="Event Image" />
            </td>

            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <div class="flex items-center">
                <span class="mr-2"> {{ i.totalCourt }}

                </span>

              </div>
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <div class="flex items-center">
                <span class="mr-2"> {{ i.status }}

                </span>

              </div>
            </td>

            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
              <ButtonPress @click="EditFacility(i.facilityID)">Edit</ButtonPress>
              <ButtonPress type="submit" class="bg-red-500 hover:bg-orange-600" @click="DeleteFacility(i.facilityID)">
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

export default {
  mounted() {
    this.getFacilityInfo();

  },
  data() {
    return {
      facilityData: [],
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
    async getFacilityInfo() {
      try {
        const result = await axios.get('/api/v1/admin/getFacilities');
        console.log("Calling Facility API");
        // console.log(result.data.data);

        this.facilityData = result.data.data;

      } catch (error) {
        console.error(error);
      }
    },
    createFacility() {
      console.log("Create Facility")
      const routeData = this.$router.resolve({
        name: "createFacility",

      });

      window.location.href = routeData.href;
    },
    EditFacility(id) {
      console.log("Editing " + id)
      const routeData = this.$router.resolve({
        name: "EditFacility",
        query: {
          FacilityID: id,
        },
      });

      window.location.href = routeData.href;
    },
    // Method to delete user by ID
    async DeleteFacility(id) {
      const confirmed = window.confirm("Are you sure you want to delete this user?");

      if (confirmed) {

        try {
          const response = await axios.delete(`/api/v1/admin/deleteById/${id}`);
          if (response.data.code === 0) {
            alert('Event deleted successfully!');
            this.getFacilityInfo(); // Re-fetch the users after successful deletion
          } else {
            alert('Error deleting facility: ' + response.data.msg);
          }
        } catch (error) {
          console.error('Error deleting facility:', error);
          alert('Failed to delete facility.');
        }
      } else {
        console.log("Deletion canceled.");

      }
    },


  }



};
</script>
