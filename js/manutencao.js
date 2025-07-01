window.onload = () => {
	const btnExcluir = document.getElementById('btnExcluir');
	const btnIncluir = document.getElementById('btnIncluir');
	const boxCategorias = document.getElementById('boxCategorias');

	let selecionadas = [];

	let tipoSelecionado = "Despesa";

	function renderCategorias() {
		const categorias = fetchCategorias().filter(categoria => categoria.tipo == tipoSelecionado);

		if (categorias.length == 0) {
			boxCategorias.innerHTML = '<span class="text-light text-center align-baseline py-2">Nenhuma categoria cadastrada.</span>';
			selecionadas = [];
			btnExcluir.disabled = true;
			return;
		}

		const listaCategorias = categorias.reduce((listaCategorias, categoria) => {
			return listaCategorias + `<li class="list-group-item d-flex gap-1 bg-light-subtle text-white border border-secondary list-group-item-action" data-id="${categoria.nome}">
				<input class="form-check-input me-1" type="checkbox" value="${categoria.nome}" id="categoria-${categoria.nome}">
    		<label class="form-check-label w-100" role="button" for="categoria-${categoria.nome}">${categoria.nome}</label>
			</li>`;
		}, '');

		boxCategorias.innerHTML = `${listaCategorias}`;

		selecionadas = [];

		btnExcluir.disabled = true;

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

	function fetchCategorias() {
		const salvas = localStorage.getItem('categorias');

		return salvas ? JSON.parse(salvas) : [];
	}

	document.querySelectorAll("[name='categoria']").forEach(categoriaOption => {
		categoriaOption.addEventListener('click', () => {
			tipoSelecionado = categoriaOption.value
			renderCategorias()
		})
	})

	document.getElementById('btnConfirmaExclusao').onclick = function () {
		const categorias = fetchCategorias().filter(categoria => categoria.tipo != tipoSelecionado && !idsParaExcluir.includes(categoria.nome));

		localStorage.setItem('categorias', JSON.stringify(categorias));

		const modal = bootstrap.Modal.getInstance(document.getElementById('modalExclusao'));
		modal.hide();

		renderCategorias();
	};

	btnIncluir.onclick = () => {
		navigateTo("cadastro_categorias.html");
	};

	renderCategorias();
}
