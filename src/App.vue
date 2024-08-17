<template>
  <div id="app">
    <router-view class="bg-blueGray-200" />

    <div @click="toWhatsap()" class="floating-contact-us">
      <img class="w-10 h-10" src="@/assets/svg/whatsapp.svg">
    </div>

  </div>
</template>

<style>
.floating-contact-us {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #22c55e;
  color: white;
  padding: 10px 15px;
  border-radius: 50px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  text-align: center;
  font-size: 16px;
  z-index: 1000;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
</style>

<script>
export default {
  methods: {
    toWhatsap() {
      console.log("LINK TO WHATSAPP");
      // Define the WhatsApp link with phone number and optional message
      const phoneNumber = "60122504088"; // Replace with your actual number
      const message = "Hello, I'd like to know more about your services.";
      const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

      // Open WhatsApp link in a new tab
      window.open(whatsappLink, "_blank");

    }
  }
}



</script>