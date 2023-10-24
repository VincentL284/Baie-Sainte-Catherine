import Carousel from './components/Carousel';
import Header from './components/Header';
import Scrolly from './components/Scrolly';
import Accordion from './components/Accordion';
import Youtube from './components/Youtube';
import Form from './components/Form';
export default class ComponentFactory {
  constructor() {
    this.componentList = {
      Carousel,
      Header,
      Scrolly,
      Accordion,
      Youtube,
      Form,
    };
    this.init();
  }
  init() {
    const components = document.querySelectorAll('[data-component]');
    for (let i = 0; i < components.length; i++) {
      const element = components[i];
      const componentName = element.dataset.component;
      if (this.componentList[componentName]) {
        new this.componentList[componentName](element);
      } else {
        console.log(`La composante ${componentName} n'existe pas!`);
      }
    }
  }
}
