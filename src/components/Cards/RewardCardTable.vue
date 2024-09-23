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
            Rewards Tables
          </h3>
          <h3>
            <ButtonPress @click="createReward()">Create Rewards</ButtonPress>
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
              Reward ID
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Product Name
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Points
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Product Image
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Description
            </th>


            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Available Stock
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
          <tr v-for="i in rewardsData" :key="i.rewardsData">
            <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
              <span class="font-bold">
                {{ i.id }}
              </span>
            </th>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ i.productName }}
            </td>

            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ i.points }}

            </td>

            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <img style="width: 150px;" :src=i.productImageUrl alt="Event Image" />
            </td>

            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ i.productDescription }}
            </td>


            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <div class="flex items-center">
                <span class="mr-2"> {{ i.availableStock }}

                </span>

              </div>
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <div class="flex items-center">
                <span class="mr-2"> {{ i.isActive }}

                </span>

              </div>
            </td>

            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
              <ButtonPress @click="EditReward(i.id)">Edit</ButtonPress>
              <ButtonPress type="submit" @click="DeleteReward(i.id)">
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

//API
import { getReward } from '@/service/apiProvider.js';

import ButtonPress from "@/components/ButtonPress.vue";

export default {
  mounted() {
    this.getRewardInfo();

  },
  data() {
    return {
      rewardsData: [],
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
    async getRewardInfo() {
      try {
        const result = await getReward();
        console.log("CALLING RESULT API");
        console.log(result);

        this.rewardsData = result;

      } catch (error) {
        console.error(error);
      }
    },
    createReward() {
      console.log("Create Reward")
      const routeData = this.$router.resolve({
        name: "createReward",

      });

      window.location.href = routeData.href;
    },
    EditReward(id) {
      console.log("Editing " + id)
      const routeData = this.$router.resolve({
        name: "EditReward",
        query: {
          RewardID: id,
        },
      });

      window.location.href = routeData.href;
    },
    // Method to delete user by ID
    async DeleteReward(id) {
      try {
        const response = await axios.delete(`/api/v1/admin/reward/deleteById/${id}`);
        if (response.data.code === 0) {
          alert('Reward deleted successfully!');
          this.getRewardInfo(); // Re-fetch the users after successful deletion
        } else {
          alert('Error deleting Reward: ' + response.data.msg);
        }
      } catch (error) {
        console.error('Error deleting Reward:', error);
        alert('Failed to delete Reward.');
      }
    },


  }



};
</script>
