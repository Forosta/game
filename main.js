// Этап 1. Создайте функцию, генерирующую массив парных чисел.
// Пример массива, который должна возвратить функция:
// [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.
// Создаем массив для списка паор

const arrNum = [];

function createNumbersArray(count) {
	for (let i = 1; i <= count; i++) {
		arrNum.push(i);
		arrNum.push(i);
	}
	return arrNum;
}

// Этап 2. Создайте функцию перемешивания массива.
// Функция принимает в аргументе исходный массив
// и возвращает перемешанный массив. arr - массив чисел
// Фишер - Йетса. находит случаное число и ставит его в начало

function shuffle(arr) {
	// объ. пер. для индекса
	let randInd;
	// объ. массив
	const shuffArr = [];
	// объ. конс. длины массива
	const countIndex = arr.length - 1;
	// создаем цикл по алгоритму Фишера - Йетса
	for (let i = 0; i <= countIndex; i++) {
		// рандомим число
		// сохраняем число в локаль. обл. видимости фун-ии
		randInd = Math.round(Math.random() * (arr.length - 1));
		// добавляем выбранный индекс
		shuffArr.push(arr[randInd]);
		// удаляем выбранный индекс
		arr.splice(randInd, 1);
	}
	// arr = shuffArr; я не знаю
	// перезаписываем изначальный массив
	// возвращаем
	return shuffArr;
}

// console.log(arrNum);

// console.log(shuffle(arrNum));
// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами.
// На основе этого массива вы можете создать DOM-элементы карточек.
// У каждой карточки будет свой номер из массива произвольных чисел.
// Вы также можете создать для этого специальную функцию. count - количество пар.
function startGame() {
	//
	const form = document.createElement('form');
	const input = document.createElement('input');
	const btn = document.createElement('button');
	const container = document.getElementById('game');
	const list = document.querySelector('ul');
	const items = document.querySelectorAll('li');
	const modul = document.createElement('div');
	const text = document.createElement('p');
	const btnRst = document.createElement('button');
	const outTimer = document.createElement('div');
	// popup
	modul.classList.add('popup');
	btnRst.classList.add('btn', 'btn-primary');
	btnRst.textContent = 'Restart Game ?';
	container.append(modul);
	modul.append(text, btnRst);
	modul.classList.add('hidden');
	// form
	container.classList.add('d-flex', 'flex-column', 'align-items-center');
	form.classList.add('d-flex', 'align-items-center', 'flex-column');
	input.classList.add('form-control', 'mb-3');
	input.placeholder = 'Введите количество карточек';
	btn.classList.add('btn', 'btn-primary');
	btn.textContent = 'Начать игру';
	outTimer.classList.add('timer');
	container.prepend(form);
	form.append(input, btn, outTimer);
	btn.disabled = true;
	// 1
	input.addEventListener('input', () => {
		btn.disabled = !input.value;
	});

	// 1
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		btn.disabled = true;
		input.disabled = true;

		let count = input.value;
		if (count % 2 === 0) {
			count /= 2;
		} else {
			count = 2;
		}
		console.log(count);
		createNumbersArray(count);
		const shufArr = shuffle(arrNum);
		// const countItem = arrLength / countLine;
		// const indexArr = 0;
		for (const key in shufArr) {
			items[key].textContent = shufArr[key];
			items[key].classList.add('cards');
		}
		let check;
		let countCheck = 0;
		let finish = shufArr.length / 2;
		// console.log(finish);
		items.forEach((item) => {
			item.addEventListener('click', () => {
				// console.log(check, 'chek');
				// console.log(item.textContent, 'text');
				item.classList.add('disabled');
				if (!check) {
					console.log(check, 'Облом');
					// return;
				} else if (check === item.textContent) {
					setTimeout(() => {
						items.forEach((item) => {
							if (item.classList.contains('disabled')) {
								// item.classList.remove('disabled');
								item.classList.add('access');
							}
						});
						console.log('u win');
						finish -= 1;
						if (finish === 0) {
							console.log(finish, 'finish');
							text.textContent = 'Wow amazing!!! You\'re winner';
							modul.classList.remove('hidden');
							btnRst.addEventListener('click', () => {
								modul.classList.add('hidden');
								for (const key in shufArr) {
									console.log(items[key], 'key');
									items[key].classList.remove('cards', 'disabled', 'access');
									items[key].textContent = '';
									input.value = '';
									btn.disabled = false;
									input.disabled = false;
								}
							});
						}
					}, 700);
				} else {
					item.classList.add('disabled');
					setTimeout(() => {
						items.forEach((item) => {
							if (item.classList.contains('cards', 'disabled')) {
								item.classList.remove('disabled');
							}
						});
					}, 700);
					console.log('u los', check);
				}
				check = item.textContent;
				countCheck += 1;
				if (countCheck === 2) {
					countCheck = 0;
					check = undefined;
					console.log('countCheck', countCheck);
				}
				// console.log(check, 'chek');
			});
			let timer = 10;
			const set = setInterval(() => {
				timer -= 1;
				outTimer.textContent = timer;
				if (timer === 0) {
					clearInterval(set);
					text.textContent = 'Don\'t be sad... you can try again';
					modul.classList.remove('hidden');
					btnRst.addEventListener('click', () => {
						modul.classList.add('hidden');
						for (const key in shufArr) {
							console.log(items[key], 'key');
							items[key].classList.remove('cards', 'disabled', 'access');
							items[key].textContent = '';
							input.value = '';
							btn.disabled = false;
							input.disabled = false;
						}
					});
				}
				btn.addEventListener('click', () => {
					clearInterval(set);
				});
			}, 1000);
		});
		// console.log(items[1]);
	});
}
