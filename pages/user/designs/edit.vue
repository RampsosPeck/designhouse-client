<template>
	<div>
		<section class="hero text-center bg-secondary mb-4 text-white">
            <div class="container">
                <h1 class="font-28 fw-600 text-uppercase">
                    Actualizar información de diseño
                </h1>
            </div>
        </section>

        <div class="container">
        	<div class="row">
        		<div class="col-md-6">
        			<div class="card">
        				<div class="card-body p-1" v-if="design.images">
        					<img :src="design.images.large" class="w-100" />
        				</div>
        			</div>
        		</div>
        		<div class="col-md-6">
					<div class="card">
						<div class="card-body">
							<form class="auth-form" @submit.prevent="submit">
								<alert-success :form="form">
									Diseño actualizado con éxito
								</alert-success>
								<div class="form-group">
									<base-input
										:form="form"
										field="title"
										v-model="form.title"
										placeholder="Ingrese un título.">
									</base-input>
								</div>
								<div class="form-group">
									<base-textarea
										:form="form"
										field="description"
										v-model="form.description"
										placeholder="Ingrese una breve descripción.">
									</base-textarea>
								</div>
								<div class="form-group">
									<client-only>
									<better-input-tag
									:tags="form.tags"
									placeholder="Etiquetas separadas por comas"
									on-paste-delimiter=",">
									</better-input-tag>
									</client-only>
								</div>
								<template v-if="teams.length">
									<div class="form-group custom-control custom-checkbox">
										<input type="checkbox"
											class="custom-control-input"
											id="assign_to_team"
											v-model="form.assign_to_team" />
										<label
											class="custom-control-label"
											value="true"
											for="assign_to_team">
											Asignar al equipo
										</label>
									</div>
									<div class="form-group">
										<select
											:disabled="!form.assign_to_team"
											class="custom-select"
											:class="{'is-invalid': form.errors.has('team')}"
											v-model="form.team">
											<option :value="null">Selecciona un equipo
											</option>
											<option v-for="team in teams" :key="team.id" :value="team.id"> {{ team.name }}</option>
										</select>
										<has-error :form="form" field="team" ></has-error>
									</div>
								</template>
								<div class="form-group custom-control custom-checkbox">
									<input
										type="checkbox"
										class="custom-control-input"
										id="is_live"
										v-model="form.is_live"/>
									<label
										class="custom-control-label"
										value="true"
										for="is_live">
									Publica este diseño
									</label>
								</div>
								<div class="text-right">
									<nuxt-link class="btn color-bordo-out" :to="{ name: 'settings.designs'}"> Cancelar
									</nuxt-link>
									<base-button :loading="form.busy">
										Actualizar de diseño
									</base-button>
								</div>
							</form>
						</div>
					</div>
        		</div>
        	</div>
        </div>
	</div>
</template>
<script>
	import BetterInputTag from 'better-vue-input-tag'
	export default {
		middleware: ['auth'],
		components: {
			BetterInputTag
		},
		data(){
			return {
				form: this.$vform({
					title: '',
					description: '',
					is_live: false,
					tags: [],
					assign_to_team: false,
					team: null
				})
			};
		},
		async asyncData({ $axios, params, error, redirect }){
			try {
				const design = await $axios.$get(`/designs/${params.id}/byUser`);
				const teams = await $axios.$get(`/users/teams`);
				//console.log(design);
				return { design: design.data, teams: teams.data }
			} catch(err) {
				if(err.response.status === 404){
					error({statusCode: 404, message: "Diseño no encontrado."});
				} else if (err.response.status === 401) {
					redirect('/login');
				}else{
					error({statusCode: 500, message: "error de servidor interno."});
				}
			}
		},
		methods: {
			submit(){
				this.form.put(`/designs/${this.$route.params.id}`)
					.then(res => {
						setTimeout(() => {
							this.$router.push({name: 'settings.designs'});
						}, 1000);
					}).catch(err => console.log(err.response));
			}
		},
		mounted(){
			if(this.design)
			{
				Object.keys(this.form).forEach(key => {
					if(this.design.hasOwnProperty(key)){
						this.form[key] = this.design[key];
					}
				});
				this.form.tags = this.design.tag_list.tags || [];

				if(this.design.team){
					this.form.team = this.design.team.id;
					this.form.assign_to_team = true;
				} else {
					this.form.assign_to_team = false;
				}
			}
		}
	};
</script>
