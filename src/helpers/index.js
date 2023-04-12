const normalize = (val, max, min) => {
	return (val - min) / (max - min);
}

const limitStringSize = (str, max) => {
	if (str.length < max) return str;
	else return str.substring(0, max) + '...';
}

const lerp = (v0, v1, t) => {
  return v0*(1-t)+v1*t
}

export {
	normalize,
	limitStringSize,
	lerp
}