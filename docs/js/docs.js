const Uol = {};

Uol.docs = {

	nav: [
		{
			name: "Convention",
			url: "./convention.html",
		},
		{
			name: "Forms",
			url: "./forms.html",
		},
		{
			name: "Grid",
			url: "./grid.html",
		},
		{
			name: "Input groups",
			url: "./input-groups.html",
		},
		{
			name: "Buttons",
			url: "./buttons.html",
		},
		{
			name: "Tables",
			url: "./tables.html",
		},
		{
			name: "Tags",
			url: "./tags.html",
		},
		{
			name: "Select",
			url: "./select.html",
		},
	],

	init() {
		this.renderCodeExamples();
		this.renderNav();
	},

	htmlEscape(str) {
		return str
			.replace(/js-codeExample /, "")
			.replace(/ js-codeExample/, "")
			.replace(/js-codeExample/, "")
			.replace(/&/g, "&amp;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#39;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/\t/g, "  ");
	},

	renderCodeExamples() {
		const { htmlEscape } = this;
		const exampleNodes = document.querySelectorAll(".js-codeExample");

		exampleNodes.forEach((exampleNode) => {
			const escapedExampleNode = `<pre class="t-pre"><code>${htmlEscape(exampleNode.outerHTML)}</code></pre>`;

			exampleNode.insertAdjacentHTML("beforebegin", escapedExampleNode);
		});
	},

	renderNav() {
		let navItemNodesInString = "";

		const navNode = document.querySelectorAll(".js-nav")[0];
		this.nav.forEach((navItem) => { navItemNodesInString += `<li><a href="${navItem.url}" class="nav-item">${navItem.name}</a></li>`; });

		navNode.innerHTML = navItemNodesInString;
	},

};

window.onload = () => {
	Uol.docs.init();
};