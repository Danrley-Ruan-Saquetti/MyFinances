window.onload = () => {
	const btnDespesa = document.getElementById('btnDespesa');
	const btnRenda = document.getElementById('btnRenda');
	const btnExcluir = document.getElementById('btnExcluir');
	const btnIncluir = document.getElementById('btnIncluir');
	const boxCategorias = document.getElementById('boxCategorias');

	let categorias = [];
	let selecionadas = [];

	let tipoSelecionado = "Renda";

	function carregarCategorias() {
		const salvas = localStorage.getItem('categorias');

		categorias = salvas ? JSON.parse(salvas) : [];
	}

	function renderCategorias() {
		carregarCategorias();

		const filtradas = categorias.filter(cat => cat.tipo === tipoSelecionado);

		if (filtradas.length === 0) {
			boxCategorias.innerHTML = '<div class="categoria-lista"><p style="color:#aaa; text-align:center;">Nenhuma categoria cadastrada.</p></div>';
			selecionadas = [];
			btnExcluir.disabled = true;
			return;
		}

		let html = '<div class="categoria-lista"><ul>';

		filtradas.forEach((cat, idx) => {
			html += `<li>
				<input type="checkbox" class="form-check-input me-2" data-idx="${cat.nome}" checked>
				${cat.nome}
			</li>`;
		});

		html += '</ul></div>';

		boxCategorias.innerHTML = html;

		selecionadas = filtradas.map(cat => cat.nome);

		btnExcluir.disabled = false;

		document.querySelectorAll('input[type=checkbox]').forEach(chk => {
			chk.addEventListener('change', function () {
				const nome = this.getAttribute('data-idx');

				if (this.checked) {
					if (!selecionadas.includes(nome)) selecionadas.push(nome);
				} else {
					selecionadas = selecionadas.filter(n => n !== nome);
				}

				btnExcluir.disabled = selecionadas.length === 0;
			});
		});
	}

	btnDespesa.onclick = () => {
		tipoSelecionado = "Despesa";

		btnDespesa.classList.add('ativo');
		btnDespesa.innerHTML = 'Despesa <span class="check-icon">&#10003;</span>';
		btnRenda.classList.remove('ativo');
		btnRenda.innerHTML = 'Renda';

		renderCategorias();
	};

	btnRenda.onclick = () => {
		tipoSelecionado = "Renda";

		btnRenda.classList.add('ativo');
		btnRenda.innerHTML = 'Renda <span class="check-icon">&#10003;</span>';
		btnDespesa.classList.remove('ativo');
		btnDespesa.innerHTML = 'Despesa';

		renderCategorias();
	};

	let idsParaExcluir = [];

	btnExcluir.onclick = () => {
		idsParaExcluir = selecionadas.slice();
		if (idsParaExcluir.length === 0) return;
		document.getElementById('modalExclusao').style.display = 'flex';
	};

	document.getElementById('btnFecharModal').onclick = fecharModalExclusao;
	document.getElementById('btnCancelaExclusao').onclick = fecharModalExclusao;

	function fecharModalExclusao() {
		document.getElementById('modalExclusao').style.display = 'none';
		idsParaExcluir = [];
	}

	document.getElementById('btnConfirmaExclusao').onclick = function () {
		carregarCategorias();

		categorias = categorias.filter(cat => !(cat.tipo === tipoSelecionado && idsParaExcluir.includes(cat.nome)));

		localStorage.setItem('categorias', JSON.stringify(categorias));

		fecharModalExclusao();
		renderCategorias();
	};

	btnIncluir.onclick = () => {
		window.location.href = "cadastro_categorias.html";
	};

	renderCategorias();
}
