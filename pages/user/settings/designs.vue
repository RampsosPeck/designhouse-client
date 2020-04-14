<template>
	<div class="setting-block">
		<div class="setting-title font-16 fw-500 text-center">DISEÑOS</div>
		<div class="setting-body white-bg-color" >
			<table class="table table-striped">
				<thead>
					<tr>
						<td>#</td>
						<td>Título</td>
						<td>Estado</td>
						<td>Acciones</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(design, index) in designs" :key="design.id" >
						<td>
							<div v-if="design.images">
								<img :src="design.images.thumbnail" width="100" />
							</div>
						</td>
						<td>{{ design.title }}</td>
						<td>{{ design.is_live ? 'Publicado' : 'Draft' }}</td>
						<td>
							<nuxt-link :to="{name:'designs.edit', params: { id: design.id }}"> Editar</nuxt-link>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	export default {
		middleware: ['auth'],
		data(){
			return {
				designs: []
			}
		},
		methods: {
			async fetchUserDesigns(){
				/*const { data } = await this.$axios.get(`/users/${this.$auth.user.id}/designs`);
				this.designs = data; */
				const  resul   = await this.$axios.get(`/users/${this.$auth.user.id}/designs`);
				//console.log(resul);
				this.designs = resul.data.data;
			}
		},
		created() {
			this.fetchUserDesigns();
		}
	};
</script>




