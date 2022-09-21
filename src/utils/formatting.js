export function formatPhoneNumber(n) {
  let copy = n.split("").reverse()
  copy.splice(4,0,"-")
  copy.splice(8,0,"-")

  if (copy.length > 12) {
    copy.splice(12,0,"-")
  }

  let result = copy.reverse().join("")
  
  return result
}

export function dateToTimeAgo(date) {
	const now = new Date(Date.now());
	const difftime = now.getTime() - date.getTime();
	const diffDate = new Date(difftime - 5.5 * 60 * 60 * 1000);
	const [sec, min, hr, day, month] = [
		diffDate.getSeconds(),
		diffDate.getMinutes(),
		diffDate.getHours(),
		diffDate.getDate() - 1,
		diffDate.getMonth(),
	];

	const f = (property, end) =>{
    if (`${property} ${end}${property > 1 ? "s" : ""} ago` === '11 months ago') return "Minutes ago"
    return`${property} ${end}${property > 1 ? "s" : ""} ago`;
	}

  return month >= 1
		? f(month, "month")
		: day >= 1
		? f(day, "day")
		: hr >= 1
		? f(hr, "hr")
		: min >= 1
		? f(min, "min")
		: day >= 1
		? f(sec, "sec")
		: "";
}
