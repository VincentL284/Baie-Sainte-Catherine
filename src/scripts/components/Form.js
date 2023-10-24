export default class Form {
  /**
   * constructor - Déclaration de variables globales
   * @param {HTMLElement} element - Référence à l'élément HTML contenant la composante
   * @param {HTMLElement} formElements - Référence aux champs
   */
  constructor(element) {
    this.element = element;
    this.formElements = this.element.elements;

    this.init();
  }

  /**
   * init - Ajouter des écouteurs
   * @param {HTMLElement} input - Référence aux inputs de manière individuelle => Ajouter des écouteurs aux input qui sont obligatoires
   */
  init() {
    this.element.setAttribute('novalidate', '');
    for (let i = 0; i < this.formElements.length; i++) {
      const input = this.formElements[i];
      if (input.required) {
        input.addEventListener('input', this.validateInput.bind(this));
      }
    }

    this.element.addEventListener('submit', this.onSubmit.bind(this));
  }

  /**
   * onSubmit - Code à exécuter en cliquant sur le bouton submit
   */
  onSubmit(event) {
    event.preventDefault();

    if (this.validate()) {
      console.log('success');
      //Si tous les champs sont valides, montrer la confirmation
      this.showConfirmation();
    } else {
      console.log('echec');
    }
  }

  /**
   * validate - Vérifier si les différents champs sont valides en appelant validateInput et retourner la valeur
   * @param {BOOLEAN} isValid - Vraie ou fausse selon le statut du input
   * @param {HTMLElement} input - Référence aux inputs
   */
  validate() {
    let isValid = true;
    for (let i = 0; i < this.formElements.length; i++) {
      const input = this.formElements[i];
      if (input.required && !this.validateInput(input)) {
        isValid = false;
      }
    }
    return isValid;
  }

  /**
   * validateInput - Vérifier si le champ est valide et retourné la valeur
   * @param {HTMLElement} input - Référence au input sélectionné
   */
  validateInput(event) {
    const input = event.currentTarget || event;
    if (input.validity.valid) {
      this.removeError(input);
    } else {
      this.addError(input);
    }

    return input.validity.valid;
  }

  /**
   * addError - Ajouter des styles aux champs étant en erreur
   * @param {HTMLElement} container - Équivaut au parent le plus proche ayant l'attribut
   *  data-input-container, s'il y en a pas, ça équivaut au parent le plus proche ayant la classe input
   */
  addError(input) {
    const container =
      input.closest('[data-input-container]') || input.closest('.input');
    container.classList.add('error');
  }

  /**
   * removeError - Retirer des styles aux champs n'étant pas en erreur
   * @param {HTMLElement} container - Équivaut au parent le plus proche ayant l'attribut
   *  data-input-container, s'il y en a pas, ça équivaut au parent le plus proche ayant la classe input
   */
  removeError(input) {
    const container =
      input.closest('[data-input-container]') || input.closest('.input');

    container.classList.remove('error');
  }

  /**
   * showConfirmation - Ajouter is-sent pour montrer la confirmation
   */
  showConfirmation() {
    this.element.classList.add('is-sent');
  }
}
