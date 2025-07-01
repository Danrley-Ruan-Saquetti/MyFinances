window.onload = () => {
	const categoriaRepository = new LocalStorageRepository('categoria')

	const btnExcluir = document.getElementById('btnExcluir');
	const btnIncluir = document.getElementById('btnIncluir');
	const boxCategorias = document.getElementById('boxCategorias');

	let selecionadas = [];

	let tipoSelecionado = "Despesa";

	function renderCategorias() {
		selecionadas = [];
		btnExcluir.disabled = true;

		const categorias = categoriaRepository.getAll().filter(categoria => categoria.tipo == tipoSelecionado);

		if (categorias.length == 0) {
			boxCategorias.innerHTML = '<span class="text-light text-center align-baseline py-2">Nenhuma categoria cadastrada.</span>';
			return;
		}

		const listaCategorias = categorias.reduce((listaCategorias, categoria) => {
			return listaCategorias + `<li class="list-group-item d-flex gap-1 bg-light-subtle text-white border border-secondary list-group-item-action" data-id="${categoria.id}">
				<input class="form-check-input me-1" type="checkbox" value="${categoria.id}" id="categoria-${categoria.id}">
    		<label class="form-check-label w-100" role="button" for="categoria-${categoria.id}">${categoria.nome}</label>
			</li>`;
		}, '');

		boxCategorias.innerHTML = `${listaCategorias}`;

		boxCategorias.querySelectorAll('input[type=checkbox]').forEach(chk => {
			chk.addEventListener('change', function () {
				if (this.checked) {
					selecionadas.push(this.value);
				} else {
					selecionadas = selecionadas.filter(n => n !== this.value);
				}

				btnExcluir.disabled = selecionadas.length == 0;
			});
		});
	}

	document.querySelectorAll("[name='categoria']").forEach(categoriaOption => {
		categoriaOption.addEventListener('click', () => {
			tipoSelecionado = categoriaOption.value
			renderCategorias()
		})
	})

	document.getElementById('btnConfirmaExclusao').onclick = function () {
		console.log(selecionadas)
		selecionadas.forEach(idCategoria => {
			categoriaRepository.delete(idCategoria)
		})

		const modal = bootstrap.Modal.getInstance(document.getElementById('modalExclusao'));
		modal.hide();

		renderCategorias();
	};

	btnIncluir.onclick = () => {
		navigateTo("cadastro_categorias.html");
	};

	renderCategorias();
}
