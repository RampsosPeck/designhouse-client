<template>
	<div>
		<section class="authentication" v-if="!$auth.loggedIn" >
			<div class=" container container-fluid">
			    <div class="row py-4 ">
			        <div class="col-12 col-lg-6">
			            <div class="titulo-success text-center" > DESARROLLO WEB </div>
			            <p class="lead text-secondary p-3 text-justify ">Un desarrollador web es responsable de la codificación, el diseño de un sitio web de acuerdo a las especificaciones de la empresa. A medida que el papel tiene en cuenta la experiencia del usuario y la función, un cierto nivel de diseño y programación de gráficos de ordenador es necesario.
			            </p>
			            <nuxt-link class="btn btn-lg btn-block color-bordo text-white" :to="{ name: 'login' }" >Ingresar</nuxt-link>
			            <nuxt-link class=" btn color-bordo-out btn-lg btn-block " :to="{ name: 'register' }">Registrate</nuxt-link>

			        </div>
			        <div class="col-12 col-lg-6">
			        	<no-ssr>
						<carousel-3d :controls-visible="true" :controls-prev-html="'&#10092;'" :controls-next-html="'&#10093;'"
			               :controls-width="60" :controls-height="60" :clickable="false" :autoplay="true" :autoplay-timeout="3000">
						    <slide class="carousel-slides" :index="0">
						    	<div class="container container-fluid slide-center-image">
					        		<img fluid class="slide-image" src="~assets/images/dev/img1.svg">
						      	</div>
						    </slide>
						    <slide class="carousel-slides" :index="1">
						    	<div class="container container-fluid slide-center-image">
					        		<img fluid class="slide-image" src="~assets/images/dev/img2.svg">
						      	</div>
						    </slide>
						    <slide class="carousel-slides" :index="2">
						    	<div class="container container-fluid slide-center-image">
					        		<img fluid class="slide-image" src="~assets/images/dev/img3.svg">
						      	</div>
						    </slide>
						    <slide class="carousel-slides" :index="3">
						    	<div class="container container-fluid slide-center-image">
					        		<img fluid class="slide-image" src="~assets/images/dev/img4.svg">
						      	</div>
						    </slide>
						    <slide class="carousel-slides" :index="4">
						    	<div class="container container-fluid slide-center-image">
					        		<img fluid class="slide-image" src="~assets/images/dev/img5.svg">
						      	</div>
						    </slide>
						    <slide class="carousel-slides" :index="5">
						    	<div class="container container-fluid slide-center-image">
					        		<img fluid class="slide-image" src="~assets/images/dev/img6.svg">
						      	</div>
						    </slide>
						    <slide class="carousel-slides" :index="6">
						    	<div class="container container-fluid slide-center-image">
					        		<img fluid class="slide-image" src="~assets/images/dev/img7.svg">
						      	</div>
						    </slide>
						    <slide class="carousel-slides" :index="7">
						    	<div class="container container-fluid slide-center-image">
					        		<img fluid class="slide-image" src="~assets/images/dev/img8.svg">
						      	</div>
						    </slide>
						    <slide class="carousel-slides" :index="8">
						    	<div class="container container-fluid slide-center-image">
					        		<img fluid class="slide-image" src="~assets/images/dev/img9.svg">
						      	</div>
						    </slide>
						    <slide class="carousel-slides" :index="9">
						    	<div class="container container-fluid slide-center-image">
					        		<img fluid class="slide-image" src="~assets/images/dev/img10.svg">
						      	</div>
						    </slide>
						    <slide class="carousel-slides" :index="10">
						    	<div class="container container-fluid slide-center-image">
					        		<img fluid class="slide-image" src="~assets/images/dev/img11.svg">
						      	</div>
						    </slide>
						    <slide class="carousel-slides" :index="11">
						    	<div class="container container-fluid slide-center-image">
					        		<img fluid class="slide-image" src="~assets/images/dev/img12.svg">
						      	</div>
						    </slide>
						</carousel-3d>
						</no-ssr>
			        </div>
			    </div>
			</div>
		</section>
		<div v-else>
		<section class="hero text-center bg-secondary text-white" >
	        <div class="container">
	            <h1 class="font-28 fw-600 text-uppercase">
	                PROYECTOS
	            </h1>
	        </div>
	    </section>
	    	<div class="pt-5">
			<no-ssr>
			<carousel-3d :controls-visible="true" :controls-prev-html="'&#10092;'" :controls-next-html="'&#10093;'"
               :controls-width="60" :controls-height="60" :clickable="false"  :autoplay="true" :autoplay-timeout="5000" >
			    <slide v-for="(design, i) in designs" :index="i" v-bind:key="design.id" >
			      <figure>
			        <!--<img :src="design.images.thumbnail">-->
			      	<img
                        class="w-100"
                        src="~assets/images/among_trees_night_dribbble.png"
                        alt="Image"
                    />
			      </figure>
			    </slide>
			</carousel-3d>
			</no-ssr>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		middleware: ['auth'],
		data(){
			return {
				designs: [],
				slides: 0
			}
		},
		methods: {
			async fetchUserDesigns(){
				const  resul   = await this.$axios.get(`/users/${this.$auth.user.id}/designs`);
				this.designs = resul.data.data;
				this.slides = this.designs.length;

				//console.log(this.designs);
			}
		},
		created() {
			this.fetchUserDesigns();
		}
	};
</script>


<style>
	/*CAROUSEL 3D*/

.carousel-slides {
	border-width: 0px !important;
	background-color: transparent !important;
}
.slide-image {
	max-width: 80% !important;
	max-height: auto !important;
}

.slide-center-image {
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>



