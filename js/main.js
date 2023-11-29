let timer = null;
let rotateNum = 0;
//좌우 버튼 클릭하면 rotate각도에 적용될 인덱스 카운트값
let activeNum = 0;
//네비버튼 활성화 시키는 순번

const frame = document.querySelector('#circle');
const boxes = frame.querySelectorAll('article');
const btnMode = document.querySelectorAll('.mode li');
const status = document.querySelector('.status');
const navi = document.querySelector('.navi');
const btnNavi = navi.querySelectorAll('li');
const btnPrev = document.querySelector('.prev');
const btnNext = document.querySelector('.next');
//각 모드, 파노라마, 컨트롤 모드시 보이는 요소,안보이는 요소를
//배열로 그룹화합니다
const activeEl = [btnMode[0], status];
const resetEl = [btnMode[1], navi, btnPrev, btnNext];
startRolling();
//1. 써클을 롤링 회전 시키는 함수
function startRolling() {
	let deg = 0;
	timer = setInterval(() => {
		deg += 0.2;
		frame.style.transform = `rotateY(${deg}deg)`;
	}, 20);
}
//롤링 회전을 멈추는 함수
function stopRolling() {
	clearInterval(timer);
}
//모드버튼중에 파노라마를 클릭하면
btnMode[0].addEventListener('click', modePanorama);
btnMode[1].addEventListener('click', modeControl);
function modePanorama() {
	if (btnMode[0].classList.contains('on')) return;
	//만약 이미 해당 버튼이 활성화 되어있다면
	//아래의 코드 실행없이 종료되어 아무일도 일어나지 않습니다
	for (el of activeEl) el.classList.add('on');
	for (el of resetEl) el.classList.remove('on');
	//첫번째 박스를 비활성화 해서 패널위의 제목을 안보이게하고
	boxes[0].classList.remove('on');
	//프레임의 회전각도를 0도로 초기화합니다
	frame.style.transform = 'rotateY(0deg)';
	//0.5초 동안 원위치하는시간동안 모션을 기다린뒤
	//다시 롤링합니다
	setTimeout(() => {
		frame.style.transitionDuration = '0s';
		startRolling();
	}, 600);
}

function modeControl() {
	if (btnMode[1].classList.contains('on')) return;
	//이미 해당 버튼이 활성화되어있으면 아무일도 안일어나게
	for (el of activeEl) el.classList.remove('on');
	for (el of resetEl) el.classList.add('on');
	//컨트롤 모드에 맞게 버튼 및 메뉴 활성화나 비활성화

	//프레임의 회전각도를 0도로 초기화합니다
	frame.style.transitionDuration = '0.5s';
	frame.style.transform = 'rotateY(0deg)';

	stopRolling();
}

//네비 버튼 클릭시 전체박스 회전 및 네비버튼을 활성화시켜야합니다
btnNavi.forEach((el, index) => {
	el.addEventListener('click', () => {
		rotation(index);
	});
});

// 4인덱스로 보내고싶다 45 * 4
//프레임을 회전하는 함수
function rotation(index) {
	console.log('클릭');
	frame.style.transform = `rotateY(${45 * index}deg)`;

	activation(index);
	activeNum = index;
	rotateNum = index;
}

//네비, 박스활성화 함수
function activation(index) {
	//네비버튼을 활성화 하세요
	for (let el of btnNavi) el.classList.remove('on');
	btnNavi[index].classList.add('on');
	//박스의 위치가 원통 회전각도에 따라서 인덱스가 결정됩니다
	//네비버튼 활성화 순번과 달라요
	//따라서 새로운 변수 boxNum을 생성해서
	// 활성화 순번을 구해서 넣어야할거에요
	let boxNum = 0;
	if (index === 0) {
		boxNum = 0;
	} else {
		boxNum = 8 - index;
	}
	//박스도 활성화
	for (let el of boxes) el.classList.remove('on');
	boxes[boxNum].classList.add('on');
}

btnPrev.addEventListener('click', prev);
//prev버튼을 클릭하면, 회전해야합니다

function prev() {
	console.log(rotateNum);
	//회전시키기
	let deg = 45 * --rotateNum;
	frame.style.transform = `rotateY(${deg}deg)`;
	//회전에 따른 인덱스를 활성화
	if (activeNum === 0) {
		activeNum = 7;
	} else {
		--activeNum;
	}
	activation(activeNum);

	console.log(rotateNum);
	console.log(activeNum);
}

btnNext.addEventListener('click', next);
function next() {
	let deg = 45 * ++rotateNum;
	frame.style.transform = `rotateY(${deg}deg)`;
	//회전에 따른 인덱스를 활성화
	if (activeNum === 7) {
		activeNum = 0;
	} else {
		++activeNum;
	}
	activation(activeNum);
}
