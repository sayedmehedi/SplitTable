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
