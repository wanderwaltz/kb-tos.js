Math['fmod'] = function (a,b) { return Number((a - (Math.floor(a / b) * b)).toPrecision(8)); };