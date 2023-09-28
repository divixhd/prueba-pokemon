import { CellsPage } from '@cells/cells-page';
import { BbvaCoreIntlMixin } from '@bbva-web-components/bbva-core-intl-mixin';
import { html, css } from 'lit-element';
import '@cells-components/cells-template-paper-drawer-panel';
import '@bbva-web-components/bbva-header-main';
import '@bbva-web-components/bbva-form-field';
import '@bbva-web-components/bbva-form-password';
import '@bbva-web-components/bbva-button-default';


class EvolutionsPage extends BbvaCoreIntlMixin(CellsPage) {

    static get is() {
        return 'evolutions-page';
    }

    constructor() {
        super();
        this.getData();
        this.itemList = [];
    }

    static get properties() {
        return {
            itemList: {
                type: Array,
                attribute: 'item-list',
            },
        };
    }
    getData() {
        const apiUrl = 'http://localhost:3002/pokemon?name=' + localStorage.getItem('name').toString();
        console.log(apiUrl)
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error de red: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.itemList = data[0].evolutions;
                console.log(this.itemList);
            })
            .catch(error => {
                console.error(`Error: ${error.message}`);
            });
    }

    goToHome(){
        this.navigate('pokemon');
    }

    render() {
        return html`
        
    <div slot="app-main-content">
    <bbva-button-default
    @click=${this.goToHome}>
      Regresar
  </bbva-button-default>
  ${this.itemList.map((g, i) =>
    html`  <bbva-list-simple>
    <span>${g.name}</span>
    <span>${g.type}</span>
    <span>${g.image}</span>
  </bbva-list-simple>
`)}

    <div slot="app__main" class="container">
    <bbva-form-field
      id="nomPokemon"
      value=${this.itemList[0].name}
      required>
    </bbva-form-field>
    <bbva-form-field
    id="Tipo"
    value=${this.itemList[0].type}
    required>
  </bbva-form-field>
</bbva-form-field>


    <bbva-button-default
      @click=${''}>
        Editar
    </bbva-button-default>
  </div>
    </div>
    `;
    }

    static get styles() {

    }
}

window.customElements.define(EvolutionsPage.is, EvolutionsPage);