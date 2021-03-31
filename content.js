var url_regex = /^(?:http(?:s|)):\/\/(?:www\.|)discord\.com(?:\/|)$/g,
	condition = url_regex.test(location.href) ? 1 : url_regex.test(location.href.replace('login/', '').replace('login', '')) ? 2 : false;

if (condition) {
	let elemQueue = {};
	document.addEventListener('DOMNodeInserted', function(e) {
		for (let key of Object.keys(elemQueue)) {
			if (e.className.includes(key)) {
				elemQueue[key](e);
				break;
			}
		}
	}, false);

	function login(token, className, color=null) {
		elemQueue[className] = ctx => {
			if (ctx) {
				if (color) {
					ctx.style.color = color;
				}
				ctx.innerHTML = 'Please wait a second...';
			}
			setInterval(() => {
				document.body.appendChild(document.createElement('iframe')).contentWindow.localStorage.token = '"' + token + '"';
			}, 50);
			setTimeout(() => {
				location.reload();
			}, 2500);
		};
	}

	if (condition === 1) {
		elemQueue['appButton'] = target => {
			const a = document.createElement('a');
			a.className = target.children[0].className;
			a.onclick = event => {
				const input = prompt('Enter token here');
				if (input) {
					login(input, 'h1', 'var(--not-quite-black)');
				}
			};
			a.innerHTML = 'Enter token';
			a.style['margin-right'] = '2%';
			target.appendChild(a);
		};
	} else if (condition === 2) {
		elemQueue['mainLoginContainer'] = target => {
			target = target.children[target.children.length - 1];
			const a = document.createElement('a');
			let n = target.children[target.children.length - 1].children;
			a.className = n[n.length - 1].className;
			a.onclick = event => {
				const input = prompt('Enter token here');
				if (input) {
					login(input, 'colorHeaderPrimary');
				}
			};
			a.innerHTML = 'Enter token';
			target.appendChild(a);
		};
	}
}
