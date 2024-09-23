<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <Toast ref="toast" />

    <div class="modal " @click.stop>
      <div class="h-[450px] flex items-center justify-center" v-if="loading">
        <span class="font-bold text-2xl text-white"> Loading...</span>
        <img class="pl-5" src="@/assets/pandaLoading.gif" alt="panda loading" style="width: 108px; height: 108px" />
      </div>

      <span class="text-white"> RewardID: {{ rewardId }}</span>
      <div class="flex justify-between modalHeader text-white text-2xl uppercase px-4 py-2">
        <h2> {{ rewardTitle }} </h2>
        <span class="close cursor-pointer" @click="closeModal">&times;</span>
      </div>
      <div class="">
        <div class="border-2">
          <img style="width: 100%; height: 350px;" :src="rewardImage" />
        </div>
        <div class="text-white flex flex-col justify-between  ">
          <h2 style="color: #2A83FF;" class="text-2xl">{{ rewardTitle }}</h2>
          <h2 class="text-2xl text-red-500">{{ rewardPts }} Points </h2>
          <p>{{ rewardDescription }}</p>
          <ButtonPress class="w-full uppercase text-base font-bold mt-10" @click="redeemProduct()">Redeem</ButtonPress>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import ButtonPress from "@/components/ButtonPress.vue";
import axios from 'axios';
import { ref } from 'vue';

export default {
  components: {
    ButtonPress,
  },
  data() {
    return {
      memberId: localStorage.getItem('memberID'),
      loading: false,
      loggedIn: ref(false),


    }
  },
  created() {
    // Check if the user is logged in based on localStorage data
    const memberID = localStorage.getItem('memberID');
    const memberName = localStorage.getItem('memberName');
    const email = localStorage.getItem('email');

    // Set loggedIn to true if any of the items exist in localStorage
    if (memberID && memberName && email) {
      this.loggedIn = true;
    }
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    rewardTitle: {
      type: String,
      default: "",
    },
    rewardDescription: {
      type: String,
      default: "",
    },
    rewardImage: {
      type: String,
      default: "",
      required: true,
    },
    rewardId: {
      type: Number,
      required: true,
    },
    rewardPts: {
      type: Number,
      required: true,
    }


  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    async redeemProduct() {
      if (this.loggedIn) {
        this.loading = true;

        // console.log("Redeem Product..");
        console.log(this.eventId + "&" + this.memberId)
        try {
          const response = await axios.post(`/api/v1/admin/events/${this.eventId}/join/${this.memberId}`);
          // console.log("THIS IS RESPONSE");
          // console.log(response);
          // console.log("THIS IS DATA");
          // console.log(response.data);
          if (response.data['code'] === 0) {
            alert("Successfully Redeem the product!");
            this.closeModal();
          } else {
            alert("Error Redeem the product: " + response.data['msg']);
            this.closeModal();

          }
        } catch (error) {
          console.error("Error joining the event", error);
          alert("Failed to Redeem the product.");
          this.closeModal();

        } finally {
          this.loading = false;
          this.closeModal();


        }
      } else {
        alert("Please Log in to Redeem the product!!")
        this.closeModal();

      }



    },
  },
};
</script>

<style scoped>
.modalHeader {
  background-color: #191919;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  /* background: white; */
  background-color: #191919;
  height: 100vh;
  padding: 20px;
  border-radius: 8px;
  width: 600px;
  max-width: 100%;
}


@media (min-width:640px) {
  .contentContainer {
    height: 400px;
  }
}
</style>