<template>
	<div>
		<section class="hero text-center bg-secondary text-white">
	        <div class="container">
	            <h1 class="font-28 fw-600 text-uppercase">
	                Sube un diseño
	            </h1>
	        </div>
	    </section>

	    <div class="upload-shot">
	        <div class="container">
	            <div
	                class="row justify-content-center align-items-center text-center"
	            >
	                <div class="col-md-6 alert alert-success">
						<div class="card bg-white shadow-sm">
							<div class="d-flex flex-column justify-content-center p-1">
								<div class="alert alert-danger" v-if="error">
									<p>Se produjo un error durante el proceso de carga.</p>
									<p>{{ error }}</p>
								</div>
								<slim-cropper :options="slimOptions">
									<input type="file" name="image">
								</slim-cropper>
								<div class="text-success caption-sm mt-2"  v-if="uploading">
									<i class="fas fa-spinner fa-spin"></i>
								</div>
							</div>
						</div>
						<div class="upload-para mt-2">
	                        <p class="font-14 fw-400 ">
	                            Las dimensiones de su imagen deben tener al menos 800px x 600px de tamaño. Además, el tamaño de la imagen debe ser de un máximo de 2MB. Cambie el tamaño de su archivo en consecuencia antes de subirlo.
	                        </p>
	                    </div>

	                    <!--<div class="upload white-bg-color">
	                        <form>
	                            <div class="box-input">
	                                <div class="uload-icon font-28">
	                                    <i
	                                        class="fas fa-cloud-upload-alt"
	                                    ></i>
	                                </div>
	                                <label
	                                    class="fileContainer font-18 fw-500"
	                                >
	                                    <input type="file" />
	                                    <span
	                                        >Arrastra una imagen aquí o <a> Examinar </a> para subir una imagen.</span
	                                    >
	                                </label>
	                            </div>
	                        </form>
	                    </div>
	                    <div class="upload-para mt-2">
	                        <p class="font-14 fw-400">
	                            JPG, GIF or PNG. Dribbble shots are
	                            <strong>400 × 300</strong> pixels or
	                            <strong>800 × 600</strong> (for HiDPI
	                            displays).
	                        </p>
	                        <p class="font-12 fw-300">
	                            Si tu imagen es más grande que los tamaños arriba, lo ayudaremos a recortarlo.
	                        </p>
	                    </div> -->
	                </div>
	            </div>
	        </div>
	    </div>
	</div>
</template>

<script>
	import Slim from '@/components/slim/slim.vue'
	export default {
		middleware: ['auth'],
		components: {
			'slim-cropper': Slim
		},
		data(){
			return {
				slimOptions: {
					service: this.slimService,
					post: 'output',
					defaultInputName: 'image',
					minSize: '800,600',
					label: 'Seleccione una imagen.',
					maxFileSize: 2 // value is 2MB
				},
				uploading: false,
				error: ''
			}
		},
		methods: {
			slimService(formdata, progress, success, failure, slim){
				//console.log(formdata);
				this.uploading = true
				this.$axios.post('/designs', formdata)
					.then(res => {
						//console.log(res);
						this.$router.push({
							name: 'designs.edit',
							params: { id: res.data.id }
						});
					}).catch(err => {
						//console.log(err.response);
						const message = err.response.data.errors
						this.error = message[Object.keys(message)[0]][0]
						failure(500);
					})
					.finally(() => (this.uploading = false));
			}
		}
	};
</script>



