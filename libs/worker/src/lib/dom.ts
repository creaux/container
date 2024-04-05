import GlobalRegistrator from './registrator';
GlobalRegistrator.register({
  url: 'http://localhost:4200',
  width: 1920,
  height: 1080,
});

const el: HTMLDivElement = window.document.createElement('div');
el.setAttribute('id', 'worker');
window.document.body.appendChild(el);
