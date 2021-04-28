const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    toEnglish(text) {
        let originaltext = text
        let translated = text
        text = text.toLowerCase()
        const dict = {...americanOnly, ...americanToBritishSpelling}
        const titles = americanToBritishTitles

        for ( const [key, value] of Object.entries(titles)){
            if (text.includes(key)){
                translated = translated.replace(new RegExp(key, 'gi'), `<span class="highlight">${value.charAt(0).toUpperCase() + value.slice(1)}</span>`)
            }
        }

        for ( const [key, value] of Object.entries(dict)){
            if (text.includes(key)){
                translated = translated.replace(new RegExp(key, 'gi'), `<span class="highlight">${value}</span>`)
            }
        }


        translated = translated.replace(/([0-9]|1[0-2]|0[0-9]):([0-5][0-9])/g, '<span class="highlight">$1.$2</span>')
        return (translated == originaltext) ? true : translated
    }

    objectFlip(dic) {
        const ret = {};
        Object.keys(dic).forEach(key => {
          ret[dic[key]] = key;
        });
        return ret;
    }

    toAmerican(text){
        let originaltext = text
        let translated = text
        text = text.toLowerCase()
        const dict = {...britishOnly, ...this.objectFlip(americanToBritishSpelling)}
        const titles = this.objectFlip(americanToBritishTitles)

        for ( const [key, value] of Object.entries(titles)){
            if (text.includes(key)){
                translated = translated.replace(new RegExp(key, 'gi'), `<span class="highlight">${value.charAt(0).toUpperCase() + value.slice(1)}</span>`)
            }
        }

        for ( const [key, value] of Object.entries(dict)){
            if (text.includes(key)){
                translated = translated.replace(new RegExp(key, 'gi'), `<span class="highlight">${value}</span>`)
            }
        }

        translated = translated.replace(/([0-9]|1[0-2]|0[0-9]).([0-5][0-9])/g, '<span class="highlight">$1:$2</span>')
        return (translated == originaltext) ? true : translated
    }

    

}

module.exports = Translator;