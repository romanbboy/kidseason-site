const randomColor = () => '#' + ('00000' + (Math.random() * 16777216 << 0).toString(16)).substr(-6);

export default randomColor;