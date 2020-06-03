<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <input type="text" placeholder="barre de recherche">|
      <router-link to="/Catalog">Catalogue</router-link> |
      <router-link to="/News">News</router-link> |
      <router-link to="/Contact">Contact</router-link> |
      <router-link to="/Cart">Panier</router-link>
    </div>
    <router-view/>
  </div>
</template>