import { createApp } from 'vue';
import App from './App.vue';

import './assets/css/styles.css';

import ColorBox from './components/ColorBox.vue';
import ColorInput from './components/ColorInput.vue';
import ColorRadio from './components/ColorRadio.vue';
import SwatchBox from './components/SwatchBox.vue';

const app = createApp(App)

app.component('color-box', ColorBox);
app.component('color-input', ColorInput);
app.component('color-radio', ColorRadio);
app.component('swatch-box', SwatchBox);

app.mount('#app');