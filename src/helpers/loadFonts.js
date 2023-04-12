const FontFaceObserver = require('fontfaceobserver');

const fontsData = {
  'Circular Std': { weight: 300 },
  'Circular Air Pro': { weight: 300 },
  'Alterra Display': { weight: 'normal' }
};

const defaultFonts = [
  'Circular Std',
	'Circular Air Pro',
	'Alterra Display'
]

function loadFonts(fonts = defaultFonts) {
  return new Promise((resolve) => {
    const fontFaceObersvers = fonts.map(font => {
      const data = fontsData[font];
      return new FontFaceObserver(font, data);
    })
    Promise.all(fontFaceObersvers).then(() => {
      resolve();
    });
  })
}

export default loadFonts;