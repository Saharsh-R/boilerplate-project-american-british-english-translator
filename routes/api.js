'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const {text, locale} = req.body
   
      if ( locale == undefined || text == undefined ){
        return res.json({error: 'Required field(s) missing'})
      }
      if (!text){
        return res.json({error: 'No text to translate' })
      }
      let result = ''
      if (locale == 'american-to-british'){
        result = translator.toEnglish(text)
      } else if (locale == 'british-to-american'){
        result = translator.toAmerican(text)
      } else{
        return res.json({ error: 'Invalid value for locale field' })
      }

      if (result == true) {
        return res.json({text, translation: "Everything looks good to me!"})
      }
      return res.json({text, translation: result})

      
    });
};
