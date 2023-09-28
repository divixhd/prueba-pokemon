import { CellsPage } from '@cells/cells-page';
import { BbvaCoreIntlMixin } from '@bbva-web-components/bbva-core-intl-mixin';
import { html, css } from 'lit-element';
import '@bbva-web-components/bbva-list-card';
import '@bbva-web-components/bbva-list-goal';
import '@bbva-web-components/bbva-list-simple';
import '@bbva-web-components/bbva-button-default';


class PokemonPage extends BbvaCoreIntlMixin(CellsPage) {

    static get is() {
        return 'pokemon-page';
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
        const apiUrl = 'http://localhost:3002/pokemon';
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error de red: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.itemList = data;
            })
            .catch(error => {
                console.error(`Error: ${error.message}`);
            });
    }

    _handleClick(evt) {
        const { item } = evt.target;
        console.log(item);
        console.log(item.name);
        localStorage.setItem('name',item.name)
        this.dispatchEvent(new CustomEvent('item-click', {
          bubbles: true,
          detail: item
        }));
        this.navigate('evolutions');
      }

    render() {
        return html`
    <div slot="app-main-content">
    
  ${this.itemList.map((g, i) =>
            html`
    <div >
    <bbva-button-default @click=${this._handleClick}
    .item="${g}"
    ?disabled=${g.evolutions.length == 0}>Edit Evolutions</bbva-button-default> 
    <img src="${g.image}" width="50px">
    <bbva-list-goal 
    goal-title=${g.name} 
    description3="Type: ${g.type}"> 
    <bbva-list-goal>
    </div>
`)}
    </div>
    `;
    }
    static get styles() {
    
    }
}


window.customElements.define(PokemonPage.is, PokemonPage);
