window.onload = () => {
	const btnDespesa = document.getElementById('btnDespesa');
	const btnRenda = document.getElementById('btnRenda');
	const btnGravar = document.getElementById('btnGravar');
	const btnCancelar = document.getElementById('btnCancelar');
	const inputNome = document.getElementById('nomeCategoria');
	const mensagem = document.getElementById('mensagem');

	let tipoSelecionado = "Renda";

	btnDespesa.onclick = () => {
		tipoSelecionado = "Despesa";
		btnDespesa.classList.add('ativo');
		btnDespesa.innerHTML = 'Despesa <span class="check-icon">&#10003;</span>';
		btnRenda.classList.remove('ativo');
		btnRenda.innerHTML = 'Renda';
	};

	btnRenda.onclick = () => {
		tipoSelecionado = "Renda";
		btnRenda.classList.add('ativo');
		btnRenda.innerHTML = 'Renda <span class="check-icon">&#10003;</span>';
		btnDespesa.classList.remove('ativo');
		btnDespesa.innerHTML = 'Despesa';
	};

	btnGravar.onclick = () => {
		const nome = inputNome.value.trim();

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

		categorias.push({ nome, tipo: tipoSelecionado });

		localStorage.setItem('categorias', JSON.stringify(categorias));

		mensagem.style.color = "#4caf50";
		mensagem.textContent = "Categoria salva!";

		setTimeout(() => {
			window.location.href = 'manutencao.html';
		}, 800);
	};

	btnCancelar.onclick = () => {
		window.location.href = 'manutencao.html';
	};
}
