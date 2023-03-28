export default (color1: string, color2: string, n: number): string[] => {
	// Convert the input colors from strings to HSL objects
	const hsl1 = parseHsl(color1);
	const hsl2 = parseHsl(color2);

	// Calculate the difference in hue, saturation, and lightness between the two colors
	const deltaHue = hsl2.h - hsl1.h;
	const deltaSaturation = hsl2.s - hsl1.s;
	const deltaLightness = hsl2.l - hsl1.l;

	// Calculate the step size for each color component based on the number of swatches to generate
	const stepHue = deltaHue / (n - 1);
	const stepSaturation = deltaSaturation / (n - 1);
	const stepLightness = deltaLightness / (n - 1);

	// Generate the swatches by applying the step size to each color component for each swatch
	const swatches = [];
	for (let i = 0; i < n; i++) {
		const hue = Math.round(hsl1.h + i * stepHue);
		const saturation = Math.round(hsl1.s + i * stepSaturation);
		const lightness = Math.round(hsl1.l + i * stepLightness);
		swatches.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
	}

	return swatches;
};

// Helper function to parse an HSL color string into an object
function parseHsl(color: string): { h: number; s: number; l: number } {
	const regex = /hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/;
	const match = color.match(regex);
	if (!match) {
		throw new Error(`Invalid HSL color: ${color}`);
	}
	return {
		h: Number(match[1]),
		s: Number(match[2]),
		l: Number(match[3])
	};
}
