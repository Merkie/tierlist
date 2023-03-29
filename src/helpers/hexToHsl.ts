const hexStringToHSLString = (hex: string) => {
	// Convert the hexadecimal color string to RGB values
	const red = parseInt(hex.substring(1, 3), 16);
	const green = parseInt(hex.substring(3, 5), 16);
	const blue = parseInt(hex.substring(5, 7), 16);

	// Normalize the RGB values to be in the range [0, 1]
	const normalizedRed = red / 255;
	const normalizedGreen = green / 255;
	const normalizedBlue = blue / 255;

	// Find the minimum and maximum values among the normalized RGB values
	const minRGB = Math.min(normalizedRed, normalizedGreen, normalizedBlue);
	const maxRGB = Math.max(normalizedRed, normalizedGreen, normalizedBlue);

	// Calculate the hue, saturation, and lightness values using the formulas for HSL conversion
	const lightness = (minRGB + maxRGB) / 2;

	if (minRGB === maxRGB) {
		// If the minimum and maximum RGB values are the same, the color is a shade of grey
		return `hsl(0, 0%, ${Math.round(lightness * 100)}%)`;
	} else {
		const delta = maxRGB - minRGB;
		const saturation = lightness > 0.5 ? delta / (2 - maxRGB - minRGB) : delta / (maxRGB + minRGB);

		let hue;
		if (maxRGB === normalizedRed) {
			hue = (normalizedGreen - normalizedBlue) / delta + (normalizedGreen < normalizedBlue ? 6 : 0);
		} else if (maxRGB === normalizedGreen) {
			hue = (normalizedBlue - normalizedRed) / delta + 2;
		} else {
			hue = (normalizedRed - normalizedGreen) / delta + 4;
		}
		hue *= 60;

		return `hsl(${Math.round(hue)}, ${Math.round(saturation * 100)}%, ${Math.round(
			lightness * 100
		)}%)`;
	}
};
export default hexStringToHSLString;
