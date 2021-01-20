// Extension Elements
const workTimeVal = document.querySelector("#wt");
const breakTimeVal = document.querySelector("#bt");
const sesBtn = document.querySelector("#si");
const defBtn = document.querySelector("#sd");
const tableData = document.querySelector("#trkDataDisp");
const totalTime = document.querySelector("#trDataTotal");

//initializing values in storege
chrome.storage.sync.get(
	["workTime", "breakTime", "workDone", "breakDone"],
	(intervals) => {
		workTimeVal.value = 60;
		breakTimeVal.value = 15;
		intervals.workTime = 3660;
		intervals.breakTime = 900;
		intervals.workDone = intervals.breakDone = 0;
	}
);

// Integer Validiator (returns true on integer and )
const isInt = (value) => {
	return (
		value === "" ||
		(!isNaN(value) &&
			parseInt(Number(value)) == value &&
			!isNaN(parseInt(value, 10)) &&
			parseInt(value) >= 0)
	);
};

const val = (elem) => {
	if (!isInt(elem.value)) {
		elem.classList.add("text-danger");
		return false;
	} else {
		elem.classList.remove("text-danger");
		return true;
	}
};

const disBtn = () => {
	sesBtn.disabled = defBtn.disabled = true;
};
const enBtn = () => {
	sesBtn.disabled = defBtn.disabled = false;
};

const saveData = () => {
	newWT = workTimeVal.value;
	if (newWT == "") newWT = "60";
	newWT = parseInt(newWT);
	workTimeVal.value = newWT;
	newBT = breakTimeVal.value;
	if (newBT == "") newBT = "15";
	newBT = parseInt(newBT);
	breakTimeVal.value = newBT;
	chrome.storage.sync.set(
		{ workTime: newWT * 60, breakTime: newBT * 60 },
		() => {}
	);
};

// const writeData = () => {};

workTimeVal.addEventListener("keyup", () => {
	if (!val(workTimeVal)) disBtn();
	else enBtn();
});
breakTimeVal.addEventListener("keyup", () => {
	if (!val(breakTimeVal)) disBtn();
	else enBtn();
});

sesBtn.addEventListener("click", () => {
	saveData();
});
defBtn.addEventListener("click", () => {
	saveData();
	writeData();
});
