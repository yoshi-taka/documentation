import Cookies from 'js-cookie';
import Choices from 'choices.js';

import { loadPage } from './async-loading';

/** This code handles toggleable code languages for:
 * 1. Code snippets across all Docs site (main pages and API pages)
 * 2. Code 'pages' for specific pages dedicated to a code language
 *
 *
 *
 *
 *
 *
 *
 *
 */




const codeSelectOptions = {
    searchEnabled: false,
    placeholder: false,
    shouldSort: false,
    itemSelectText: '',
    renderSelectedChoices: false,
    callbackOnCreateTemplates(template) {
        return {
            item: (classNames, data) =>
                template(`
                <div class="${classNames.item} ${
                    data.highlighted
                        ? classNames.highlightedState
                        : classNames.itemSelectable
                } ${
                    data.placeholder ? classNames.placeholder : ''
                }" data-item data-id="${data.id}" data-value="${data.value}" ${
                    data.active ? 'aria-selected="true"' : ''
                } ${data.disabled ? 'aria-disabled="true"' : ''}>
                   ${data.label}
                </div>
              `),
            choice: (classNames, data) =>
                template(`
                <div class="${classNames.item} ${classNames.itemChoice} ${
                    data.disabled
                        ? classNames.itemDisabled
                        : classNames.itemSelectable
                }" data-select-text="${
                    this.config.itemSelectText
                }" data-choice ${
                    data.disabled
                        ? 'data-choice-disabled aria-disabled="true"'
                        : 'data-choice-selectable'
                } data-id="${data.id}" data-value="${data.value}" ${
                    data.groupId > 0 ? 'role="treeitem"' : 'role="option"'
                }>
                   ${data.label}
                </div>
              `)
        };
    }
};

function createChoices (){

    const codeSelector = document.querySelector('.js-code-lang-selector');

    let codeChoices = null;
    
    if (codeSelector) {
        codeChoices = new Choices(codeSelector, codeSelectOptions);
    }
}

createChoices();



const codeSelector = document.querySelector('.js-code-lang-selector');
codeSelector.addEventListener('change', codeLangSelectOnChangeHandler);

function codeLangSelectOnChangeHandler (event){

    const {currentSection, baseUrl} = document.documentElement.dataset;

    if (
        document.documentElement.dataset.type === 'multi-code-lang' && (document.body.classList.contains('kind-section') || document.body.classList.contains('kind-page'))
        
    ) {
        loadPage(`${baseUrl}${currentSection}${event.target.value}`);
        window.history.replaceState({}, '', `${baseUrl}${currentSection}${event.target.value}`);
        
    }

    Cookies.set('code-lang', event.target.value, { path: '/' });

}

function codeNavActivate(codeLang){
    document.querySelectorAll('.js-code-example-link').forEach((link) => {

        if (link.dataset.codeLang === codeLang) {
            link.classList.add('active');
        }  else {
            link.classList.remove('active');
        }
    })
}

function addCodeLinkEventListeners(){
    document.querySelectorAll('.js-code-example-link').forEach((link) => {

        link.addEventListener('click', function (event){

         

            document.querySelector('.js-code-lang-selector').value = event.target.dataset.codeLang
            event.preventDefault();
            redirectToCodeLang(event.target.dataset.codeLang)
           
            // codeNavActivate(event.target.dataset.codeLang)
            
            
        })

        
    })
}

// addCodeLinkEventListeners();

function redirectToCodeLang(codeLang = 'python') {

    const codeSelector = document.querySelector('.js-code-lang-selector');
    const {currentSection, baseUrl} = document.documentElement.dataset;
    // check if on multi-code-lang section page, if so, redirect to subpage with set language.
    let newCodeLang = codeLang;

    // check if cookie is set
    
    // check if on section and multi code page
    if (
        document.documentElement.dataset.type === 'multi-code-lang' &&
        document.body.classList.contains('kind-section')
    ) {
        loadPage(`${window.location.href}/${newCodeLang}`);
        window.history.replaceState({}, '', `${window.location.href}${newCodeLang}`);
        

    } else if (document.documentElement.dataset.type === 'multi-code-lang' &&
        document.body.classList.contains('kind-page')) {

            console.log('newCodeLang: ',  newCodeLang)

        loadPage(`${baseUrl}${currentSection}${newCodeLang}`);
        window.history.replaceState({}, '', `${baseUrl}${currentSection}${newCodeLang}`);
    } else if (Cookies.get('code-lang')) {
        newCodeLang =  Cookies.get('code-lang');
    }

    const pageCodeLang = document.documentElement.dataset.codeLang;

    console.log('pageCodeLang: ', pageCodeLang)


    if (pageCodeLang) {
        codeSelector.value = pageCodeLang;
        codeNavActivate(pageCodeLang)
    } else {
        codeSelector.value = newCodeLang;
        codeNavActivate(newCodeLang)
    }

    
    

}


//  redirect handler 
//  checks cookie/active code lang, loads page async, updates code lang select and tabs, updates cookie

function toggleCodeBlocks(activeLang) {
    // console.log('activeLang: ', activeLang);

    // for page specific toggling

    const codeContainers = $('.js-code-snippet-wrapper');

    // console.log('codeContainers: ', codeContainers)

    // check for api pages
    // if (codeContainers) {
    //     codeContainers.find('.js-code-block').removeClass('d-block');
    //     codeContainers.find('.js-code-block').addClass('d-none');

    //     codeContainers.each(function () {
    //         if ($(this).find(`.code-block-${activeLang}`).length) {
    //             $(this).find(`.code-block-${activeLang}`).removeClass('d-none');
    //             $(this).find(`.code-block-${activeLang}`).addClass('d-block');
    //         } else {
    //             // choose default code language (curl)
    //             $(this).find(`.default`).removeClass('d-none');
    //             $(this).find(`.default`).addClass('d-block');
    //             $(this)
    //                 .find('.js-code-example-link[data-code-lang="curl"]')
    //                 .addClass('active');
    //         }
    //     });
    // } else {
    $('.js-code-block').removeClass('d-block');
    $('.js-code-block').addClass('d-none');

    if ($(`.code-block-${activeLang}`).length) {
        $(`.code-block-${activeLang}`).removeClass('d-none');
        $(`.code-block-${activeLang}`).addClass('d-block');
    } else {
        // choose default code language (curl)
        // console.log('choose curl')
        $(`.default`).removeClass('d-none');
        $(`.default`).addClass('d-block');

        $('.js-code-example-link').removeClass('active');
        $('.js-code-example-link[data-code-lang="curl"]').addClass('active');
    }
    // }
}

redirectToCodeLang();

// codeSelect.addEventListener('change', function (event){
//     codeSelect.setValueByChoice(event.target.value)
// });
export { redirectToCodeLang, codeNavActivate, addCodeLinkEventListeners };
