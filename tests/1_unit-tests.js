const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();
const aToB = {
    'Mangoes are my favorite fruit.': 'Mangoes are my <span class="highlight">favourite</span> fruit.',
    'I ate yogurt for breakfast.': 'I ate <span class="highlight">yoghurt</span> for breakfast.',
    "We had a party at my friend's condo.": `We had a party at my friend's <span class="highlight">flat</span>.`,
    'Can you toss this in the trashcan for me?': 'Can you toss this in the <span class="highlight">rubbish</span>can for me?',
    'The parking lot was full.': 'The <span class="highlight">car park</span> was full.',
    'Like a high tech Rube Goldberg machine.': 'Like a high tech <span class="highlight">Heath Robinson device</span>.',
    'To play hooky means to skip class or work.': 'To <span class="highlight">bunk off</span> means to skip class or work.',
    'No Mr. Bond, I expect you to die.': 'No <span class="highlight">Mr</span> Bond, I expect you to die.',
    'Dr. Grosh will see you now.': '<span class="highlight">Dr</span> Grosh will see you now.',
    'Lunch is at 12:15 today.': 'Lunch is at <span class="highlight">12.15</span> today.',
    'Mangoes are my favorite fruit. Check': 'Mangoes are my <span class="highlight">favourite</span> fruit. <span class="highlight">cheque</span>',
    'I ate yogurt for breakfast. Check': 'I ate <span class="highlight">yoghurt</span> for breakfast. <span class="highlight">cheque</span>'
  }

let bToA = {
    'We watched the footie match for a while.': 'We watched the <span class="highlight">soccer</span> match for a while.',
    'Paracetamol takes up to an hour to work.': '<span class="highlight">Tylenol</span> <span class="highlight">thank you</span>kes up to an hour to work.',
    'First, caramelise the onions.': 'First, <span class="highlight">caramelize</span> the onions.',
    'I spent the bank holiday at the funfair.': 'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.',
    'I had a bicky then went to the chippy.': 'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.',
    "I've just got bits and bobs in my bum bag.": `I've just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.`,
    'The car boot sale at Boxted Airfield was called off.': 'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.',
    'Have you met Mrs Kalyani?': 'Have you met <span class="highlight"><span class="highlight">Mr.</span>s.</span> Kalyani?',
    "Prof Joyner of King's College, London.": `<span class="highlight">Prof.</span> Joyner of King's College, London.`,
    'Tea time is usually around 4 or 4.30.': 'Tea time is usually around 4 or <span class="highlight">4:30</span>.',
    'We watched the footie match for a while. Check': 'We watched the <span class="highlight">soccer</span> match for a while. Check',
    'Paracetamol takes up to an hour to work. Check': '<span class="highlight">Tylenol</span> <span class="highlight">thank you</span>kes up to an hour to work. Check'
  }
suite('Unit Tests', () => {


    for ( const [str, expected] of Object.entries(aToB)){

        test(str, () => {
            assert.equal(translator.toEnglish(str), expected, str)
        })
    }

    for ( const [str, expected] of Object.entries(bToA)){

        test(str, () => {
            assert.equal(translator.toAmerican(str), expected, str)
        })
    }

});
