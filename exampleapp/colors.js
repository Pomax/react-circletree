var categories = require('./categories');

module.exports = {
  fill(v) {
    if (typeof v === 'number') {
      if(v===0) return 'white';
      if(v===1) return '#EEE';
      if(v>=2) return 'white';
    }
    if(v===categories.PS) return 'purple';
    if(v===categories.CM) return 'gold';
    if(v===categories.CR) return 'royalblue';
    if(v===categories.CL) return 'limegreen';

    if(v==='highlight') return 'rgba(255,200,0,0.3)';

    return "transparent";
  },

  stroke(v) {
    if (typeof v === 'number') {
      if(v===0) return 'black';
      if(v===1) return 'black';
      if(v>=2) return 'black';
    }
    if(v===categories.PS) return 'none';
    if(v===categories.CM) return 'none';
    if(v===categories.CR) return 'none';
    if(v===categories.CL) return 'none';

    return "transparent";
  }
};
