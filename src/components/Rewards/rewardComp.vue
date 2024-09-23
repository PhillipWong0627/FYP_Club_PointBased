<template>
  <div class="flex flex-col pt-10 ">
    <div class=" container mx-auto flex justify-between">
      <span class="text-3xl font-semibold uppercase py-4 ">Rewards</span>
      <!-- <button class="uppercase font-bold text-lg pr-4">View All</button> -->
    </div>
    <div class="flex flex-wrap justify-evenly mx-auto container  ">
      <!-- Components for all the facilities -->
      <div v-for="i in rewards" :key="i.rewards" @click="toRewardLink(i)"
        class="flex flex-col items-center justify-around cardContainer shadow-2xl bg-blueGray-100 px-2 my-2 rounded-sm cursor-pointer ">
        <img style="width: 200px; height: 180px;" class="w-full rounded-3xl" :src="i.productImageUrl" />
        <div class="flex flex-col items-center mt-4">
          <div class="uppercase border-2 border-red-500 rounded-full px-2 text-lg">
            <span>{{ i.points }} pts</span>

          </div>
          <div class="uppercase text-sm">
            {{ i.productName }}

          </div>
        </div>
      </div>

    </div>
    <RewardModal :isVisible="isModalVisible" :rewardId="selectedReward?.id" :rewardPts="selectedReward?.points"
      :rewardTitle="selectedReward?.productName" :rewardDescription="selectedReward?.productDescription"
      :rewardImage="selectedReward?.productImageUrl" @close="isModalVisible = false" />
  </div>
</template>

<script>
import RewardModal from "@/components/Modals/RewardModal.vue";

//API
import { getReward } from '@/service/apiProvider.js';

export default {
  mounted() {
    this.getRewardInfo();
  },
  components: {
    RewardModal,
  },

  data() {
    return {

      rewards: [


      ],
      isModalVisible: false, // Control modal visibility
      selectedReward: null, // Store selected event data

      toRewardLink(reward) {
        console.log(reward);
        this.selectedReward = reward;
        this.isModalVisible = true; // Show modal

      },

    };
  },
  methods: {
    async getRewardInfo() {
      try {
        const result = await getReward();
        console.log("CALLING RESULT API");
        console.log(result);

        this.rewards = result;

      } catch (error) {
        console.error(error);
      }
    },
  },
}
</script>

<style scoped>
.cardContainer {
  width: 200px;
  height: 293px;
  margin-left: 10px;
  margin-right: 10px;
  /* background: white; */
}

@media (max-width: 768px) {
  .productImg {
    background: linear-gradient(0deg, rgba(238, 238, 238, 1) 0%, rgba(255, 255, 255, 1) 70%);
    border-radius: 0.375rem;
  }
}
</style>
