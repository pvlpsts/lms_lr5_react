/*
   компонент, для фильтрации таблицы
   пропсы:
	  fullData - полные данные, по которым формировалась таблица при загрузке страницы
	  data - данные для фильтрации
	  filtering - функция обновления данных для фильтрации
*/

const Filter = (props) => {

	const handleSubmit = (event) => {
		event.preventDefault();

		// создаем словарь со значениями полей формы
		const filterFieldStrings = {
			"Название": event.target["structure"].value.toLowerCase(),
			"Тип": event.target["type"].value.toLowerCase(),
			"Страна": event.target["country"].value.toLowerCase(),
			"Город": event.target["city"].value.toLowerCase()
		};
		const filterFieldNumbers = {
			"Год": [parseInt(event.target["minYear"].value), parseInt(event.target["maxYear"].value)],
			"Высота": [parseInt(event.target["minHeight"].value), parseInt(event.target["maxHeight"].value)]
		};

		//фильтруем данные по значениям всех полей формы
		let arr = props.fullData;
		for (const key in filterFieldStrings) {
			const searchValue = filterFieldStrings[key];
			if (searchValue)
				arr = arr.filter(item =>
					item[key].toLowerCase().includes(filterFieldStrings[key]));
		}
		for (const key in filterFieldNumbers) {
			const [min, max] = filterFieldNumbers[key];
			if (min) {
				arr = arr.filter(item => parseInt(item[key]) >= min);
			}
			if (max) {
				arr = arr.filter(item => parseInt(item[key]) <= max);
			}
		}

		//передаем родительскому компоненту новое состояние - отфильтрованный массив
		props.filtering(arr);
	}

	const handleReset = (event) => {
		props.filtering(props.fullData);
	}

	return (
		<form onSubmit={handleSubmit} onReset={handleReset}>
			<p>
				<label>Название: </label>
				<input name="structure" type="text" />
			</p>
			<p>
				<label>Тип: </label>
				<input name="type" type="text" />
			</p>
			<p>
				<label>Страна: </label>
				<input name="country" type="text" />
			</p>
			<p>
				<label>Город: </label>
				<input name="city" type="text" />
			</p>
			<p>
				<label>Год от: </label>
				<input name="minYear" type="number" />
			</p>
			<p>
				<label>Год до: </label>
				<input name="maxYear" type="number" />
			</p>
			<p>
				<label>Высота от: </label>
				<input name="minHeight" type="number" />
			</p>
			<p>
				<label>Высота до: </label>
				<input name="maxHeight" type="number" />
			</p>
			<p>
				<button type="submit">Фильтровать</button>
				<button type="reset">Очистить фильтр</button>
			</p>
		</form>
	)
}

export default Filter;