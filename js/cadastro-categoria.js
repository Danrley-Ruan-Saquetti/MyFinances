window.onload = () => {
	const btnGravar = document.getElementById('btnGravar');
	const btnCancelar = document.getElementById('btnCancelar');
	const inputNome = document.getElementById('nomeCategoria');
	const mensagem = document.getElementById('mensagem');

	btnGravar.onclick = () => {
		const nome = inputNome.value.trim();

		mensagem.textContent = '';

		if (!nome) {
			mensagem.style.color = "#ff5858";
			mensagem.textContent = "Digite um nome!";
			return;
		}

		let categorias = [];

		const salvas = localStorage.getItem('categorias');

		if (salvas) {
			categorias = JSON.parse(salvas);
		}

		categorias.push({
			nome,
			tipo: document.querySelector("[name='categoria']:checked").value
		});

		localStorage.setItem('categorias', JSON.stringify(categorias));

		mensagem.style.color = "#4caf50";
		mensagem.textContent = "Categoria salva!";

		setTimeout(() => {
			navigateTo('manutencao.html');
		}, 800);
	};

	btnCancelar.onclick = () => {
		navigateTo('manutencao.html');
	};
}
