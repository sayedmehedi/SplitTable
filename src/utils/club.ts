export function parseClubAvgCost(avgCost: string) {
  if (avgCost === "") {
    return {
      max_avg_cost: "",
      min_avg_cost: "",
    };
  }

  const [min_avg_cost, max_avg_cost] = avgCost
    .split("-")
    .filter(str => str !== "-")
    .map(str => str.trim());

  return {
    max_avg_cost,
    min_avg_cost,
  };
}

export function timeToDate(time: string) {
  const [hour, min, sec] = time.split(":") as [string, string, string];
  const date = new Date();
  date.setHours(parseInt(hour), parseInt(min), parseInt(sec));

  return date;
}
