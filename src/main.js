import { createApp } from 'vue';
import App from './App.vue';

import './css/styles.css';

import Modal from './Modal.vue';
import Sidebar from './Sidebar.vue';
import Workspace from './Workspace.vue';

import CodeColumns from './components/CodeColumns.vue';
import ColorBox from './components/ColorBox.vue';
import ColorInput from './components/ColorInput.vue';
import ColorRadio from './components/ColorRadio.vue';
import ContrastTable from './components/ContrastTable.vue';
import SwatchBox from './components/SwatchBox.vue';

const app = createApp(App)

app.component('modal', Modal);
app.component('sidebar', Sidebar);
app.component('workspace', Workspace);

app.component('code-columns', CodeColumns);
app.component('color-box', ColorBox);
app.component('color-input', ColorInput);
app.component('color-radio', ColorRadio);
app.component('contrast-table', ContrastTable);
app.component('swatch-box', SwatchBox);

app.mount('#app');