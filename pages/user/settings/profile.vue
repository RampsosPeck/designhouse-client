<template>
	<div class="setting-block">
		<div class="setting-title font-16 fw-500 text-center color-bordo-out">
			PERFIL
		</div>
		<div class="setting-body white-bg-color color-border">
			<div class="row">
				<div class="col-md-6">
					<form class="custom-form" @submit.prevent="update">
						<alert-success :form="form">
							Información del perfil actualizado con éxito
						</alert-success>
						<div class="form-group">
							<base-input
								:form="form"
								field="name"
								v-model="form.name"
								placeholder="Nombre completo" >
							</base-input>
						</div>
						<div class="form-group">
							<base-input
								:form="form"
								field="tagline"
								v-model="form.tagline"
								placeholder="Lema" >
							</base-input>
						</div>
						<div class="form-group">
							<base-gmap
								:initialValue="form.formatted_address"
								@address-response="handleAddress" >
							</base-gmap>
						</div>
						<div class="form-group">
							<base-textarea
								:form="form"
								field="about"
								:rows="4"
								v-model="form.about"
								placeholder="Por favor ingrese alguna información sobre usted." >
							</base-textarea>
						</div>
						<div class="form-group custom-control custom-checkbox">
							<input type="checkbox"
								class="custom-control-input"
								id="available_to_hire"
								v-model="form.available_to_hire" />
							<label
								class="custom-control-label"
								:value="true"
								for="available_to_hire">
									¿Disponible para contratar?
							</label>
						</div>
						<div class="text-right">
							<base-button :loading="form.busy">Actualizar perfil</base-button>
						</div>
					</form>
				</div>
				<div class="col-md-6">
					<img src="~assets/images/profile.png" class="img-fluid img-thumbnail" style="height:100%; height:auto;" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				form: this.$vform({
					name: '',
					about: '',
					tagline:'',
					formatted_address: '',
					location: {},
					available_to_hire: false
				})
			}
		},
		methods: {
			update() {
				this.form.put(`/settings/profile`)
					.then(res => console.log(res))
					.catch(e => console.log(e));
			},
			handleAddress(data) {
		      this.form.formatted_address = data.formatted_address;
		      this.form.location = {
		        latitude: data.latitude,
		        longitude: data.longitude
		      };
		    }
		},
		mounted() {
		    Object.keys(this.form).forEach(k => {
		      if (this.$auth.user.hasOwnProperty(k)) {
		        this.form[k] = this.$auth.user[k];
		      }
		    });
		    if (this.$auth.user.location) {
		      this.form.location = {
		        longitude: this.$auth.user.location.coordinates[0],
		        latitude: this.$auth.user.location.coordinates[1]
		      };
		    } else {
		      this.form.location = {};
		    }
		}
	};
</script>




