<template>
  <div id="app">
    <router-view />
    
    <div class="floating-contact-us">
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
