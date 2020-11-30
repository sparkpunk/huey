import { createApp } from 'vue';
import App from './App.vue';

import './css/styles.css';

import Modal from './Modal.vue';
import Sidebar from './Sidebar.vue';
import Workspace from './Workspace.vue';

import CodeBlocks from './components/CodeBlocks.vue';
import ColorBox from './components/ColorBox.vue';
import ColorInput from './components/ColorInput.vue';
import ColorRadio from './components/ColorRadio.vue';
import ColorSelect from './components/ColorSelect.vue';
import ContrastTable from './components/ContrastTable.vue';
import SwatchBox from './components/SwatchBox.vue';

const app = createApp(App)

app.component('modal', Modal);
app.component('sidebar', Sidebar);
app.component('workspace', Workspace);

app.component('code-blocks', CodeBlocks);
app.component('color-box', ColorBox);
app.component('color-input', ColorInput);
app.component('color-radio', ColorRadio);
app.component('color-select', ColorSelect);
app.component('contrast-table', ContrastTable);
app.component('swatch-box', SwatchBox);

app.mount('#app');