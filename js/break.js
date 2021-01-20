const startWork = () => {
	chrome.storage.sync.get(
		["workTime", "WorkDone", "breakTime", "breakDone"],
		(intervals) => {
			while (intervals.workDone < intervals.workTime) {
				setTimeout(() => {
					chrome.storage.sync.set(
						{ workDone: workDone + 1 },
						() => {}
					);
				}, 1);
			}
			breakNotif = {
				type: "basic",
				iconUrl: "icons/i48.png",
				title: "Time For a Break",
				message:
					"You have worked hard, take a break now and get relaxed.",
			};
			chrome.notifications.create("brNot", breakNotif);
		}
	);
};
