<template>
	<div>
		<h1>activity入口页</h1>
		<a href="recharge.html">跳转recharge</a>
		<h2><router-link to="/">activity=>Home.vue</router-link></h2>
		<h2><router-link to="/about">activity=>About.vue</router-link></h2>
		<router-view />
	</div>
</template>
