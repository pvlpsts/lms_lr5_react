import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';
import { useState } from "react";

/*
   компонент, выводящий на страницу таблицу с пагинацией
   пропсы:
	  data - данные для таблицы в виде массива объектов
*/

const Table = (props) => {

	const { amountRows = 15, showPagination = true } = props;

	const [activePage, setActivePage] = useState("1");

	const changeActive = (event) => {
		setActivePage(event.target.innerHTML);
	};

	const [isFiltered, setIsFiltered] = useState(false);

	const [dataTable, setDataTable] = useState(props.data);
	const updateDataTable = (filteredTable) => {
		setDataTable(filteredTable);
		setIsFiltered(filteredTable.length !== props.data.length);
		setActivePage("1");
	};

	if (showPagination === "false") {
		return (
			<>
				<h4>Фильтры</h4>
				<Filter filtering={updateDataTable} data={dataTable} fullData={props.data} />
				<table>
					<TableHead head={Object.keys(props.data[0])} />
					<TableBody body={dataTable} amountRows={props.data.length} numPage={1} />
				</table>
			</>
		)
	}

	//количество страниц разбиения таблицы
	const n = Math.ceil(dataTable.length / amountRows);

	// массив с номерами страниц
	const arr = Array.from({ length: n }, (v, i) => i + 1);

	//формируем совокупность span с номерами страниц
	const pages = arr.map((item, index) =>
		(index == activePage - 1)
			? <span key={index} className="numPage curNumPage" onClick={changeActive}> {item} </span>
			: <span key={index} className="numPage" onClick={changeActive}> {item} </span>
	);

	return (
		<>
			<h4>Фильтры</h4>
			<Filter filtering={updateDataTable} data={dataTable} fullData={props.data} />
			<table>
				<TableHead head={Object.keys(props.data[0])} />
				<TableBody body={dataTable} amountRows={isFiltered ? dataTable.length : amountRows} numPage={activePage} />
			</table>

			{!isFiltered && <div>
				{pages}
			</div>}
		</>
	)
}

export default Table;