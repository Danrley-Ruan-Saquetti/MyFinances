window.onload = () => {
	const lancamentoBancarioRepository = new LocalStorageRepository('lancamento-bancario')
	const categoriaRepository = new LocalStorageRepository('categoria')

	const listCategorias = document.getElementById('listCategorias');
	const btnGravar = document.getElementById('btnGravar');
	const btnCancelar = document.getElementById('btnCancelar');
	const mensagem = document.getElementById('mensagem');

	let tipoSelecionado = "Despesa";

	btnGravar.onclick = () => {

	};

	document.querySelectorAll("[name='categoria']").forEach(categoriaOption => {
		categoriaOption.addEventListener('click', () => {
			tipoSelecionado = categoriaOption.value
			renderCategorias()
		})
	})

	function carregarCategorias() {
		const categorias = categoriaRepository.getAll().filter(categoria => categoria.tipo == tipoSelecionado);

		const listaCategorias = categorias.reduce((listaCategorias, categoria) => {
			return listaCategorias + `<li class="list-group-item d-flex gap-1 bg-light-subtle text-white border border-secondary list-group-item-action" data-id="${categoria.id}">
				<input class="form-check-input me-1" type="checkbox" value="${categoria.id}" id="categoria-${categoria.id}">
    		<label class="form-check-label w-100" role="button" for="categoria-${categoria.id}">${categoria.nome}</label>
			</li>`;
		}, '');

		listCategorias.innerHTML = `${listaCategorias}`;
	}

	carregarCategorias()
}
