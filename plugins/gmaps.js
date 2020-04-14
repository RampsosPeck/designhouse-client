import Vue from 'vue';
//import * as VueGoogleMaps from 'vue2-google-maps';
import * as VueGoogleMaps from 'vue2-google-maps-withscopedautocomp';

Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyBXAvmMRNv_KZEUsA-4GTU5lDVptgnBo14',
		libraries: 'places'
	}
});


