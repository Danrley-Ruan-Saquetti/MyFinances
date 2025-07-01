window.onload = () => {
	const categoriaRepository = new LocalStorageRepository('categoria')

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

		categoriaRepository.create({
			nome,
			tipo: document.querySelector("[name='categoria']:checked").value
		})

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
