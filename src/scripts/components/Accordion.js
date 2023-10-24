export default class Accordion {
  /**
   * constructor
   */
  constructor(element) {
    this.element = element;
    this.headers = this.element.querySelectorAll('.accordion__header');
    this.containers = this.element.querySelectorAll('.accordion__container');
    this.nbAuto = 0;
    this.init();
  }
  /**
   * init
   
   */
  init() {
    //Appelle la fonction qui ouvre l'accordéon automatiquement sous certaines conditions
    this.autoOpen();
    for (let i = 0; i < this.headers.length; i++) {
      const header = this.headers[i];
      header.addEventListener('click', this.toggleActive.bind(this));
    }
  }

  /**
   * toggleActive - Pour ouvrir ou fermer les accordéons
   */
  toggleActive(event) {
    const target = event.currentTarget;
    const targetParent = target.parentElement;
    if (target) {
      //Si le parent contient la classe content-is-active
      if (targetParent.classList.contains('content-is-active')) {
        //L'enlever
        targetParent.classList.remove('content-is-active');
      } //Sinon
      else {
        //Vérifier la présence de l'attribut data-not-closing
        if (!('notClosing' in this.element.dataset)) {
          //fermer tous les accordéons
          this.reset();
        }
        //L'ajouter
        targetParent.classList.add('content-is-active');
      }
    }
  }

  /**
   * reset - Fermer les accordéons
   * @param {HTMLElement} container - Référence au conteneur
   */
  reset() {
    for (let i = 0; i < this.containers.length; i++) {
      const container = this.containers[i];
      container.classList.remove('content-is-active');
    }
  }
  /**
   * autoOpen - Gérer l'attribut data-not-closing
   * @param {HTMLElement} container - Référence aux conteneurs
   */
  autoOpen() {
    for (let i = 0; i < this.containers.length; i++) {
      const container = this.containers[i];
      //Si l'attribut data-auto-open est présent dans le dataset du conteneur
      if ('autoOpen' in container.dataset) {
        //Le rendre actif
        container.classList.add('content-is-active');
        //Augmenter le nombre de auto-open de 1
        this.nbAuto++;
      }
    }

    //Si il y a plus d'un data-auto-open
    if (this.nbAuto > 1) {
      //Ajouter l'attribut data-not-closing au dataset de l'element
      this.element.dataset.notClosing = '';
    }
  }
}
