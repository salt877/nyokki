<template >
    <div class="back-ground">
    <div class="box">
        <h3>毎日書いてにょきにょき育てる</h3>
        <h1>にょっき</h1>
        <v-btn color="green"><v-icon>mdi-flower</v-icon>サインイン</v-btn>
    </div>
    </div>
</template>

<script>
export default {
    name: 'SignIn'
};
</script>

<style>
.back-ground {
    background-image: url("~@/assets/SignInBackGround.jpg");
    background-size: cover;
    background-position: center center;
    width: 100%;
    height: 100vh;
    position: relative;
}
.box {
    text-align: center;
    position: relative;
    top: 20vh;
}
.box h1 {
    margin: 5vh 0;
}
</style>
